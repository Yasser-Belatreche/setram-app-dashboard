export interface Event {
    id: string;
    title: string;
    description: string;
    department: string[];
    eventDate: Date;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
