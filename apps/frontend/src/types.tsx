type personalInfoType = {
    fullName: string;
    email: string;
    phoneNumber: string;
    employeeID: string;
};

type personalInfoFormProps = {
    formData: personalInfoType;
    setFormData: (formData: personalInfoType) => void;
};


type langRequestType = {
    fullName: string;
    email: string;
    phoneNumber: string;
    employeeID: string;
    device: string;
    room: number;
    comments: string;
};

type langRequestFormProps = {
    formData: langRequestType;
    setFormData: (formData: langRequestType) => void;
};

