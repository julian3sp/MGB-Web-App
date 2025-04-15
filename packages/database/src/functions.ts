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
    name: string,
    employeeID: string,
    priority: string,
    location: string,
    department: string,
    request_type: string,
    status: string,
    client: PrismaClient,
    sourceLanguage: string,
    targetLanguage: string,
    cleaningType: string,
    accommodationType: string,
    accommodationDetails?: string,
    contaminant?: string,
    additional_comments?: string,
) {
    try {
        const newServiceRequest = await client.service_request.create({
            data: {
                name: name,
                employee_id: employeeID,
                priority: priority,
                location: location,
                department: department,
                status: status,
                request_type: request_type,
                additional_comments: additional_comments,
                ...(request_type === 'language' && {
                    language: {
                        create: {
                            sourceLanguage: sourceLanguage,
                            targetLanguage: targetLanguage,
                        }
                    },
                }),
                ...(request_type === 'sanitation' && {
                    sanitation: {
                        create: {
                            cleaningType: cleaningType,
                            contaminant: contaminant,
                        }
                    },
                }),
                ...(request_type === 'audioVisual' && {
                    audioVisual: {
                        create: {
                            accommodationType: accommodationType,
                            accommodationDetails: accommodationDetails,
                        }
                    },
                }),
            },
        });
        console.log(newServiceRequest);
    } catch (error) {
        console.error('error creating service request', name, request_type);
        return;
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

