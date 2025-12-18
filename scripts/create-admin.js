const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'super@hrmentorship.com';
  const password = 'superpassword123';

  console.log('🔄 Connecting to database...');

  const existingUser = await prisma.admin.findUnique({ where: { email } });

  if (existingUser) {
    console.log(`⚠️ User exists. Resetting password...`);
    await prisma.admin.update({
      where: { email },
      data: { password, role: 'SUPER_ADMIN' }
    });
    console.log('✅ Password Reset Successfully!');
  } else {
    console.log(`✨ Creating new Super Admin...`);
    await prisma.admin.create({
      data: {
        name: 'Super Admin',
        email,
        password,
        role: 'SUPER_ADMIN'
      }
    });
    console.log('✅ Super Admin Created Successfully!');
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
