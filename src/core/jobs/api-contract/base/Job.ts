export interface Job {
    id: string;
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
    isActive: boolean;
    applicationDeadline: Date;
    createdAt: Date;
    updatedAt: Date;
}
