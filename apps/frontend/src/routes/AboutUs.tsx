import React from "react";
import { MacbookScroll } from "../components/ui/macbook-scroll";
import { BackgroundLines } from "../components/ui/background-lines";
import { ContainerTextFlip } from "../components/ui/container-text-flip";
import aboutus from "../../assets/aboutus.png";

function AboutUs() {
  return (
    <div>
      <BackgroundLines>
        <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
            <MacbookScroll
                title={
                <span>
                    Do you like our team products? <br />   <ContainerTextFlip className="mt-3"
                                                                words={["Be honest", "Lebron", "Deadass"]}
                                                            />
                </span>
                }
                src={aboutus}
                showGradient={false}
            />
        </div>
      </BackgroundLines>
    </div>
  );
}

export default AboutUs