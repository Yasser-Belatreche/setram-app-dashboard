import { Announcement } from '../base/Announcement';

export type GetAnnouncementsSuccessResponse = {
    pagination: { total: number; totalPages: number };
    list: Announcement[];
};
