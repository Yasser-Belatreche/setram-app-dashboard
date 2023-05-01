export interface Workshop {
    id: string;
    title: string;
    description: string;
    departments: string[];
    workshopDate: Date;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
