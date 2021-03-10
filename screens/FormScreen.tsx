import { Button, Content, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, } from 'react-native'
import FormComponentBuilder from '../addons/FormComponentBuilder'
import { Form as FormDB } from '../DB/Entities/Forms.Entity'
import { getRepository } from 'typeorm'
import Error from '../components/Error/Error'
import { IFormControl } from '../interfaces/BaseConditionalForm'
import { COLORS } from '../constants/Colors'
import { useSelector } from 'react-redux'

interface Props {

}

const Form = (props: Props) => {
    const [loading, setLoading] = useState(true);
    let [formData, setFormData] = useState<IFormControl[]>([]);
    const [error, setError] = useState(false)

    const allowSave = useSelector(state => state?.form?.formValues?.allowSave) || { form: { formValues: { allowSave: false } } }
    useSelector(state => console.log(state))


    useEffect(() => {
        try {
            const repository = getRepository(FormDB);
            repository.findOne({ type: 123 }).then((form) => {
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
    }, [])

    if (loading)
        return <Button></Button>
    if (error)
        return <Error />
    else
        return (
            <Content style={styles.root}>
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
                { !!allowSave ? <Button style={{ backgroundColor: COLORS.main.SUCCESS }} >
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
