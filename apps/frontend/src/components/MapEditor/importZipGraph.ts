import JSZip from 'jszip';
import { trpc } from '@/lib/trpc.ts';

/**
 * Fetches the ZIP from the image-api, extracts nodes.csv and edges.csv,
 * parses them, and appends to the existing database via tRPC.
 */
export async function importGraphFromZip(zip:JSZip) {
    const nodeFile = zip.file(/^nodes.csv$/i)?.[0];
    if (!nodeFile) throw new Error('nodes.csv not found in ZIP');
    const nodesText = await nodeFile.async('text');
    const nodeLines = nodesText.split(/\r?\n/).filter(Boolean);
    const nodeHeader = nodeLines.shift()!.split(',');
    const nodeInputs = nodeLines.map(line => {
        const parts = line.split(',').map(s => s.replace(/"/g, '').trim());
        return {
            id:         Number(parts[0]),
            building:   parts[1],
            floor:      Number(parts[2]),
            name:       parts[3],
            x:          Number(parts[4]),
            y:          Number(parts[5]),
            type:       parts[6],
        };
    });

    // 4) Extract and parse edges.csv
    const edgeFile = zip.file(/^edges.csv$/i)?.[0];
    if (!edgeFile) throw new Error('edges.csv not found in ZIP');
    const edgesText = await edgeFile.async('text');
    const edgeLines = edgesText.split(/\r?\n/).filter(Boolean);
    const edgeHeader = edgeLines.shift()!.split(',');
    const edgeInputs = edgeLines.map(line => {
        const parts = line.split(',').map(s => s.replace(/"/g, '').trim());
        return {
            sourceId: Number(parts[0]),
            targetId: Number(parts[1]),
            weight:   Number(parts[2]),
        };
    });

    return [nodeInputs, edgeInputs];
}
