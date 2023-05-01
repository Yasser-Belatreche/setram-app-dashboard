export interface Announcement {
    id: string;
    title: string;
    description: string;
    departments: string[];
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
