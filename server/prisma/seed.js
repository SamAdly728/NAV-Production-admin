const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@nav-productions.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'StrongAdmin!234';
  
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedAdminPassword,
        name: 'Admin',
        role: 'admin',
        phone: '(858) 500-1050'
      }
    });
    console.log('✅ Created admin user:', admin.email);
  } else {
    console.log('ℹ️  Admin user already exists:', adminEmail);
  }

  // Create client users
  const clients = [
    { email: 'alice@example.com', password: 'alicepass', name: 'Alice Johnson', phone: '(555) 123-4567' },
    { email: 'bob@example.com', password: 'bobpass', name: 'Bob Smith', phone: '(555) 987-6543' }
  ];

  for (const clientData of clients) {
    const existing = await prisma.user.findUnique({ where: { email: clientData.email } });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(clientData.password, 10);
      const client = await prisma.user.create({
        data: {
          email: clientData.email,
          password: hashedPassword,
          name: clientData.name,
          role: 'client',
          phone: clientData.phone
        }
      });
      console.log('✅ Created client user:', client.email);
    } else {
      console.log('ℹ️  Client user already exists:', clientData.email);
    }
  }

  // Create services
  const services = [
    {
      name: 'Event Production',
      description: 'Full event production services including setup, coordination, and technical support',
      priceCents: 150000 // $1,500
    },
    {
      name: 'Video Production',
      description: 'Professional video production for promotional content, events, and social media',
      priceCents: 200000 // $2,000
    },
    {
      name: 'Photography',
      description: 'High-quality photography for events, products, and promotional materials',
      priceCents: 100000 // $1,000
    },
    {
      name: 'Aerial Media (Drone)',
      description: 'Stunning aerial footage and photography using professional drones',
      priceCents: 125000 // $1,250
    },
    {
      name: 'Social Media Content',
      description: 'Custom content creation optimized for social media platforms',
      priceCents: 75000 // $750
    }
  ];

  for (const serviceData of services) {
    const existing = await prisma.service.findFirst({ 
      where: { name: serviceData.name } 
    });
    if (!existing) {
      const service = await prisma.service.create({ data: serviceData });
      console.log('✅ Created service:', service.name);
    } else {
      console.log('ℹ️  Service already exists:', serviceData.name);
    }
  }

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
