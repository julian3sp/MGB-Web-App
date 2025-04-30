import { BackgroundLines } from "../components/ui/background-lines";
import { Card, CardContent } from "@/components/ui/card";


import julian from "../../assets/team-f-photos/julian.png";
import brendon from "../../assets/team-f-photos/brendon.png";
import kang from "../../assets/team-f-photos/kang.png";
import d from "../../assets/team-f-photos/d.png";
import ayush from "../../assets/team-f-photos/ayush.png";
import wheeler from "../../assets/team-f-photos/wheeler.png";
import jackson from "../../assets/team-f-photos/jackson.png";
import demas from "../../assets/team-f-photos/demas.png";
import conor from "../../assets/team-f-photos/conor.png";
import alejandro from "../../assets/team-f-photos/alejandro.png";

function AboutUs() {
    return (
        <div>

                <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full min-h-screen flex flex-col justify-center items-center pt-20 pb-15">

                    <div className="text-center px-6">
                        <h1 className="text-5xl font-bold text-[#003a96] mb-6">About Us</h1>
                        <p className="text-lg leading-7 dark:text-gray-300 text-gray-700 max-w-2xl mx-auto">
                            Welcome to Mass General Brigham! This application, developed by CS3733-D25 Software Engineering
                            students in the WPI Computer Science Department, is an all-in-one portal to everything you might
                            need related to Mass General Brigham! We would love to thank Professor Wilson Wong and our Student
                            Assistant Ian Wright for helping us develop the application. We would also like to extend a special
                            thanks to the Brigham and Women’s Hospital and representative Andrew Shinn for making this project
                            possible! See below to meet the team!
                        </p>
                    </div>

                    <div className="flex flex-wrap grid-cols-1 font-bold sm:grid-cols-2 md:grid-cols-3 gap-8 mt-20 px-6 w-full max-w-6xl align-items-center items-center content-center justify-center">

                        {/* Team Member 1 */}
                        <Card className="flex flex-col items-center p-6 hover:shadow-lg transition w-[325px] h-[250]">
                            <img src={julian}
                                 alt="Julian Espinal"
                                 className="rounded-full w-24 h-24 object-cover mb-4" />
                            <CardContent className="text-center">
                                <a href={"https://github.com/julian3sp"}>
                                    <h3 className="text-xl font-semibold">Julian Espinal</h3>
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Co-lead Eng, Back-end Eng.</p>
                            </CardContent>
                        </Card>

                        {/* Team Member 2 */}
                        <Card className="flex flex-col items-center p-6 hover:shadow-lg transition w-[325px] h-[250]">
                            <img src={brendon}
                                 alt="Brendon Peters"
                                 className="rounded-full w-24 h-24 object-cover mb-4" />
                            <CardContent className="text-center">
                                <a href={"https://github.com/bjpeters2027"}>
                                    <h3 className="text-xl font-semibold">Brendon Peters</h3>
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Co-Lead Eng, Feature Eng.</p>
                            </CardContent>
                        </Card>

                        {/* Team Member 3 */}
                        <Card className="flex flex-col items-center p-6 hover:shadow-lg transition w-[325px] h-[250]">
                            <img src={kang}
                                 alt="Kang Zhang"
                                 className="rounded-full w-24 h-24 object-cover mb-4" />
                            <CardContent className="text-center">
                                <a href={"https://github.com/KZhang101"}>
                                    <h3 className="text-xl font-semibold">Kang Zhang</h3>
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Project Manager, Feature Eng.</p>
                            </CardContent>
                        </Card>

                        {/* Team Member 4 */}
                        <Card className="flex flex-col items-center p-6 hover:shadow-lg transition w-[325px] h-[250]">
                            <img src={d}
                                 alt="Doanh Phung"
                                 className="rounded-full w-24 h-24 object-cover mb-4" />
                            <CardContent className="text-center">
                                <a href={"https://github.com/doanh280605"}>
                                    <h3 className="text-xl font-semibold">Doanh Phung</h3>
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Ass. Lead Eng, Front-End Eng.</p>
                            </CardContent>
                        </Card>

                        {/* Team Member 5 */}
                        <Card className="flex flex-col items-center p-6 hover:shadow-lg transition w-[325px] h-[250]">
                            <img src={ayush}
                                 alt="Ayush Kulkarni"
                                 className="rounded-full w-24 h-24 object-cover mb-4" />
                            <CardContent className="text-center">
                                <a href={"https://github.com/Ayushk2023"}>
                                    <h3 className="text-xl font-semibold">Ayush Kulkarni</h3>
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Product Owner, Front-End Eng.</p>
                            </CardContent>
                        </Card>

                        {/* Team Member 6 */}
                        <Card className="flex flex-col items-center p-6 hover:shadow-lg transition w-[325px] h-[250]">
                            <img src={wheeler}
                                 alt="Bryan Wheeler"
                                 className="rounded-full w-24 h-24 object-cover mb-4" />
                            <CardContent className="text-center">
                                <a href={"https://github.com/wheeler-bryan"}>
                                    <h3 className="text-xl font-semibold">Bryan Wheeler</h3>
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Document Analyst, Front-End Eng.</p>
                            </CardContent>
                        </Card>

                        {/* Team Member 7 */}
                        <Card className="flex flex-col items-center p-6 hover:shadow-lg transition w-[325px] h-[250]">
                            <img src={jackson}
                                 alt="Jackson Colegrove"
                                 className="rounded-full w-24 h-24 object-cover mb-4" />
                            <CardContent className="text-center">
                                <a href={"https://github.com/jacksoncolegrove"}>
                                    <h3 className="text-xl font-semibold">Jackson Colegrove</h3>
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Scrum Master, Front-End Eng.</p>
                            </CardContent>
                        </Card>

                        {/* Team Member 8 */}
                        <Card className="flex flex-col items-center p-6 hover:shadow-lg transition w-[325px] h-[250]">
                            <img src={demas}
                                 alt="Evan Demas"
                                 className="rounded-full w-24 h-24 object-cover mb-4" />
                            <CardContent className="text-center">
                                <a href={"https://github.com/EvanDemas"}>
                                    <h3 className="text-xl font-semibold">Evan Demas</h3>
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Back-End Eng.</p>
                            </CardContent>
                        </Card>

                        {/* Team Member 9 */}
                        <Card className="flex flex-col items-center p-6 hover:shadow-lg transition w-[325px] h-[250]">
                            <img src={conor}
                                 alt="Conor McCoy"
                                 className="rounded-full w-24 h-24 object-cover mb-4" />
                            <CardContent className="text-center">
                                <a href={"https://github.com/Conor-McCoy"}>
                                    <h3 className="text-xl font-semibold">Conor McCoy</h3>
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Front-End Eng.</p>
                            </CardContent>
                        </Card>

                        {/* Team Member 10 */}
                        <Card className="flex flex-col items-center p-6 hover:shadow-lg transition w-[325px] h-[250]">
                            <img src={alejandro}
                                 alt="Alejandro Laredo Lazaro"
                                 className="rounded-full w-24 h-24 object-cover mb-4" />
                            <CardContent className="text-center">
                                <a href={"https://github.com/Alejandr02212"}>
                                    <h3 className="text-xl font-semibold">Alejandro Laredo Lazaro</h3>
                                </a>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Back-End Eng.</p>
                            </CardContent>
                        </Card>


                    </div>
                    <br />
                    <p className="text-lg leading-7 dark:text-gray-300 text-gray-700 text-[8px] max-w-2xl mx-auto">
                        *The Brigham & Women’s Hospital maps and data used in this application are
                        copyrighted and provided for the sole use of educational purposes.
                    </p>

                </div>

        </div>
    );
}

export default AboutUs;
