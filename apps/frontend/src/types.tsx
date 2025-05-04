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

export type ServiceRequest = {
    request_id: number;
    name: string;
    request_type: string;
    request_date: string;
    status: string;
    location: string;
    priority: string;
    department: string;
    employee_id: string | null;
    additional_comments: string | null;
    image_upload: string | null;
    assigned_employee: string | null;
};



