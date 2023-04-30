export interface EditDocumentBody {
    title: string;
    description: string;
    departments: string[];
    document: File | undefined;
}
