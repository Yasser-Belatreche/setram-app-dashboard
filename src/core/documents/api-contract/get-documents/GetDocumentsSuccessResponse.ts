import { Document } from '../base/Document';

export type GetDocumentsSuccessResponse = {
    pagination: { total: number; totalPages: number };
    list: Document[];
};
