import React, { Component, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import TaskSummary from '../Task/TaskSummary';

const AgendaCalender = () => {
    const [items, setItems] = useState();
    const [selectedDate, setSelectedDate] = useState(Date.now())
    const loadItems = (day) => {
        const itemsLst = {
            [day.dateString]: [{ title: 'asd', loc: 'asdasd', type: 'asdasd', lastDate: day.dateString },
            { title: 'asd', loc: 'asdasd', type: 'asdasd', lastDate: day.dateString },
            { title: 'asd', loc: 'asdasd', type: 'asdasd', lastDate: day.dateString }]
        }
        setItems(itemsLst)
    }
    const renderItems = (item) => {
        return <TaskSummary title={item.title} lastDate={item.lastDate} location={item.loc} />
    }
    return <Agenda
        items={items}
        
        loadItemsForMonth={loadItems}
        selected={selectedDate}
        renderItem={renderItems}
        renderEmptyDate={() => <View style={styles.emptyDate}>
            <Text>לא נמצאו דברים</Text>
        </View>
        }
        rowHasChanged={(r1, r2) => r1.name !== r2.name}
    />
}

export default AgendaCalender
const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});