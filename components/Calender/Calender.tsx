import { Button, Content, Text } from 'native-base'
import React, { useState } from 'react'
import { Alert, StyleSheet, } from 'react-native'
import axios from 'axios'
import TaskSummary from '../Task/TaskSummary';
import RangeCalendar from './RangeCalendar';
import 'react-native-get-random-values';
import { v1 as uuid } from 'uuid'
import faker from 'faker'
import { ITaskSummaryData } from '../../interfaces/Tasks';
import XDate from 'xdate'
interface Props {

}


const Calender = (props: Props) => {
    const [tasks, setTasks] = useState<JSX.Element | null>(null)
    const [dots, setDots] = useState<{ [key: string]: { marked: boolean; dotColor: string; }; }>({});
    const tmpTasks: JSX.Element[] = []
    const dotsTmp = {}
    const generateDate = (startDate: Date, endDate: Date | undefined): ITaskSummaryData => {
        const d: ITaskSummaryData = { order: [], data: {} }
        const currDate = new XDate(faker.date.between(startDate, endDate || startDate));
        let s = uuid()
        d.order.push(uuid().toString())
        d.order.push(uuid().toString())
        d.order.push(uuid().toString())
        d.order.push(uuid().toString())

        d.data[d.order[2]] = {
            label: 'כתובת הנכס',
            value: faker.address.streetAddress()
        }

        d.data[d.order[3]] = {
            label: 'תאריך לסיום',
            value: currDate.toString('dd/MM/yyyy')
        }

        d.data[d.order[0]] = {
            label: 'שם משלם',
            value: faker.name.firstName() + ' ' + faker.name.lastName()
        }

        d.data[d.order[1]] = {
            label: 'מספר טלפון',
            value: faker.phone.phoneNumber('052-########')
        }
        d.data[d.order[4]] = {
            label: 'משימה',
            value: faker.vehicle.type()
        }
        d.date = currDate.toString('yyyy-MM-dd')
        return d
    }

    for (let i = 0; i < faker.random.number({ min: 1, max: 15 }); i++) {
        const data = generateDate((new XDate(2021, 3, 1)).toDate(), (new XDate(2021, 3, 31)).toDate());
        tmpTasks.push(<TaskSummary key={i} {...data} ></TaskSummary>)
        dotsTmp[data.date] = { marked: true, dotColor: "#000" }
    }

    const handleDateChange = (startDate: Date, endDate: Date | undefined): void => {
        setTasks(tmpTasks)
    }
    return <Content contentContainerStyle={styles.root} >
        <RangeCalendar dots={dotsTmp} selectedRangeCB={handleDateChange} />
        {
            tasks
        }
        <Button onPress={() => {
             axios.post('http://192.168.1.83:3000/queue/task', {
                "type": 1,
                "project": 2,
                "createBy": "asd",
                "data": {
                    "timestamp": 123123123
                }
            }).then((data) => {

                Alert.alert('עדכון נשלח בהצלחה')
            }).catch((err) => {
                Alert.alert('שמירת הבקשה לא צלחה , עותק לוקאלי ישמר, ניתן לנסות מאוחר יותר לשלוח מחדש ')
            })
        }}>
            <Text>send axios request</Text>
        </Button>
    </Content>
}
export default Calender

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        padding: 10
    }
})
