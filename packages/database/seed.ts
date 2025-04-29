import { insertEmployee, insertServiceRequest, PrismaClient } from './src';


const prisma = new PrismaClient();

async function main() {
    await insertEmployee('000000000', 'Julian Espinal',prisma);
    await insertEmployee('111111111', 'Brendon Peters',prisma);
    await insertEmployee('222222222', 'Evan Demas',prisma);
    await insertEmployee('333333333', 'Bryan Wheeler',prisma);
    await insertEmployee('444444444', 'Klaidi Varfi',prisma);
    await insertServiceRequest('Alex','111111111','High','Chestnut Hill','Laboratory','Language Interpreter Service Form','Done',prisma,'Spanish','French','','','','','','','','','','','','','');
    await insertServiceRequest('Pedro','111111112','High','Chestnut Hill','Laboratory','Transportation Resquest Form','Done',prisma,'','','','','','','car','parking','','','','','','','');
    await insertServiceRequest('Mathew','111111113','Low','Chestnut Hill','Radiology','Language Interpreter Service Form','Done',prisma,'Spanish','French','','','','','','','','','','','','','');
    await insertServiceRequest('Alex','111111111','Medium','Faulkner Hospital','Laboratory','Security Reques Form','Working',prisma,'','','','','','Assault','','','','','','','','','');
    await insertServiceRequest('Angela','111111114','High','Patriot Place','Multi-Speciality Clinic','Medical device Request Form','Working',prisma,'','','','','','','','','Gloves','','','','','','');
    await insertServiceRequest('Andrea','111111115','Low','Patriot Place','Laboratory','Language Interpreter Service Form','Done',prisma,'Spanish','French','','','','','','','','','','','','','');


}


main();

export default main