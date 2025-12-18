import { prisma } from '@/lib/prisma';

async function main() {
  // 1. Delete existing super admin if exists
  await prisma.admin.deleteMany({
    where: { email: 'super@hrmentorship.com' }
  });
  console.log('🗑️ Old Super Admin deleted.');

  // 2. Create fresh one
  await prisma.admin.create({
    data: {
      name: 'Super Admin',
      email: 'super@hrmentorship.com',
      password: 'superpassword123',
      role: 'SUPER_ADMIN'
    }
  });
  console.log('✅ New Super Admin created successfully!');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
