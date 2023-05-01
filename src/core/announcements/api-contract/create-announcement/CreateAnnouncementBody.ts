export interface CreateAnnouncementBody {
    title: string;
    description: string;
    departments: string[];
    startDate: Date;
    endDate: Date;
}
