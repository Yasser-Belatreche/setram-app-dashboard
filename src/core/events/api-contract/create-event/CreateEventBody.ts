export interface CreateEventBody {
    title: string;
    description: string;
    departments: string[];
    eventDate: Date;
    startDate: Date;
    endDate: Date;
}
