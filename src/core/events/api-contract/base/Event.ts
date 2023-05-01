export interface Event {
    id: string;
    title: string;
    description: string;
    departments: string[];
    eventDate: Date;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
