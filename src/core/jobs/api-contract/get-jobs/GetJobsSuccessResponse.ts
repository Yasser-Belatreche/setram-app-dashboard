import { Job } from '../base/Job';

export type GetJobsSuccessResponse = {
    pagination: { total: number; totalPages: number };
    list: Job[];
};
