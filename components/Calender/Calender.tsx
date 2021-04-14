import { Button, Content, Icon, Input, Item, Text } from "native-base";
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
import { useDispatch } from "react-redux";
import { COLORS } from "../../constants/Colors";
import TASK_ACTIONS from "../../store/Actions/TaskActions";
import { IDotMark } from "../../interfaces/Calendar";
import { v4 as uuidv4 } from 'uuid';


interface Props {
  formTypes: number[];
  setTabCount: (num: number) => void;
}

const Calender = (props: Props) => {
  const [tasks, setTasks] = useState<JSX.Element[] | null>(null);
  const [allTasks, setAllTasks] = useState<TaskDTO[] | undefined>();
  const [dots, setDots] = useState<IDotMark>({});
  const [loading, setLoading] = useState(false);
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
    const filtered = tasksList.filter(
      (t) => props.formTypes.indexOf(t.formType) >= 0
    );
    props.setTabCount(filtered.length);
    const tmpTasks = filtered.map((task) => (
      <TaskSummary 
        key={uuidv4()}
        {...task.data.taskSummary}
        taskId={task.id}
        formType={task.formType}
      ></TaskSummary>
    ));
    setTasks(tmpTasks);
    //dispatch(TASK_ACTIONS.ADD_TASKS(tasksList));
    setAllTasks(filtered);
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

  const mapTasksToComponents = (tasks: TaskDTO[]) => {
    const tasksComponents = tasks.map((task) => (
      <TaskSummary
        key={`${task.id}`}
        {...task.data.taskSummary}
        taskId={task.id}
        formType={task.formType}
      ></TaskSummary>
    ));
    return tasksComponents;
  };
  const filterTasks = (text: string) => {
    console.log(text);
    if (!!text.trim()) {
      const t = allTasks?.filter((task) => {
        return !!task.formType.toString().includes(text);
      });
      const tmp = mapTasksToComponents(t || []);
      setTasks(tmp);
    } else {
      const tmp = mapTasksToComponents(allTasks || []);
      setTasks(tmp);
    }
  };
  return (
    <Content contentContainerStyle={styles.root}>
      <RangeCalendar
        dots={dots}
        selectedRangeCB={handleDateChange}
      />
      <Spinner
        visible={loading}
        textContent={"טוען"}
        textStyle={{ color: "#fff" }}
        size="large"
      />
      <Item>
        <Input
          placeholder="חיפוש"
          onChangeText={filterTasks}
          style={{ direction: "rtl", textAlign: "right" }}
        />
        <Icon name="search" />
      </Item>

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
