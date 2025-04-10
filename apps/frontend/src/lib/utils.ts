import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {createTRPCClient, httpBatchLink} from '@trpc/client';
import {appRouter} from '../../../backend/src/app' // Import the backend router type


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


