import client from '../../bin/prisma-client';
import { publicProcedure } from '../trpc';
import { z } from 'zod';
import { trpc } from '../trpc.ts';

export const makeUser = publicProcedure
    .input(
        z.object({
            first_name: z.string(),
            last_name: z.string(),
            email: z.string(),
            password: z.string(),
        })
    )
    .mutation(async ({ input }) => {
        const user = await client.users.create({
            data: input,
        });
        return user;
    });

export const getUser = publicProcedure
    .input(
        z.object({
            email: z.string(),
            password: z.string(),
        })
    )
    .query(async (opts) => {
        const { input } = opts;
        // Retrieve the user with the given ID
        const user = await client.users.findUnique({
            where: {
                email: input.email,
                password: input.password,
            },
        });
        return user;
    });
