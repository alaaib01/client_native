
export interface IDotMark {
    [key: string]: { marked: boolean; dotColor: string };
}

export interface IMarkedDates {
    [x: string]: {
        startingDay?: boolean;
        color?: string;
        textColor?: string;
        endingDay?: boolean,
        marked?: boolean,
        dotColor?: string,

    };
}

export interface IRangeCalenderProps {
    dots: { [key: string]: { marked: boolean, dotColor: string } }
    selectedRangeCB: (startDate: Date, endDate: Date | undefined) => void
    visible: boolean
}