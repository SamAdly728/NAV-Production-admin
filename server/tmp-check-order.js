(async ()=>{
  const { prisma } = require('./src/config');
  try {
    const r = await prisma.order.findUnique({ where: { id: 'no-such-order' } });
    console.log('order:', r);
  } catch(e) {
    console.error('error', e);
  } finally {
    await prisma.$disconnect();
  }
})();