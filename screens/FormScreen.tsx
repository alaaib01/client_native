import { Button, Card, Col, Content, Grid, Row, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, } from 'react-native'
import FormComponentBuilder from '../addons/FormComponentBuilder'
import { Form as FormDB } from '../DB/Entities/Forms.Entity'
import { getRepository } from 'typeorm'
import Error from '../components/Error/Error'
import { IFormControl } from '../interfaces/BaseConditionalForm'
import { COLORS } from '../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { ITaskSummaryData } from '../interfaces/Tasks'
import TaskSummary from '../components/Task/TaskSummary'
import { CommonActions, useNavigation } from '@react-navigation/native'
import STORE_CONSTS from '../store/Consts'
import axios from 'axios'



interface Props {
    navigation: NavigationType,
    route: { name: string, params: { task: ITaskSummaryData } }
}

const Form = (props: Props) => {
    const [loading, setLoading] = useState(true);
    let [formData, setFormData] = useState<IFormControl[]>([]);
    const [error, setError] = useState(false)
    const dispatch = useDispatch();
    const formValues = useSelector(state => state?.form?.formValues);
    const saveForm = () => {
        if (formValues) {
            axios.post("http://192.168.1.83:3005/assetTask", formValues).then(res => {
                if (res.data) {
                    // remove task from store
                    dispatch({ type: STORE_CONSTS.TASK.ACTIONS.REMOVE_TASK, payload: { key: props.route.params.task.taskId } })
                }
            }).catch(er => {
                console.log(er)
            })
        }

    }
    if (!props.route.params || !props.route.params.task) {
        const navigator = useNavigation();
        navigator.dispatch(
            CommonActions.navigate({
                name: 'יומן',

            })
        )
        return <View></View>
    }
    const allowSave = useSelector(state => state?.form?.formValues?.allowSave) || { form: { formValues: { allowSave: false } } }
    useEffect(() => {
        try {
            dispatch({ type: STORE_CONSTS.FORM.ACTIONS.SET_TASK_ID, payload: props.route.params.task.taskId })
            const repository = getRepository(FormDB);
            repository.findOne({ type: props.route.params.task.formType }).then((form) => {
                if (form?.data)
                    setFormData(JSON.parse(form.data))
                else
                    setError(true)
                setLoading(false)

            }).catch(e => {
                console.log(e)
            })
        } catch (ex) {
            console.log(ex)
        }
        return () => {
            setFormData([])
            dispatch({ type: STORE_CONSTS.FORM.ACTIONS.SET_TASK_ID, payload: -1 })
        }
    }, [props.route.params])

    if (loading)
        return <Content style={styles.root}>
            <TaskSummary  {...props.route.params.task} hideBeginButton ></TaskSummary>
        </Content>

    if (error)
        return <Error />
    else
        return (
            <Content style={styles.root}>
                <TaskSummary  {...props.route.params.task} hideBeginButton ></TaskSummary>
                <Card>
                    <Grid style={{ padding: 20 }}>
                        {
                            formData.map((formControl: IFormControl) => {
                                return <FormComponentBuilder
                                    type={formControl.type}
                                    resetInUnmount={formControl.resetInUnmount}
                                    uid={formControl.uid}
                                    helperText={formControl.helperText}
                                    key={formControl.uid}
                                    title={formControl.title}
                                    multiLine={formControl.multiLine || false}
                                    subTitle={formControl.subTitle}
                                    childComponents={formControl.childComponents}
                                    finalStep={formControl.finalStep}
                                ></FormComponentBuilder>

                            })
                        }
                    </Grid>
                </Card>
                {!!allowSave ? <Button style={{ backgroundColor: COLORS.main.SUCCESS }} onPress={saveForm} >
                    <Text >שמור טופס</Text>
                </Button> : null}

            </Content>
        )
}

export default Form

const styles = StyleSheet.create({
    root: {
        margin: 15
    }
})
