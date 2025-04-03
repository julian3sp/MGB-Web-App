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
export async function insertLanguageRequest(
    room: number,
    lang: string,
    assigned_employee: string | null,
    client: PrismaClient,
) {
    try {
        const newLangRequest = await client.language_request.create({
            data: {
                room_num: room,
                language: lang,
                employee_id: assigned_employee,
            },
        });
        console.log(newLangRequest);
    } catch (error) {
        console.log(error);
        return;
        console.error('error creating employee', room, lang, assigned_employee);
    }
}

export async function deleteLangRequests(request_ids: number[], client: PrismaClient) {
    try {
        await client.language_request.deleteMany({
            where: {
                request_id: {},
            },
        });
    } catch {
        console.error('error deleting users');
    }
}
// Export the client

