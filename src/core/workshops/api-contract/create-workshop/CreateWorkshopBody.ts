export interface CreateWorkshopBody {
    title: string;
    description: string;
    department: string[];
    workshopDate: Date;
    startDate: Date;
    endDate: Date;
}
