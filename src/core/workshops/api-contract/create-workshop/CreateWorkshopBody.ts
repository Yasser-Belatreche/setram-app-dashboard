export interface CreateWorkshopBody {
    title: string;
    description: string;
    departments: string[];
    workshopDate: Date;
    startDate: Date;
    endDate: Date;
}
