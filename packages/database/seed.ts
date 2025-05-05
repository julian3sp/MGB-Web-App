import { insertEmployee, insertServiceRequest, PrismaClient } from './src';


const prisma = new PrismaClient();

async function main() {
    await insertEmployee('000000000', 'Julian Espinal',prisma);
    await insertEmployee('111111111', 'Brendon Peters',prisma);
    await insertEmployee('222222222', 'Evan Demas',prisma);
    await insertEmployee('333333333', 'Bryan Wheeler',prisma);
    await insertEmployee('444444444', 'Klaidi Varfi',prisma);
    await insertServiceRequest('Alex','111111111','High','Chestnut Hill','Laboratory','Language','Done',prisma,'Spanish','French','','','','','','','','','','','','','aa');
    await insertServiceRequest('Pedro','111111112','High','Chestnut Hill','Laboratory','Transportation','Done',prisma,'','','','','','','car','parking','','','','','','','a');
    await insertServiceRequest('Mathew','111111113','Low','Chestnut Hill','Radiology','Language','Done',prisma,'Spanish','French','','','','','','','','','','','','','a');
    await insertServiceRequest('Alex','111111111','Medium','Faulkner Hospital','Laboratory','Security','Working',prisma,'','','','','','Assault','','','','','','','','','a');
    await insertServiceRequest('Andrea','111111115','Low','Patriot Place','Laboratory','Language','Done',prisma,'Spanish','French','','','','','','','','','','','','','a');
}


main().finally(() =>     process.exit(0));

export default main