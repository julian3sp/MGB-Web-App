import radiologyImg from '../../assets/radiology-mgbh.png';
import bloodImg from '../../assets/department/blood.webp';
import urgentCareImg from '../../assets/department/urgent-care.png';
import pharmacyImg from '../../assets/department/pharmacy.png';
import cardiacImg from '../../assets/department/cardiac.jpeg';
import urologyImg from '../../assets/department/urology.png';
import surgery from '../../assets/department/surgery.webp';
import ortho from '../../assets/department/ortho.jpg';
import sport from '../../assets/department/sports.jpg';
import rehab from '../../assets/department/primary.jpeg';
import audiologyImg from '../../assets/department/aud2.webp';
import pulmonologyImg from '../../assets/department/pulmonology.jpg';
import mriCTImg from '../../assets/department/mriCT.png';
import endoImg from '../../assets/department/endocrinology.jpg';
import vascularImg from '../../assets/department/vascular.png';
import radiology2 from '../../assets/department/mriCT.png';
import nutrition from '../../assets/department/nutrition.jpg';
import primary from '../../assets/department/neurology.jpg';
import multispecpat22 from '../../assets/department/pat22multisp.jpg';
import pfs from '../../assets/department/pfs.jpg'
import phl from '../../assets/department/veinTreatment.jpeg';
import prcr from '../../assets/department/primcar.jpg';
import cardiacrehab from '../../assets/department/cardiacrehab.jpg';
import spectest from '../../assets/department/spectest.jpg';
import recoveryImg from '../../assets/department/recovery.jpg';
import dialysis from '../../assets/department/dialysis.jpg';
import lungcenter from '../../assets/department/lungcenter.jpg';
import tsurg from '../../assets/department/tsurg.jpg';

import pathImage from "../../assets/insideMGB.png";
import editorImage from "../../assets/phoneMap.jpeg";
import serviceImage from "../../assets/service.jpeg";
import { CardContent } from "../components/department/CardContent.tsx";




export const flipCardsData = [
    {
        category: "Chestnut Hill",
        title: "Laboratory",
        src: serviceImage,
        content: (
            <div>
                <CardContent
                    location={"1st Floor, Suite 100"}
                    specialties={["Blood Work", "Lab Services"]}
                    phoneNumber={"(617) 732-9841"}
                />
            </div>
        ),
    },
    {
        category: "Chestnut Hill",
        title: "Multi-Specialty Clinic",
        src: pathImage,
        content: (
            <div>
                <CardContent
                    location={"1st Floor, Suite 130"}
                    specialties={["Orthopedic Surgery", "Vascular Services", "Contact Dermatitis", "Occupational Dermatology Program", "Pain Medicine", "Travel Medicine"]}
                    phoneNumber={"(617) 732-9500"}
                />
            </div>
        ),
    },
    {
        category: "Chestnut Hill",
        title: "Radiology, MRI/CT Scan",
        src: radiologyImg,
        content: (
            <div>
                <CardContent
                    location={"1st Floor, Suite 100"}
                    specialties={["CT Scan", "MRI", "X-Ray"]}
                    phoneNumber={"(617) 732-9821"}
                />
            </div>
        ),
    },
    {
        category: "Patriot Place",
        title: "Pharmacy",
        src: pharmacyImg,
        content: (
                <p className={"text-white"}>
                    <CardContent
                        location={"20 Patriot Place, 1st Floor"}
                        specialties={[""]}
                        phoneNumber={""}
                    />
                </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Blood Draw / Phlebotomy",
        src: bloodImg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"20 Patriot Place, 1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Urgent Care Center",
        src: urgentCareImg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"20 Patriot Place, 1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Cardiovascular Services",
        src: cardiacImg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"20 Patriot Place, 1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Urology",
        src: urologyImg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"20 Patriot Place, 1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Radiology",
        src: radiology2,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"20 Patriot Place, 1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Orthopaedics",
        src: ortho,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"20 Patriot Place, 2nd Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Rehabilitation Services",
        src: rehab,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"20 Patriot Place, 2nd Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Sports Medicine Center",
        src: sport,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"20 Patriot Place, 3rd Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Surgical Specialties",
        src: surgery,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"20 Patriot Place, 3rd Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Pain Medicine / Nutrition",
        src: nutrition,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"20 Patriot Place, 4th Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Physiatry",
        src: primary,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"20 Patriot Place, 4th Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Pulmonary Lab",
        src: pulmonologyImg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"20 Patriot Place, 4th Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Multi Specialty Clinic",
        src: multispecpat22,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"22 Patriot Place, 3rd Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Patient Financial Services",
        src: pfs,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"22 Patriot Place, 3rd Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Phlebotomy",
        src: phl,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"22 Patriot Place, 4th Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Primary Care",
        src: prcr,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"22 Patriot Place, 4th Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Audiology",
        src: audiologyImg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Blood Drawing Lab",
        src: bloodImg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Cardiac Rehab",
        src: cardiacrehab,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Dialysis",
        src: dialysis,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"Belkin House"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Emergency Department",
        src: urgentCareImg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Endoscopy",
        src: endoImg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "MRI/CT Scans",
        src: mriCTImg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Radiology",
        src: radiologyImg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Special Testing",
        src: spectest,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Recovery",
        src: recoveryImg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"1st Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Main Campus",
        title: "Lung Center",
        src: lungcenter,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"2nd Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
    {
        category: "Main Campus",
        title: "Thoracic Surgery Clinic",
        src: tsurg,
        content: (
            <p className={"text-white"}>
                <CardContent
                    location={"2nd Floor"}
                    specialties={[""]}
                    phoneNumber={""}
                />
            </p>
        ),
    },
];