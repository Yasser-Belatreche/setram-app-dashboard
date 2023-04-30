export interface Announcement {
    id: string;
    title: string;
    description: string;
    department: string[];
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
