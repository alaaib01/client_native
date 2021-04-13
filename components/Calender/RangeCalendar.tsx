import React, { Component, useEffect, useState } from "react";
import { Calendar, DateObject, LocaleConfig } from "react-native-calendars";
import XDate from "xdate";
import { CALENDAR_COLORS, HebrewConfig } from "../../constants/Calendar";
import { COLORS } from "../../constants/Colors";
import { IMarkedDates, IRangeCalenderProps } from "../../interfaces/Calendar";
import { View } from "react-native";
import { Subtitle, Text, Title } from "native-base";
import RightElements from "../FormComponents/General/RightElements";
LocaleConfig.locales["he"] = HebrewConfig;
LocaleConfig.defaultLocale = "he";

const RangeCalendar = (props: IRangeCalenderProps) => {
  const [visibleCalendar, setVisibleCalender] = useState(props.visible);
  const [dateRange, setDateRange] = useState(0);
  // dates marked with dots
  const [markedDates, setMarkedDates] = useState<IMarkedDates>(props.dots);
  // selected date from
  const [fromDate, setFromDate] = useState<string>(
    new XDate(new Date()).addDays(1).toDateString()
  );
  // indecatis if the next click on date is from date or to date
  const [isFromDatePicked, setIsFromDatePicked] = useState(true);

  const [isToDatePicked, setIsToDatePicked] = useState(false);

  const defaultMarkUpColor = {
    color: CALENDAR_COLORS.theme.markColor,
    textColor: CALENDAR_COLORS.theme.markTextColor,
  };
  // today is always marked with a diffrent color if not selected or in a selected range
  const today = new XDate(new Date()).toString("yyyy-MM-dd");
  useEffect(() => {
    setMarkedDates((curr) => {
      return { ...curr, ...props.dots };
    });
  }, [props.dots]);

  useEffect(() => {
    setVisibleCalender(props.visible);
    console.log(props.visible);
  }, [props.visible]);
  // clear all the selected marked dates
  const clearAllSelectedDays = () => {
    const tmp: IMarkedDates = {};
    for (let key in markedDates) {
      if (markedDates[key].marked)
        tmp[key] = { marked: true, dotColor: markedDates[key].dotColor };
    }
    return tmp;
  };
  // init start up marker
  const setUpStartMarker = (day: DateObject) => {
    let markedDatesObj = clearAllSelectedDays();
    markedDatesObj[day.dateString] = {
      ...markedDatesObj[day.dateString],
      ...defaultMarkUpColor,
      endingDay: true,
      startingDay: true,
    };
    setIsFromDatePicked(false);
    setIsToDatePicked(true);
    setFromDate(day.dateString);
    setMarkedDates(markedDatesObj);
  };
  /**
   * mark dates between the selected range , if range is only one date the mark this date
   * if selected date is smaller than from date then mark it and remove from date mark
   * @param toDate to date string
   * @returns
   */
  const setupMarkedDates = (toDate: string): number => {
    try {
      let mFromDate = new XDate(fromDate);
      let mToDate = new XDate(toDate);
      let markedDatesObj = markedDates;
      // calculate range between from date to to date
      let range = mFromDate.diffDays(mToDate);
      // update marked dates obj set colors and date end or date start or both
      const updateMarkedDatesObj = (
        key: string,
        startingDay?: boolean,
        endingDay?: boolean
      ) => {
        markedDatesObj[key] = {
          ...markedDatesObj[key],
          ...defaultMarkUpColor,
          endingDay: !!endingDay,
          startingDay: !!startingDay,
        };
      };
      // if to date is gte from date , else mark only this date as start and end date
      if (range >= 0) {
        // from date equal to to date mark only this date as starting and ending date
        if (range == 0) {
          updateMarkedDatesObj(toDate, false, false);
        } else {
          // for each between from and to dates (exluding from) mark it with no ending nor starting style
          for (var i = 1; i <= range; i++) {
            let tempDate = mFromDate.addDays(1).toString("yyyy-MM-dd");
            // if date is smaller than end date mark it without starting or ending style else style it with ending style
            if (i < range) {
              updateMarkedDatesObj(tempDate, false, false);
            } else {
              updateMarkedDatesObj(tempDate, false, true);
            }
          }
          updateMarkedDatesObj(fromDate, true, false);
        }
        setDateRange(range);
      }
      setMarkedDates(markedDatesObj);
      return range;
    } catch (e) {
      return 0;
    }
  };
  // handle day press
  const onDayPress = (day: DateObject): void => {
    if (day)
      if (isFromDatePicked) {
        // if from date picked (no from day selected )
        setUpStartMarker(day);
        props.selectedRangeCB(
          new XDate(day.dateString).toDate(),
          new XDate(day.dateString).toDate()
        );
      }
      // there is an already picked from date and its a range select
      else if (isToDatePicked) {
        // mark up range
        let range = setupMarkedDates(day.dateString);
        // if range is gte 0
        if (range >= 0) {
          // next select will be from date
          setIsFromDatePicked(true);
          setIsToDatePicked(false);
          setFromDate(day.dateString);
          // send selected range to callback
          props.selectedRangeCB(
            new XDate(fromDate).toDate(),
            new XDate(fromDate).addDays(range).toDate()
          );
        } else {
          setUpStartMarker(day);
          props.selectedRangeCB(
            new XDate(day.dateString).toDate(),
            new XDate(day.dateString).toDate()
          );
        }
      }
  };

  return visibleCalendar ? (
    <Calendar
      markingType={"period"}
      theme={{
        arrowStyle: {
          direction: "ltr",
          transform: [{ rotateX: "180deg" }, { rotateZ: "180deg" }],
          flexDirection: "row-reverse",
        },
      }}
      current={fromDate}
      markedDates={
        {
          [today]: {
            selected: true,
            color: COLORS.LIGHT.SUCCESS,
            startingDay: true,
            endingDay: true,
          },
          ...markedDates,
        } || {}
      }
      onDayPress={onDayPress}
    />
  ) : (
    <RightElements style={{ textAlign: "ceneter", padding: 15 }}>
      <Title>
        מתאריך :{new XDate(fromDate).toString("dd/MM/yyyy")} עד תאריך :{" "}
        {new XDate(fromDate).addDays(dateRange).toString("dd/MM/yyyy")}
      </Title>
    </RightElements>
  );
};

export default RangeCalendar;
