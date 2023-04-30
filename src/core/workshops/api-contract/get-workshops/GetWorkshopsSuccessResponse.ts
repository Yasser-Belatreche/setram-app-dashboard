import { Workshop } from '../base/Workshop';

export type GetWorkshopsSuccessResponse = {
    pagination: { total: number; totalPages: number };
    list: Workshop[];
};
