import { PrismaClient } from 'database';

// Create the prisma client, this automatically connects to the database


export async function insertEmployee(id: string, name: string, client: PrismaClient) {
    try {
        const newEmployee = await client.employee.create({
            data: {
                id: id,
                employee_name: name,
            },
        });
        console.log(newEmployee);
    } catch (error) {
        console.error('error creating employee employee');
    }
}
export async function deleteEmployees(employee_ids: string[], client: PrismaClient) {
    try {
        await client.employee.deleteMany({
            where: {
                id: {
                    in: employee_ids,
                },
            },
        });
    } catch {
        console.error('error deleting users');
    }
}
export async function insertServiceRequest(
    room: number,
    lang: string,
    assigned_employee: string | null,
    request_type: string,
    client: PrismaClient,
) {
    try {
        const newServiceRequest = await client.service_request.create({
            data: {
                room_num: room,
                language: lang,
                request_type: request_type,
                employee_id: assigned_employee,
            },
        });
        console.log(newServiceRequest);
    } catch (error) {
        console.log(error);
        return;
        console.error('error creating employee', room, lang, assigned_employee);
    }
}

export async function deleteServiceRequests(request_ids: number[], client: PrismaClient) {
    try {
        await client.service_request.deleteMany({
            where: {
                request_id: {},
            },
        });
    } catch {
        console.error('error deleting users');
    }
}
// Export the client

