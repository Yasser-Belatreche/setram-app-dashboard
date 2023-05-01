export interface Event {
    id: string;
    title: string;
    description: string;
    departments: string[];
    eventDate: Date;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
