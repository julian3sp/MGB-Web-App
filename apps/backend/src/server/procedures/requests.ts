import { publicProcedure } from '../trpc';
import client from '../../bin/prisma-client';
import { z } from 'zod';
import { trpc } from '../trpc.ts';

export const getRequests = trpc.procedure.query(async () => {
    console.log('getRequests called');
    const requests = await client.service_request.findMany({
        include: {
            sanitation: true,
            language: true,
            security: true,
            audioVisual: true,
            transportation: true,
            medicalDevice: true,
            facilities: true,
        },
    });

    console.log('getRequests returned');
    return requests;
});

export const getRequestOfType = publicProcedure
    .input(
        z.object({
            type: z.string(),
        })
    )
    .query(async (opts) => {
        const { input } = opts;
        console.log(input);
        const requests = await client.service_request.findMany({
            where: {
                request_type: input.type,
            },
        });
        console.log('getRequestOfType returned');
        return requests;
    });

export const makeRequest = publicProcedure
    .input(
        z.object({
            name: z.string(),
            employee_id: z.string(),
            priority: z.string(),
            department: z.string(),
            location: z.string(),
            status: z.string(),
            request_type: z.string(),
            additional_comments: z.optional(z.string()),
            image_upload: z.optional(z.string()),
            sanitation: z.optional(
                z.object({
                    cleaningType: z.string(),
                    contaminant: z.optional(z.string()),
                })
            ),
            language: z.optional(
                z.object({
                    sourceLanguage: z.string(),
                    targetLanguage: z.string(),
                })
            ),
            audioVisual: z.optional(
                z.object({
                    accommodationType: z.string(),
                    accommodationDetails: z.optional(z.string()),
                })
            ),
            security: z.optional(
                z.object({
                    accessZones: z.string(),
                    securityIssue: z.string(),
                })
            ),
            transportation: z.optional(
                z.object({
                    transportationType: z.string(),
                    transportationDestination: z.string(),
                })
            ),
            medicalDevice: z.optional(
                z.object({
                    device: z.string(),
                    operatorRequired: z.string(),
                })
            ),
            facilities: z.optional(
                z.object({
                    maintenanceType: z.string(),
                    equipmentType: z.string(),
                })
            ),
        })
    )
    .mutation(async ({ input }) => {
        const request = await client.service_request.create({
            data: {
                ...input,
                sanitation: {
                    create: input.sanitation,
                },
                language: {
                    create: input.language,
                },
                audioVisual: {
                    create: input.audioVisual,
                },
                security: {
                    create: input.security,
                },
                transportation: {
                    create: input.transportation,
                },
                medicalDevice: {
                    create: input.medicalDevice,
                },
                facilities: {
                    create: input.facilities,
                },
            },
        });

        return request;
    });
export const deleteRequest = publicProcedure
    .input(
        z.object({
            request_id: z.number(),
        })
    )
    .mutation(async ({ input }) => {
        const deleteRequest = await client.service_request.delete({
            where: { request_id: input.request_id },
        });
        return deleteRequest;
    });

export const updateRequest = publicProcedure
    .input(
        z.object({
            request_id: z.number(),
            priority: z.string(),
            status: z.string(),
        })
    )
    .mutation(async ({ input }) => {
        const updateRequest = await client.service_request.update({
            where: { request_id: input.request_id },
            data: {
                priority: input.priority,
                status: input.status,
            },
        });
        return updateRequest;
    });

export const requestCountByStatus = publicProcedure.query(async () => {
    const statuses = await client.service_request.groupBy({
        by: ['status'],
        _count: {
            status: true,
        },
    });

    // Format the result as { [status]: count }
    const result: Record<string, number> = {};
    for (const entry of statuses) {
        result[entry.status] = entry._count.status;
    }

    return result;
});

export const requestCountByLocation = publicProcedure.query(async () => {
    const locations = await client.service_request.groupBy({
        by: ['location'],
        _count: {
            location: true,
        },
    });

    // Format the result as { [location]: count }
    const result: Record<string, number> = {};
    for (const entry of locations) {
        result[entry.location] = entry._count.location;
    }

    return result;
});

export const requestCountByPriority = publicProcedure.query(async () => {
    const priorities = await client.service_request.groupBy({
        by: ['priority'],
        _count: {
            priority: true,
        },
    });

    // Format the result as { [priority]: count }
    const result: Record<string, number> = {};
    for (const entry of priorities) {
        result[entry.priority] = entry._count.priority;
    }

    return result;
});
