import { PrismaClient } from 'database';

// Create the prisma client, this automatically connects to the database
const client = new PrismaClient();

async function insertEmployee(name: string){
    try{
        const newEmployee = await client.employee.create({
            data: {
                employee_name: name, // Ensure `employee_name` exists in your Prisma model
            },
        });

        }
    catch{

    }
}

// Export the client
export default client;
