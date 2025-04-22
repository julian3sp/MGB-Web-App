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
                    create: input.facilities
                }
            },
        });

        return request;
    });
