import { z } from 'zod';
import client from '../../bin/prisma-client';
import { publicProcedure } from '../trpc';

export const makeDm = publicProcedure
  .input(
    z.object({
      id: z.string(),
      dm: z.string(),
    })
  )
  .query(async ({ input }) => {
    const newChat = await client.chat.create({
      data: {
        dm: input.dm,
      },
    });
    return newChat;
  });



export const getDm = publicProcedure.query(async () => {
    const chatlog =  client.chat.findMany({ select: { dm: true } });
    return chatlog;
});