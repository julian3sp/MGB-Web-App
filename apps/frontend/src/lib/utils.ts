import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createTRPCClient } from '@trpc/client';
import {appRouter} from '../../../backend/src/app' // Import the backend router type


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// src/utils/trpc.ts

const trpc = createTRPCClient<appRouter>({
  url: 'http://localhost:3000/trpc', // URL for the tRPC endpoint (the `/trpc` route on your Express server)
});

export default trpc;
