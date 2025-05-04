import { useState } from "react";
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

const quotes: Record<string, string> = {
    julian: "“Code is like humor. When you have to explain it, it’s bad.",
    brendon: "“If you only do what you can do now, you will never be more than you are” -Master Shifu",
    kang: "“Knowledge is knowing that a tomato is a fruit. Wisdom is knowing not to put it in a fruit salad.” -Brian O'Driscoll",
    d: "“(774)-525-0770.”",
    ayush: "“Life is like a Github repository: Nothing is going to change if don't commit",
    wheeler: "“You won’t realize your in the moment until it’s a memory” - Noizu",
    jackson: "“I’m a better father than you, Rick. I’m better for Lori than you, man!” - Shane, The Walking Dead",
    demas: "“Prior preparation prevents poor performance”",
    conor: "“Whether you think you can or you think you can't, you're probably right.” - Henry Ford",
    alejandro: "“Navigation.”",
};

const team = [
    { id: "julian", name: "Julian Espinal", role: "Co-lead Eng, Full-Stack Dev.", src: julian, github: "https://github.com/julian3sp" },
    { id: "brendon", name: "Brendon Peters", role: "Co-Lead Eng, Full-Stack Dev.", src: brendon, github: "https://github.com/bjpeters2027" },
    { id: "kang", name: "Kang Zhang", role: "Project Manager, Full-Stack Dev.", src: kang, github: "https://github.com/KZhang101" },
    { id: "d", name: "Doanh Phung", role: "Ass. Lead Eng, Full-Stack Dev.", src: d, github: "https://github.com/doanh280605" },
    { id: "ayush", name: "Ayush Kulkarni", role: "Product Owner, Full-Stack Dev.", src: ayush, github: "https://github.com/Ayushk2023" },
    { id: "wheeler", name: "Bryan Wheeler", role: "Document Analyst, Full-Stack Dev.", src: wheeler, github: "https://github.com/wheeler-bryan" },
    { id: "jackson", name: "Jackson Colegrove", role: "Scrum Master, Full-Stack Dev.", src: jackson, github: "https://github.com/jacksoncolegrove" },
    { id: "demas", name: "Evan Demas", role: "Full-Stack Dev.", src: demas, github: "https://github.com/EvanDemas" },
    { id: "conor", name: "Conor McCoy", role: "Full-Stack Dev.", src: conor, github: "https://github.com/Conor-McCoy" },
    { id: "alejandro", name: "Alejandro Laredo Lazaro", role: "Full-Stack Dev.", src: alejandro, github: "https://github.com/Alejandr02212" },
];

export default function AboutUs() {
    const [selectedMember, setSelectedMember] = useState<string | null>(null);

    return (
        <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full min-h-screen flex flex-col justify-center items-center pt-20 pb-15">
            <div className="text-center px-6">
                <h1 className="text-5xl font-bold text-[#003a96] mb-6">About Us</h1>
                <p className="text-lg leading-7 dark:text-gray-300 text-gray-700 max-w-2xl mx-auto">
                    Welcome to Mass General Brigham! This application, developed by CS3733-D25 Software Engineering
                    students in the WPI Computer Science Department, is an all-in-one portal to everything you might
                    need related to Mass General Brigham! We would love to thank Professor Wilson Wong and our Student
                    Assistant Ian Wright for helping us develop the application.
                </p>
            </div>

            <div className="flex flex-wrap gap-8 mt-20 px-6 w-full max-w-6xl justify-center">
                {team.map((member) => (
                    <Card key={member.id} className="flex flex-col items-center p-6 hover:shadow-lg transition w-[325px] min-h-[275px]">
                        <img
                            src={member.src}
                            alt={member.name}
                            onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                            className="cursor-pointer rounded-full w-24 h-24 object-cover mb-4"
                        />
                        <CardContent className="text-center">
                            <a href={member.github}>
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                            </a>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                            {selectedMember === member.id && (
                                <p className="mt-4 text-sm italic text-gray-700 dark:text-gray-300">{quotes[member.id]}</p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <p className="mt-16 text-lg leading-7 dark:text-gray-300 text-gray-700 max-w-2xl mx-auto text-center">
                Special thanks to Brigham and Women’s Hospital and their representative Andrew Shinn – Senior Planner – for his time and input.
            </p>

            <p className="text-lg leading-7 dark:text-gray-300 text-gray-700 text-[8px] max-w-2xl mx-auto text-center">
                *The Brigham & Women’s Hospital maps and data used in this application are copyrighted and provided for the sole use of educational purposes.
            </p>
        </div>
    );
}
