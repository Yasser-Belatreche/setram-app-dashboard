export interface CreateEventBody {
    title: string;
    description: string;
    department: string[];
    eventDate: Date;
    startDate: Date;
    endDate: Date;
}
