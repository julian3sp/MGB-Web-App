import { insertEmployee, insertServiceRequest, PrismaClient } from './src';

const prisma = new PrismaClient();

async function main() {
    await insertEmployee('000000000', 'Julian Espinal',prisma);
    await insertEmployee('111111111', 'Brendon Peters',prisma);
    await insertEmployee('222222222', 'Evan Demas',prisma);
    await insertEmployee('333333333', 'Bryan Wheeler',prisma);
    await insertEmployee('444444444', 'Klaidi Varfi',prisma);
    await insertServiceRequest(100, 'Spanish', '000000000', 'language',prisma);
    await insertServiceRequest(102, 'Albanian', null, 'language',prisma);
    await insertServiceRequest(103, 'Spanish', '111111111', 'language',prisma);
    await insertServiceRequest(104, 'Russian', null, 'language',prisma);
    await insertServiceRequest(105, 'Spanish', null, 'language',prisma);
    await insertServiceRequest(106, 'French', '000000000', 'language',prisma);
    await insertServiceRequest(107, 'Spanish', null, 'language',prisma);
    await insertServiceRequest(108, 'Russian', null, 'language',prisma);
    await insertServiceRequest(109, 'Spanish', '222222222', 'language',prisma);
    await insertServiceRequest(110, 'Spanish', null, 'language',prisma);
}

main();

export default main