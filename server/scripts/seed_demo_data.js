const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main(){
  console.log('Seeding demo data...');

  // Create admin if not exists
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@nav-productions.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'StrongAdmin!234';

  // NOTE: password should be hashed in real register flow; here we reuse auth.create flow logic if needed.
  // For simplicity we'll hash with bcrypt to match login expectations.
  const bcrypt = require('bcrypt');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);

  let admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!admin) {
    admin = await prisma.user.create({ data: { email: adminEmail, password: hashedPassword, name: 'Admin', role: 'admin' } });
  }

  // Create some client users
  const clientsData = [
    { email: 'alice@example.com', name: 'Alice', password: await bcrypt.hash('alicepass', salt) },
    { email: 'bob@example.com', name: 'Bob', password: await bcrypt.hash('bobpass', salt) },
  ];

  const clients = [];
  for(const c of clientsData){
    let u = await prisma.user.findUnique({ where: { email: c.email } });
    if (!u) u = await prisma.user.create({ data: { email: c.email, name: c.name, password: c.password } });
    clients.push(u);
  }

  // Create services
  const servicesData = [
    { name: 'Studio Recording (2 hours)', description: 'Basic recording session', priceCents: 5000 },
    { name: 'Mixing', description: 'Track mixing service', priceCents: 3000 },
    { name: 'Mastering', description: 'Final mastering', priceCents: 2000 },
  ];
  const services = [];
  for(const s of servicesData){
    let svc = await prisma.service.findFirst({ where: { name: s.name } });
    if (!svc) svc = await prisma.service.create({ data: s });
    services.push(svc);
  }

  // Create bookings for clients
  const now = new Date();
  const bookings = [];
  const b1 = await prisma.booking.create({ data: { clientId: clients[0].id, serviceId: services[0].id, scheduledAt: new Date(now.getTime() + 86400*1000), location: 'Studio A', notes: 'Bring instrument', status: 'scheduled' } });
  const b2 = await prisma.booking.create({ data: { clientId: clients[1].id, serviceId: services[1].id, scheduledAt: new Date(now.getTime() + 3*86400*1000), location: 'Studio B', notes: '', status: 'scheduled' } });
  bookings.push(b1,b2);

  // Create orders linked to bookings
  const order1 = await prisma.order.create({ data: { clientId: clients[0].id, status: 'new', totalCents: services[0].priceCents, paymentStatus: 'pending' } });
  const order2 = await prisma.order.create({ data: { clientId: clients[1].id, status: 'new', totalCents: services[1].priceCents + services[2].priceCents, paymentStatus: 'pending' } });

  // Link bookings to orders
  await prisma.booking.update({ where: { id: b1.id }, data: { orderId: order1.id } });
  await prisma.booking.update({ where: { id: b2.id }, data: { orderId: order2.id } });

  // Create demo media entries (placeholder URLs)
  const media1 = await prisma.media.create({ data: { orderId: order1.id, url: 'https://example.com/demo1.jpg', kind: 'image' } });
  const media2 = await prisma.media.create({ data: { orderId: order2.id, url: 'https://example.com/demo2.mp3', kind: 'other' } });

  console.log('Seed complete:');
  console.log(' admin:', admin.email);
  console.log(' clients:', clients.map(c=>c.email));
  console.log(' services:', services.map(s=>({ name: s.name, priceCents: s.priceCents })));
  console.log(' bookings:', bookings.map(b=>({ id: b.id, clientId: b.clientId })));
  console.log(' orders:', [order1.id, order2.id]);
  console.log(' media:', [media1.id, media2.id]);

  await prisma.$disconnect();
}

main().catch(e=>{ console.error(e); process.exit(1); });
