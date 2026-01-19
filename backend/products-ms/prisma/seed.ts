import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const products = [
    { name: 'Camiseta básica', price: 120000, stock: 12 },
    { name: 'Taza premium', price: 125000, stock: 8 },
    { name: 'Gorra clásica', price: 38000, stock: 10 },
  ];

  for (const p of products) {
    const exists = await prisma.invProduct.findFirst({
      where: { name: p.name },
    });

    if (exists) {
      console.log(`ℹ️ ${p.name} ya existe`);
      continue;
    }

    const product = await prisma.invProduct.create({ data: p });
    console.log(`✅ ${product.name} | stock: ${product.stock}`);
  }

  console.log('🌱 Seed de InvProduct completado');
}

main()
  .catch((e) => {
    console.error('❌ Seed falló:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
