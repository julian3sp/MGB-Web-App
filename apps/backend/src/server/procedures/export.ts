import {publicProcedure, router} from '../trpc';
import client from '../../bin/prisma-client';
import { z } from 'zod';
import { trpc } from '../trpc.ts';

export const getTables = router({
    getTabledata: publicProcedure
        .input(z.object({Directory: z.string()}))
        .query(async (tables) => {
            const result = await client.directory.findMany()
            return result;
        })
})