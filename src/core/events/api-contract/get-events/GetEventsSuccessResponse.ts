import { Event } from '../base/Event';

export type GetEventsSuccessResponse = {
    pagination: { total: number; totalPages: number };
    list: Event[];
};
