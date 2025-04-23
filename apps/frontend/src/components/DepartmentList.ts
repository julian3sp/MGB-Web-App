{/*
Create an array for storing department information, including an id which will be used as URL (/directory/allergy),
the name of the department, its services and specialties (stored as an array to list as bullet points),
the location (floor/suite) of the department (stored as an array because some departments have multiple locations),
and the telephone number for the department
*/}

const DepartmentList = [
    // {
    //     id: "allergy",
    //     name: "Allergy and Clinical Immunology",
    //     specialties: [
    //         "Environmental Allergy",
    //         "Food Allergy",
    //         "Medication Allergy",
    //         "Venoms",
    //         "Asthma",
    //         "Anaphylaxis",
    //         "Angioedema",
    //         "Sinusitis",
    //         "Immunodeficiency"
    //     ],
    //     floor: ["3rd Floor, Suite 301", "5th Floor, Suite 540"],
    //     phone: "(617) 732-9850"
    // },
    // {
    //     id: "backup-child-care",
    //     name: "Backup Child Care Center",
    //     specialties: ["Backup childcare for employees"],
    //     floor: ["2nd Floor, Suite 210"],
    //     phone: "(617) 732-9543"
    // },
    // {
    //     id: "dermatology",
    //     name: "Brigham Dermatology Associates (BDA)",
    //     specialties: ["Medical Dermatology", "Surgical Dermatology"],
    //     floor: ["3rd Floor, Suite 317"],
    //     phone: "(617) 732-9080"
    // },
    // {
    //     id: "obgyn",
    //     name: "Brigham Obstetrics and Gynecology Group (BOGG)",
    //     specialties: ["Gynecology", "Obstetrics"],
    //     floor: ["5th Floor, Suite 575"],
    //     phone: "(617) 732-9100"
    // },
    // {
    //     id: "bpg",
    //     name: "Brigham Physicians Group (BPG)",
    //     specialties: ["Adult Primary Care"],
    //     floor: ["4th Floor, Suite 428", "5th Floor, Suite 530"],
    //     phone: "(617) 732-9900"
    // },
    // {
    //     id: "psychiatric",
    //     name: "Brigham Psychiatric Specialties",
    //     specialties: ["Psychiatry", "Psychology", "Social Work"],
    //     floor: ["3rd Floor, Suite 303"],
    //     phone: "(617) 732-9811"
    // },
    // {
    //     id: "pain-medicine",
    //     name: "Center for Pain Medicine",
    //     specialties: ["Multidisciplinary Pain Management"],
    //     floor: ["3rd Floor, Suite 320"],
    //     phone: "(617) 732-9060"
    // },
    // {
    //     id: "crohns-colitis",
    //     name: "Crohn’s and Colitis Center",
    //     specialties: [
    //         "Crohn’s Disease",
    //         "Inflammatory Bowel Disease",
    //         "Infusion Services",
    //         "Microscopic Colitis",
    //         "Pulmonary",
    //         "Rheumatology",
    //         "Ulcerative Colitis"
    //     ],
    //     floor: ["2nd Floor, Suite 201"],
    //     phone: "(617) 732-6389"
    // },
    // {
    //     id: "endoscopy",
    //     name: "Endoscopy Center",
    //     specialties: [
    //         "Bacterial Overgrowth Breath Test",
    //         "Colonoscopy",
    //         "H. Pylori Breath Test",
    //         "Lactose Malabsorption Breath Test",
    //         "Upper Endoscopy"
    //     ],
    //     floor: ["2nd Floor, Suite 202"],
    //     phone: "(617) 732-7426"
    // },
    // {
    //     id: "womens-health",
    //     name: "Gretchen S. and Edward A. Fish Center for Women’s Health",
    //     specialties: [
    //         "Cardiology",
    //         "Dermatology (Cosmetic, Medical, Surgical)",
    //         "Endocrinology",
    //         "Gastroenterology",
    //         "Gynecology",
    //         "Hematology",
    //         "Infectious Diseases",
    //         "Mental Health (Social Work)",
    //         "General Neurology",
    //         "Nutrition",
    //         "Primary Care",
    //         "Pulmonary",
    //         "Renal",
    //         "Rheumatology",
    //         "Sleep Medicine",
    //         "Women’s Health (Menopause and Midlife Clinic, Obstetric Internal Medicine)"
    //     ],
    //     floor: ["4th Floor, Suite 402"],
    //     phone: "(617) 732-9300"
    // },
    {
        id: "laboratory",
        name: "Laboratory",
        specialties: ["Blood Work", "Lab Services"],
        floor: ["1st Floor, Suite 100"],
        phone: "(617) 732-9841",
        building: "MGB (Chestnut Hill)"
    },
    {
        id: "multi-specialty",
        name: "Multi-Specialty Clinic",
        specialties: [
            "Orthopedic Surgery",
            "Vascular Surgery",
            "Contact Dermatitis and Occupational Dermatology Program",
            "Pain Medicine",
            "Travel Medicine"
        ],
        floor: ["1st Floor, Suite 130"],
        phone: "(617) 732-9500",
        building: "MGB (Chestnut Hill)"
    },
    {
        id: "blood-draw",
        name: "Blood Draw / Phlebotomy",
        specialties: [],
        floor: ["1st Floor, Suite 130"],
        phone: "(617) 732-0714",
        building: "20 Patriot Place"
    },
    {
        id: "pharmacy",
        name: "Pharmacy",
        specialties: [],
        floor: ["1st Floor, Suite 100"],
        phone: "(617) 732-0694",
        building: "20 Patriot Place"
    },
    {
        id: "radiology",
        name: "Radiology",
        specialties: [],
        floor: ["1st Floor, Suite 110"],
        phone: "(617) 732-0535",
        building: "20 Patriot Place"
    },
    {
        id: "urgent-care",
        name: "Urgent Care Center",
        specialties: [],
        floor: ["1st Floor, Suite 120"],
        phone: "(617) 732-0817",
        building: "20 Patriot Place"
    },
    {
        id: "urology",
        name: "Urology",
        specialties: [],
        floor: ["1st Floor, Suite 150"],
        phone: "(617) 732-0859",
        building: "20 Patriot Place"
    },
    {
        id: "gynecology",
        name: "Gynecology",
        specialties: [],
        floor: ["3rd Floor"],
        phone: "(617) 732-1604",
        building: "22 Patriot Place"
    },
    {
        id: "lactation",
        name: "Lactation",
        specialties: [],
        floor: ["3rd Floor"],
        phone: "(617) 732-1817",
        building: "22 Patriot Place"
    },
    {
        id: "vein-treatment",
        name: "Vein Treatment",
        specialties: [],
        floor: ["3rd Floor"],
        phone: "(617) 732-1798",
        building: "22 Patriot Place"
    },

    // {
    //     id: "integrative-health",
    //     name: "Osher Clinical Center for Integrative Health",
    //     specialties: [
    //         "Acupuncture",
    //         "Health Coaching",
    //         "Chiropractic",
    //         "Craniosacral Therapy",
    //         "Integrative Medicine",
    //         "Structural Massage & Movement Therapies",
    //         "Neurology (Movement Disorders and Headache)",
    //         "Echocardiography",
    //         "Pulmonary"
    //     ],
    //     floor: ["4th Floor, Suite 422"],
    //     phone: "(617) 732-9700"
    // },
    // {
    //     id: "financial-services",
    //     name: "Patient Financial Services",
    //     specialties: ["Patient Financial Counseling"],
    //     floor: ["2nd Floor, Suite 204B"],
    //     phone: "(617) 732-9677"
    // },

    {
        id: "radiology",
        name: "Radiology",
        specialties: ["Bone Density", "Breast Imaging/Mammography", "Ultrasound", "X-Ray"],
        floor: ["5th Floor, Suite 560"],
        phone: "(617) 732-9801",
        building: "MGB (Chestnut Hill)"
    },
    {
        id: "mri-ct",
        name: "Radiology, MRI/CT Scan",
        specialties: ["CT Scan", "MRI", "X-Ray"],
        floor: ["1st Floor, Suite 102B"],
        phone: "(617) 732-9810",
        building: "MGB (Chestnut Hill)"
    },
    // {
    //     id: "rehabilitation",
    //     name: "Rehabilitation Services",
    //     specialties: [
    //         "Orthopedic Physical Therapy",
    //         "Sports Physical Therapy",
    //         "Neurologic and Vestibular Physical Therapy",
    //         "Men’s and Women’s Pelvic Floor Physical Therapy",
    //         "Hand/Occupational Therapy",
    //         "Speech Language Pathology"
    //     ],
    //     floor: ["2nd Floor, Suite 200"],
    //     phone: "(617) 732-9525"
    // }

    {
        id: "admitting-registration",
        name: "Admitting/Registration",
        specialties: [],
        floor: ["1st Floor"],
        phone: "",
        building: "Faulkner"
    },
    {
        id: "audiology",
        name: "Audiology",
        specialties: ["Aud"],
        floor: ["1st Floor"],
        phone: "",
        building: "Faulkner"
    },
    {
        id: "blood-drawing-lab",
        name: "Blood Drawing Lab",
        specialties: [],
        floor: ["1st Floor"],
        phone: "",
        building: "Faulkner"
    },
    {
        id: "cardiac-rehab",
        name: "Cardiac Rehab",
        specialties: [],
        floor: ["1st Floor"],
        phone: "",
        building: "Faulkner"
    },
    {
        id: "emergency-department",
        name: "Emergency Department",
        specialties: [],
        floor: ["1st Floor"],
        phone: "",
        building: "Faulkner"
    },
    {
        id: "gi-endoscopy",
        name: "Endoscopy",
        specialties: ["Endoscopy"],
        floor: ["1st Floor"],
        phone: "",
        building: "Faulkner"
    },
    {
        id: "mri-ct",
        name: "MRI/CT",
        specialties: [],
        floor: ["1st Floor"],
        phone: "",
        building: "Faulkner"
    },
    {
        id: "pre-admittance-screening",
        name: "Pre-Admittance Screening",
        specialties: [],
        floor: ["1st Floor"],
        phone: "",
        building: "Faulkner"
    },
    {
        id: "pulmonary-lab",
        name: "Pulmonary Lab",
        specialties: [],
        floor: ["1st Floor"],
        phone: "",
        building: "Faulkner"
    },
    {
        id: "radiology",
        name: "Radiology",
        specialties: [],
        floor: ["1st Floor"],
        phone: "",
        building: "Faulkner"
    },
    {
        id: "special-testing",
        name: "Special Testing",
        specialties: [],
        floor: ["1st Floor"],
        phone: "",
        building: "Faulkner"
    },
    {
        id: "vascular-lab",
        name: "Vascular Lab",
        specialties: [],
        floor: ["1st Floor"],
        phone: "",
        building: "Faulkner"
    }
];

export default DepartmentList;