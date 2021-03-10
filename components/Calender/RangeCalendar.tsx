import React, { Component, useEffect, useState } from 'react'
import { Calendar, DateObject, LocaleConfig } from 'react-native-calendars'
import XDate from 'xdate'


LocaleConfig.locales['he'] = {
    monthNames: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
    monthNamesShort: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יוני', 'יולי', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
    dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
    dayNamesShort: ['א.', 'ב.', 'ג.', 'ד.', 'ה.', 'ו.', 'ש'],
};
LocaleConfig.defaultLocale = 'he';


interface IProps {
    dots: { [key: string]: { marked: boolean, dotColor: string } }
    selectedRangeCB: (startDate: Date, endDate: Date | undefined) => void
}

interface IMarkedDates {
    [x: string]: {
        startingDay?: boolean;
        color?: string;
        textColor?: string;
        endingDay?: boolean,
        marked?: boolean,
        dotColor?: string,

    };
}
const RangeCalendar = (props: IProps) => {
    const colors = { theme: { markColor: '#00adf5', markTextColor: '#ffffff' } }
    const [markedDates, setMarkedDates] = useState<IMarkedDates>(props.dots);
    const [fromDate, setFromDate] = useState<string>((new XDate(new Date())).addDays(1).toDateString())
    const [isFromDatePicked, setIsFromDatePicked] = useState(true)
    const [isToDatePicked, setIsToDatePicked] = useState(false)
    useEffect(() => {
        setMarkedDates(curr => {
            return { ...curr, '2021-06-28': { marked: true, dotColor: '#000' } }
        })
        return () => {
        }
    }, [])
    const clearAllSelectedDays = () => {
        const tmp: IMarkedDates = {};
        for (let key in markedDates) {
            if (markedDates[key].marked)
                tmp[key] = { marked: true, dotColor: markedDates[key].dotColor }
        }
        return tmp
    }

    const setUpStartMarker = (day: DateObject) => {
        let markedDatesObj = clearAllSelectedDays();
        markedDatesObj[day.dateString] = { ...markedDatesObj[day.dateString], color: colors.theme.markColor, textColor: colors.theme.markTextColor, endingDay: true, startingDay: true }
        setIsFromDatePicked(false);
        setIsToDatePicked(true);
        setFromDate(day.dateString);
        setMarkedDates(markedDatesObj);

    }
    const setupMarkedDates = (toDate: string): number => {
        let mFromDate = new XDate(fromDate)
        let mToDate = new XDate(toDate)
        let range = mFromDate.diffDays(mToDate)
        let markedDatesObj = markedDates
        if (range >= 0) {
            if (range == 0) {
                markedDatesObj[toDate] = { ...markedDatesObj[day.dateString], color: colors.theme.markColor, textColor: colors.theme.markTextColor }
            } else {
                for (var i = 1; i <= range; i++) {
                    let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
                    if (i < range) {
                        markedDatesObj[tempDate] = { ...markedDatesObj[tempDate], color: colors.theme.markColor, textColor: colors.theme.markTextColor }
                    } else {
                        markedDatesObj[tempDate] = { ...markedDatesObj[tempDate], endingDay: true, color: colors.theme.markColor, textColor: colors.theme.markTextColor }
                    }
                }
                markedDatesObj[fromDate] = { ...markedDatesObj[fromDate], color: colors.theme.markColor, textColor: colors.theme.markTextColor, startingDay: true, endingDay: false }
            }
        }
        setMarkedDates(markedDatesObj)

        return range
    }
    const onDayPress = (day: DateObject): void => {

        if (isFromDatePicked) {
            setUpStartMarker(day)
            props.selectedRangeCB((new XDate(fromDate)).addDays(1).toDate(), (new XDate(fromDate)).addDays(1).toDate())
        } else if (isToDatePicked) {

            let range = setupMarkedDates(day.dateString)
            if (range >= 0) {
                setIsFromDatePicked(true)
                setIsToDatePicked(false)
                setFromDate(day.dateString)
            } else {
                setUpStartMarker(day)
            }
            props.selectedRangeCB((new XDate(fromDate)).addDays(1).toDate(), (new XDate(fromDate)).addDays(range + 1).toDate())

        }

    }
    return <Calendar markingType={'period'}
        theme={{
            arrowStyle: {
                direction: 'ltr',
                transform: [
                    { rotateX: "180deg" },
                    { rotateZ: "180deg" }
                ],
                flexDirection: 'row-reverse'
            }
        }}
        current={fromDate}
        markedDates={markedDates || {}}
        onDayPress={onDayPress}
    />

}

export default RangeCalendar