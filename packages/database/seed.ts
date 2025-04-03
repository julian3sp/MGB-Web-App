import { insertEmployee, insertLanguageRequest, PrismaClient } from './src';

const prisma = new PrismaClient();

async function main() {
    await insertEmployee('000000000', 'Julian Espinal',prisma);
    await insertEmployee('111111111', 'Brendon Peters',prisma);
    await insertEmployee('222222222', 'Evan Demas',prisma);
    await insertEmployee('333333333', 'Bryan Wheeler',prisma);
    await insertEmployee('444444444', 'Klaidi Varfi',prisma);
    await insertLanguageRequest(100, 'Spanish', '000000000',prisma);
    await insertLanguageRequest(102, 'Albanian', null,prisma);
    await insertLanguageRequest(103, 'Spanish', '111111111',prisma);
    await insertLanguageRequest(104, 'Russian', null,prisma);
    await insertLanguageRequest(105, 'Spanish', null,prisma);
    await insertLanguageRequest(106, 'French', '000000000',prisma);
    await insertLanguageRequest(107, 'Spanish', null,prisma);
    await insertLanguageRequest(108, 'Russian', null,prisma);
    await insertLanguageRequest(109, 'Spanish', '222222222',prisma);
    await insertLanguageRequest(110, 'Spanish', null,prisma);

}