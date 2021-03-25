import { Content } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import TaskSummary from "../Task/TaskSummary";
import RangeCalendar from "./RangeCalendar";
import "react-native-get-random-values";
import { TaskDTO } from "../../interfaces/Tasks";
import XDate from "xdate";
import {
  getTasksByUserId,
  getTasksMarksByUserId,
} from "../../axios/tasks/TasksRequests";
import { useDispatch} from "react-redux";
import { COLORS } from "../../constants/Colors";
import TASK_ACTIONS from "../../store/Actions/TaskActions";
import { IDotMark } from "../../interfaces/Calendar";

interface Props {}

const Calender = (props: Props) => {
  const [tasks, setTasks] = useState<JSX.Element[] | null>(null);
  const [dots, setDots] = useState<IDotMark>({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleMarkList = (tasksList: TaskDTO[]) => {
    const tmpDots: IDotMark = {};
    tasksList.forEach((task) => {
      tmpDots[new XDate(task.date).toString("yyyy-MM-dd")] = {
        marked: true,
        dotColor: COLORS.dark.ERROR,
      };
    });
    setDots(tmpDots);
  };
  // init marked dates ,  and load this month tasks
  useEffect(() => {
    setInterval(() => {
      getTasksMarksByUserId(handleMarkList);
    }, 60000);
    getTasks(
      new XDate(new Date()).toDate(),
      new XDate(new Date()).addMonths(1).toDate()
    );
    getTasksMarksByUserId(handleMarkList);
  }, []);

  // load data from server
  const dataHandler = (tasksList: TaskDTO[]) => {
    const tmpTasks = tasksList.map((task) => (
      <TaskSummary
        key={`${task.id}`}
        {...task.data.taskSummary}
        taskId={task.id}
        formType={task.formType}
      ></TaskSummary>
    ));
    setTasks(tmpTasks);
    dispatch(TASK_ACTIONS.ADD_TASKS(tasksList));
    setLoading(false);
  };

  // get task from server
  const getTasks = (startDate: Date, endDate: Date) => {
    setLoading(true);
    getTasksByUserId(startDate, endDate, dataHandler);
  };

  const handleDateChange = (
    startDate: Date,
    endDate: Date | undefined
  ): void => {
    getTasks(startDate, endDate || startDate);
  };
  return (
    <Content contentContainerStyle={styles.root}>
      <RangeCalendar dots={dots} selectedRangeCB={handleDateChange} />
      <Spinner
        visible={loading}
        textContent={"טוען"}
        textStyle={{ color: "#fff" }}
        size="large"
      />
      {tasks}
    </Content>
  );
};
export default Calender;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    padding: 10,
  },
});
