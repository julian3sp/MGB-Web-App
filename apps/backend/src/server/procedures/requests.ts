import { publicProcedure } from "../trpc";
import client from "../../bin/prisma-client";
import {z} from 'zod';

export const getRequests = publicProcedure.query(async() => {
    return client.service_requests.findMany();
})

export const makeRequest = publicProcedure.input(z.object({
    room_num: z.number,
    language: z.string,
    request_type: z.string,
    employee_id: z.string
})).mutation( async (opts) => {
    const {input} = opts;

    const request = await client.service_request.create(input);
    return request;
})