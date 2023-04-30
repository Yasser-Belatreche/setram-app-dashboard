export interface CreateDocumentBody {
    title: string;
    description: string;
    departments: string[];
    document: File;
}
