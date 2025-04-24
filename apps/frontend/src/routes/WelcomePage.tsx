"use client";
import React from "react";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import map from "../../assets/map.jpg";
import {Link} from "react-router-dom";
import Popup from "../components/ui/Popup.tsx";

export function WelcomePage() {
    const [tab, setTab] = React.useState<string>("");
    const [visible, setVisible] = React.useState(true);
    return (
        <div className="flex flex-col overflow-hidden -mt-10 p-10">
            <Popup message="This web application is strictly a CS3733-D25 Software Engineering class project for Prof. Wilson Wong at WPI" visible={visible} setVisible={setVisible} />
            <ContainerScroll
                titleComponent={
                    <>
                        <br/> <br/>
                        <h1 className="text-4xl font-semibold text-[#003a96]">
                            Never get lost at
                            <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Mass General Brigham
              </span>
                            <br />
                        </h1>
                        <h1 className="text-2xl font-semibold text-[#003a96] pt-[15px]">
                            Click the Map Below to Get Started!
                        </h1>
                        <br/><br/>
                    </>
                }
            >
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
    );
}