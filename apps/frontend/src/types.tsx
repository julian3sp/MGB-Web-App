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




