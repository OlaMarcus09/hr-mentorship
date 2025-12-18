import { prisma } from '@/lib/prisma';

async function main() {
  // Check if super admin exists
  const existing = await prisma.admin.findUnique({
    where: { email: 'super@hrmentorship.com' }
  });

  if (!existing) {
    await prisma.admin.create({
      data: {
        name: 'Super Admin',
        email: 'super@hrmentorship.com',
        password: 'superpassword123', // Change this later!
        role: 'SUPER_ADMIN'
      }
    });
    console.log('✅ Super Admin created!');
  } else {
    console.log('⚠️ Super Admin already exists.');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
