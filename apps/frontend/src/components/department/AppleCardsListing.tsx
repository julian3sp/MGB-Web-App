"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import {flipCardsData} from "../../data/flipCardData.tsx"
import { Listing, Card } from "./Listing.tsx"

export function AppleCardsListing() {
    const carouselRef = useRef<HTMLDivElement>(null);

    const inView = useInView(carouselRef, { amount: 0.5 }); // remove the trigger once to make it runs whenever came into sight

    const cards = flipCardsData.map((flipCard, i) => (
        <Card key={i} card={flipCard} index={i} />
    ));

    return (
        <div ref={carouselRef} className="w-full -mt-5 bg-white">
            {/*
        Pass the `inView` flag down so the Carousel
        only plays its internal animations when it scrolls into view.
      */}
            <Listing items={cards} playAnimation={inView} />
        </div>
    );
}
