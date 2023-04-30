export interface EmployeePlanning {
    sunday: DayTiming[];
    monday: DayTiming[];
    tuesday: DayTiming[];
    wednesday: DayTiming[];
    thursday: DayTiming[];
    friday: DayTiming[];
    saturday: DayTiming[];
}

export interface DayTiming {
    label: string;
    start: Time;
    end: Time;
}
export interface Time {
    hour: number;
    minute: number;
}
