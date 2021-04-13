import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Badge } from 'native-base';
import React from 'react'
import { StyleSheet, View } from 'react-native'
import CalendarScreen from './CalendarScreen';

interface Props {
    
}

const TabsScreen = (props: Props) => {
    return (
        <Container>
        <Tabs>
          <Tab tabStyle={{}} heading={ <TabHeading><Text>מתואמות</Text></TabHeading>}>
            <CalendarScreen formTypes={[2,3,4,5,6,7]} />
          </Tab>
          <Tab tabStyle={{}} heading={ <TabHeading><Text>מתוזמנות</Text></TabHeading>}>
            <CalendarScreen  formTypes={[1]} />
          </Tab>
        
        </Tabs>
      </Container>
    )
}

export default TabsScreen

const styles = StyleSheet.create({})
