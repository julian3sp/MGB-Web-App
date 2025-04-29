import radiologyImg from '../../assets/radiology-mgbh.png';
import lebron1 from '../../assets/lebron-dunk.jpg';
import lebron2 from '../../assets/lebron-poster.jpg';
import testingImg from '../../assets/insideMGB.png';
import pathImage from "../../assets/insideMGB.png";
import editorImage from "../../assets/phoneMap.jpeg";
import serviceImage from "../../assets/service.jpeg";
import { CardContent } from "../components/department/CardContent.tsx";




export const flipCardsData = [
    {
        category: "Chestnut Hill",
        title: "Radiology",
        src: radiologyImg,
        content: (
            <div>
                <CardContent
                    location={"1st Floor, Suite 100"}
                    specialties={["Blood Work", "Lab Services"]}
                    phoneNumber={"(508)-259-7878"}
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
                    phoneNumber={"(508)-259-7878"}
                />
            </div>
        ),
    },
    {
        category: "Chestnut Hill",
        title: "Laboratory",
        src: serviceImage,
        content: (
            <p className="text-white">
                Edit floor plans on the fly—add new wings, close corridors, or annotate points of interest.
            </p>
        ),
    },
    {
        category: "Service Request",
        title: "On-Demand Assistance",
        src: serviceImage,
        content: (
            <p className="text-white">
                Submit and track service requests—whether you need wheelchair help, staff escort, or equipment delivery.
            </p>
        ),
    },
    {
        category: "Service Request",
        title: "On-Demand Assistance",
        src: lebron1,
        content: (
            <p className="text-white">
                Submit and track service requests—whether you need wheelchair help, staff escort, or equipment delivery.
            </p>
        ),
    },

    {
        category: "Brigham & Women's Hospital Main Campus",
        title: "Filter test 1",
        src: lebron1,
        content: (
            <p className="text-white">
                test
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Filter test 2",
        src: lebron1,
        content: (
            <p className="text-white">
                test
            </p>
        ),
    },
    {
        category: "Faulkner Hospital",
        title: "Filter test 3",
        src: lebron1,
        content: (
            <p className="text-white">
                test
            </p>
        ),
    },
];