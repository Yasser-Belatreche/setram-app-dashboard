export interface EditEmployeeBody {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    department: string;
    gender: string;
    birthDate: Date;
    startingDate: Date;
    email: string;
    newPassword?: string;
}
