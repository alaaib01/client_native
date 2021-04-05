import { Content, List, ListItem } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import TaskSummary from '../Task/TaskSummary';
import RangeCalendar from './RangeCalendar';
import 'react-native-get-random-values';
import { TaskDTO } from '../../interfaces/Tasks';
import XDate from 'xdate'
import { getTasksByUserId, getTasksMarksByUserId } from '../../axios/tasks/TasksRequests';
import { useDispatch, useSelector } from 'react-redux';
import STORE_CONSTS from '../../store/Consts';
import { COLORS } from '../../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
interface Props {

}

interface IDotMark { [key: string]: { marked: boolean, dotColor: string } }

const Calender = (props: Props) => {
    const tasks: TaskDTO[] = useSelector(state => state?.tasks?.tasks || [])
    const [dots, setDots] = useState<IDotMark>({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleMarkList = (tasksList: TaskDTO[]) => {
        const tmpDots: IDotMark = {};
        tasksList.forEach(task => {
            tmpDots[(new XDate(task.date)).toString('yyyy-MM-dd')] = { marked: true, dotColor: COLORS.dark.ERROR };
        });
        setDots(tmpDots);
    }
    // init marked dates ,  and load this month tasks  
    useEffect(() => {
        setInterval(() => {
            getTasksMarksByUserId(handleMarkList)
        }, 60000)
        getTasks((new XDate(new Date())).toDate(), (new XDate(new Date())).addMonths(1).toDate())
        getTasksMarksByUserId(handleMarkList)
    }, [])

    // load data from server 
    const dataHandler = (tasksList: TaskDTO[]) => {
        dispatch({ type: STORE_CONSTS.TASK.ACTIONS.ADD_TASKS, payload: { tasks: tasksList } })
        setLoading(false)
    }

    // get task from server 
    const getTasks = (startDate: Date, endDate: Date) => {
        setLoading(true)
        getTasksByUserId(startDate, endDate, dataHandler);
    }

    const renderTask = (item: TaskDTO) => {
        return <ListItem   key={`${item.id}`}>
            <TaskSummary  {...item.data.taskSummary} taskId={item.id} formType={item.formType} ></TaskSummary>
        </ListItem>
    }

    const handleDateChange = (startDate: Date, endDate: Date | undefined): void => {

        getTasks(startDate, endDate || startDate)
    }
    return <Content contentContainerStyle={styles.root} >
        <RangeCalendar dots={dots} selectedRangeCB={handleDateChange} />
        <Spinner
            visible={loading}
            textContent={'טוען'}
            textStyle={{ color: "#fff" }}

            size='large'
        />
        <List>
            {
                tasks.map(task=>renderTask(task))
            }
        </List>
        
    </Content>
}
export default Calender

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        padding: 10
    }
})
