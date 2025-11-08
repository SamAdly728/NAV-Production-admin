const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const { prisma } = require('../config');

const router = express.Router();

// GET /api/projects - get projects for current user (client or all for admin)
router.get('/', authenticate, async (req, res) => {
  try {
    const where = req.user.role === 'admin' ? {} : { clientId: req.user.id };
    const projects = await prisma.project.findMany({
      where,
      include: {
        client: { select: { id: true, email: true, name: true } },
        order: { select: { id: true, status: true, totalCents: true } },
        tasks: { orderBy: { createdAt: 'desc' } },
        uploads: { orderBy: { createdAt: 'desc' }, take: 5 }
      },
      orderBy: { updatedAt: 'desc' }
    });
    res.json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/projects/:id - get single project
router.get('/:id', authenticate, async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        client: { select: { id: true, email: true, name: true } },
        order: true,
        tasks: { orderBy: { createdAt: 'desc' } },
        uploads: { orderBy: { createdAt: 'desc' } }
      }
    });
    
    if (!project) return res.status(404).json({ error: 'project not found' });
    
    // Check access
    if (req.user.role !== 'admin' && project.clientId !== req.user.id) {
      return res.status(403).json({ error: 'forbidden' });
    }
    
    res.json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// POST /api/projects - create new project (admin only)
router.post('/', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const { clientId, orderId, title, description, dueDate } = req.body;
    
    if (!clientId || !orderId || !title) {
      return res.status(400).json({ error: 'clientId, orderId, and title required' });
    }
    
    const project = await prisma.project.create({
      data: {
        clientId,
        orderId,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        stage: 'booked',
        progress: 0
      },
      include: {
        client: { select: { id: true, email: true, name: true } },
        order: true
      }
    });
    
    res.json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// PUT /api/projects/:id - update project (admin or client can update certain fields)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, stage, progress, dueDate } = req.body;
    
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'project not found' });
    
    // Check access
    if (req.user.role !== 'admin' && existing.clientId !== req.user.id) {
      return res.status(403).json({ error: 'forbidden' });
    }
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    
    // Only admin can update stage and progress
    if (req.user.role === 'admin') {
      if (stage !== undefined) updateData.stage = stage;
      if (progress !== undefined) updateData.progress = Math.max(0, Math.min(100, progress));
    }
    
    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        client: { select: { id: true, email: true, name: true } },
        order: true,
        tasks: true,
        uploads: { take: 5 }
      }
    });
    
    res.json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// DELETE /api/projects/:id - delete project (admin only)
router.delete('/:id', authenticate, requireRole('admin'), async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// POST /api/projects/:id/tasks - create task for project
router.post('/:id/tasks', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assignedTo, dueDate } = req.body;
    
    if (!title) return res.status(400).json({ error: 'title required' });
    
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return res.status(404).json({ error: 'project not found' });
    
    // Check access
    if (req.user.role !== 'admin' && project.clientId !== req.user.id) {
      return res.status(403).json({ error: 'forbidden' });
    }
    
    const task = await prisma.projectTask.create({
      data: {
        projectId: id,
        title,
        description,
        assignedTo,
        dueDate: dueDate ? new Date(dueDate) : null
      }
    });
    
    res.json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// PUT /api/projects/:projectId/tasks/:taskId - update task
router.put('/:projectId/tasks/:taskId', authenticate, async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const { title, description, status, assignedTo, dueDate } = req.body;
    
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) return res.status(404).json({ error: 'project not found' });
    
    // Check access
    if (req.user.role !== 'admin' && project.clientId !== req.user.id) {
      return res.status(403).json({ error: 'forbidden' });
    }
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) {
      updateData.status = status;
      if (status === 'completed') updateData.completedAt = new Date();
    }
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    
    const task = await prisma.projectTask.update({
      where: { id: taskId },
      data: updateData
    });
    
    res.json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// POST /api/projects/:id/uploads - add upload to project
router.post('/:id/uploads', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { url, fileName, fileType } = req.body;
    
    if (!url || !fileName) {
      return res.status(400).json({ error: 'url and fileName required' });
    }
    
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return res.status(404).json({ error: 'project not found' });
    
    // Check access
    if (req.user.role !== 'admin' && project.clientId !== req.user.id) {
      return res.status(403).json({ error: 'forbidden' });
    }
    
    const upload = await prisma.projectUpload.create({
      data: {
        projectId: id,
        url,
        fileName,
        fileType: fileType || 'document',
        uploadedBy: req.user.email
      }
    });
    
    res.json({ upload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
