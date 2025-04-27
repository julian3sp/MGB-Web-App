import React, { useRef } from 'react';
import { Card } from "@/components/ui/apple-cards-carousel";
import { useInView } from "framer-motion";
import {flipCardsData} from '../data/flipCardData.tsx'
import { AppleCardsListing } from "../components/department/AppleCardsListing.tsx"
import {AppleCardsCarouselDemo} from "@/components/AppleCardsCarouselDemo.tsx";


export function BryanDirectoryPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const inView = useInView(pageRef, { amount: 0.5})

    const flipCards = flipCardsData.map((flipCard, i) =>
        (
            <Card key={i} card={flipCard} index={i} />
    ));

    return (
        <>
            <div className="min-h-screen font-[Poppins] pt-4 px-[16px]">
                <h1
                    className="text-4xl font-bold font-[Poppins] text-left"
                    style={{ color: '#003A96' }}
                >
                    Department Directory:
                </h1>
                <AppleCardsListing />
            </div>
        </>
    );
}