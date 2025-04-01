import { PrismaClient } from 'database';

// Create the prisma client, this automatically connects to the database
const client = new PrismaClient();

export async function insertEmployee(id: string, name: string){
    try{
        const newEmployee = await client.employee.create({
            data: {
                id: id,
                employee_name: name,
            },
        });
        console.log(newEmployee)
    }
    catch(error){
        console.error('error creating employee employee')
    }

}
export async function deleteEmployees(employee_ids: string[]) {
    try{
        await client.employee.deleteMany({
            where : {
                id : {
                    in: employee_ids
                }
            }
        })
    } catch {
        console.error('error deleting users')
    }
}

// Export the client
export default client;
