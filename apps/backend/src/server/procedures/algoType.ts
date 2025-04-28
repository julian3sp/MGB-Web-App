import { publicProcedure } from '../trpc';
import client from '../../bin/prisma-client';
import { z } from 'zod';
import { trpc } from '../trpc';

export const getAlgoType = trpc.procedure.query(async () => {
    console.log('getAlgoType called');
    const algoType = await client.algoType.findUnique({
        where: { id: 1 },
    });

    if (!algoType) {
        const initialized = await client.algoType.create({
            data: {},
        });
        console.log('getAlgoType initialized default');
        return initialized.algoType;
    }

    console.log('getAlgoType returned:', algoType.algoType);
    return algoType.algoType;
});

export const setAlgoType = publicProcedure
    .input(
        z.object({
            algoType: z.string().min(1, 'Algorithm type cannot be empty'),
        })
    )
    .mutation(async (opts) => {
        const { input } = opts;
        console.log('setAlgoType called with:', input.algoType);
        const result = await client.algoType.upsert({
            where: { id: 1 },
            update: {
                algoType: input.algoType,
            },
            create: {
                id: 1,
                algoType: input.algoType,
            },
        });
        console.log('setAlgoType completed');
        return result.algoType;
    });

export const resetAlgoType = publicProcedure.mutation(async () => {
    console.log('resetAlgoType called');
    await client.algoType.deleteMany();
    const result = await client.algoType.create({
        data: {},
    });
    console.log('resetAlgoType completed');
    return result.algoType;
});
