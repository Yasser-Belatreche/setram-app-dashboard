export interface CreateAnnouncementBody {
    title: string;
    description: string;
    department: string[];
    startDate: Date;
    endDate: Date;
}
