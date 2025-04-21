import { insertEmployee, insertServiceRequest, PrismaClient } from './src';

const prisma = new PrismaClient();

async function main() {
    await insertEmployee('000000000', 'Julian Espinal',prisma);
    await insertEmployee('111111111', 'Brendon Peters',prisma);
    await insertEmployee('222222222', 'Evan Demas',prisma);
    await insertEmployee('333333333', 'Bryan Wheeler',prisma);
    await insertEmployee('444444444', 'Klaidi Varfi',prisma);
    
}

main();

export default main