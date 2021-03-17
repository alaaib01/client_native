import { Content } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, } from 'react-native'

import TaskSummary from '../Task/TaskSummary';
import RangeCalendar from './RangeCalendar';
import 'react-native-get-random-values';
import { TaskDTO } from '../../interfaces/Tasks';
import XDate from 'xdate'
import { getTasksByUserId, getTasksMarksByUserId } from '../../axios/tasks/TasksRequests';
import { useDispatch, useSelector } from 'react-redux';
import STORE_CONSTS from '../../store/Consts';
interface Props {

}

interface IDotMark { [key: string]: { marked: boolean, dotColor: string } }

const Calender = (props: Props) => {
    const [tasks, setTasks] = useState<JSX.Element[] | null>(null)
    const [dots, setDots] = useState<IDotMark>({});
    const dispatch = useDispatch();

    // init marked dates ,  and load this month tasks  
    useEffect(() => {
        getTasksMarksByUserId('6049dd798b84dc429c1f00a8', (tasksList) => {
            const tmpDots: IDotMark = {};
            tasksList.forEach(task => {
                tmpDots[(new XDate(task.date)).toString('yyyy-MM-dd')] = { marked: true, dotColor: "#000" };
            });
            setDots(tmpDots);
        })
        getTasks((new XDate(new Date())).toDate(), (new XDate(new Date())).addMonths(1).toDate())
    }, [])

    // load data from server 
    const dataHandler = (tasksList: TaskDTO[]) => {
        const tmpTasks = tasksList.map(task => <TaskSummary key={`${task.id}${task.date}`} {...task.data.taskSummary} formType={task.formType} ></TaskSummary>);
        setTasks(tmpTasks);
        dispatch({ type: STORE_CONSTS.TASK.ACTIONS.ADD_TASKS, payload: { tasks: tasksList } })
    }

    // get task from server 
    const getTasks = (startDate: Date, endDate: Date) => getTasksByUserId('6049dd798b84dc429c1f00a8', startDate, endDate, dataHandler);


    const handleDateChange = (startDate: Date, endDate: Date | undefined): void => {

        getTasks(startDate, endDate || startDate)
    }
    return <Content contentContainerStyle={styles.root} >
        <RangeCalendar dots={dots} selectedRangeCB={handleDateChange} />
        {
            tasks
        }
    </Content>
}
export default Calender

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        padding: 10
    }
})
