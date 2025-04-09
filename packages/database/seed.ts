import { insertEmployee, insertServiceRequest, PrismaClient } from './src';

const prisma = new PrismaClient();

async function main() {
    await insertEmployee('000000000', 'Julian Espinal',prisma);
    await insertEmployee('111111111', 'Brendon Peters',prisma);
    await insertEmployee('222222222', 'Evan Demas',prisma);
    await insertEmployee('333333333', 'Bryan Wheeler',prisma);
    await insertEmployee('444444444', 'Klaidi Varfi',prisma);
    await insertServiceRequest('Julian Espinal', 'something@gmail.com', '4014425005', 100, 'language','000000000', '', 'Spanish','111111111', prisma);
    await insertServiceRequest('Julian Espinal', 'something@gmail.com', '4014425005', 101, 'language','000000000', '', 'Spanish',null,prisma);
    await insertServiceRequest('Julian Espinal', 'something@gmail.com', '4014425005', 102, 'language','000000000', '', 'Spanish','222222222',prisma);
    await insertServiceRequest('Julian Espinal', 'something@gmail.com', '4014425005', 103, 'language','000000000', '', 'Spanish',null,prisma);
    await insertServiceRequest('Julian Espinal', 'something@gmail.com', '4014425005', 104, 'language','000000000', '', 'Spanish',null,prisma);
    await insertServiceRequest('Julian Espinal', 'something@gmail.com', '4014425005', 105, 'language','000000000', '', 'Spanish','444444444',prisma);
    await insertServiceRequest('Julian Espinal', 'something@gmail.com', '4014425005', 106, 'language','000000000', '', 'Spanish',null,prisma);
    await insertServiceRequest('Julian Espinal', 'something@gmail.com', '4014425005', 107, 'language','000000000', '', 'Spanish',null,prisma);
    await insertServiceRequest('Julian Espinal', 'something@gmail.com', '4014425005', 108, 'language','000000000', '', 'Spanish',null,prisma);
    await insertServiceRequest('Julian Espinal', 'something@gmail.com', '4014425005', 109, 'language','000000000', '', 'Spanish',null,prisma);

}

main();

export default main