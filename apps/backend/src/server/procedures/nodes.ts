import client from '../../bin/prisma-client';
import { publicProcedure } from '../trpc';
import { z } from 'zod';
import { trpc } from '../trpc.ts';

export const makeNode = publicProcedure
    .input(
        z.array(
            z.object({
                id: z.optional(z.number()),
                building: z.string(),
                floor: z.number(),
                name: z.string(),
                x: z.number(),
                y: z.number(),
                type: z.string(),
            })
        )
    )
    .mutation(async ({ input }) => {
        console.log('createMany Called');
        return client.nodes.createMany({ data: input });
    });

export const editNodes = publicProcedure
    .input(
        z.array(
            z.object({
                id: z.number(),
                x: z.number(),
                y: z.number(),
                type: z.string(),
            })
        )
    )
    .mutation(async ({ input }) => {
        for (const node of input) {
            await client.$executeRaw`
        UPDATE nodes 
        SET x = ${node.x}, y = ${node.y} , type = ${node.type}
        WHERE id = ${node.id}
        `;
        }
    });

export const makeManyNodes = publicProcedure
    .input(
        z.array(
            z.object({
                id: z.optional(z.number()),
                building: z.string(),
                floor: z.number(),
                name: z.string().nullable(),
                x: z.number(),
                y: z.number(),
                type: z.string(),
            })
        )
    )
    .mutation(async ({ input }) => {
        try {
            const result = await client.nodes.createMany({
                data: input,
                skipDuplicates: true, // optional: avoids inserting if unique constraints are violated
            });

            return {
                success: true,
                count: result.count,
            };
        } catch (error) {
            console.error('Error creating nodes:', error);
            return {
                success: false,
                error: 'Failed to create nodes',
            };
        }
    });
export const getAllNodes = publicProcedure.query(async () => {
    const nodes = await client.nodes.findMany();
    return nodes;
});

export const getNode = publicProcedure
    .input(
        z.object({
            id: z.number(),
        })
    )
    .query(async (opts) => {
        const { input } = opts;

        const node = await client.nodes.findUnique({
            where: {
                id: input.id,
            },
        });
        return node;
    });

export const getLargestId = publicProcedure.query(() => {
    return client.nodes.findMany({
        orderBy: [
            {
                id: 'desc',
            },
        ],
        take: 1,
    });
});
export const deleteSelectedNodes = publicProcedure
    .input(z.array(z.number())) // expects an array of node IDs
    .mutation(async ({ input }) => {
        await client.nodes.deleteMany({
            where: {
                id: {
                    in: input,
                },
            },
        });

        // Optional: reset sequence only if you plan to fully reset after certain deletions
        // await client.$executeRaw`ALTER SEQUENCE "nodes_id_seq" RESTART WITH 1`;

        return { success: true, deletedIds: input };
    });
export const deleteAllNodes = publicProcedure.mutation(async () => {
    await client.nodes.deleteMany();
    await client.$executeRaw`ALTER SEQUENCE "nodes_id_seq" RESTART WITH 1`;
});
