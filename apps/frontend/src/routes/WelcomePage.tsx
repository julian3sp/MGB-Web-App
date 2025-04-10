"use client";
import React from "react";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import map from "../../assets/map.jpg";

export function WelcomePage() {
  return (
    <div className="flex flex-col overflow-hidden -mt-10 p-10">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-[#003a96]">
              Never get lost at<br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Mass General Brigham
                  <br/><br/>
              </span>
            </h1>
          </>
        }
      >
        <img
          src={map}
          alt="hero"
          height="720"
          width="1400"
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
