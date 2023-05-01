export interface EditJobBody {
    title: string;
    description: string;
    departments: string[];
    location: string;
    salary: string;
    experience: string;
    education: string;
    skills: string[];
    benefits: string[];
    contact: string;
    applicationDeadline: Date;
}
