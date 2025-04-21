"use client";
import React from "react";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import map from "../../assets/map.jpg";
import {Link} from "react-router-dom";

export function WelcomePage() {
    const [tab, setTab] = React.useState<string>("");
  return (
    <div className="overflow-hidden p-15">
        <h6 className="text-center text-[#003a96] pt-10">
            This web application is strictly a CS3733-D25 Software Engineering class project for Prof. Wilson
            Wong at WPI</h6>
        <br/>
        <h1 className="text-center text-4xl font-semibold text-[#003a96]">
            Never get lost at
            <br />
            <span className="md:text-[6rem] font-bold mt-1 leading-none">
                Mass General Brigham
              </span>
        </h1>
        <div className="mt-0 mb-0 p-0">
        <ContainerScroll titleComponent={
            <div>
            <h1 className="text-2xl font-semibold text-[#003a96]">
                Click the Map Below to Get Started!
            </h1>
            <br/><br/>
        </div>}>
          <Link to="/navigation" onClick={() => setTab("")}>
            <img
              src={map}
              alt="hero"
              height="720"
              width="1400"
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </Link>
        </ContainerScroll>
        </div>
    </div>
  );
}
