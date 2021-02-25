import { Container, Content, H2, Header, Left, ListItem, Radio, Right, Text, H4, H3, Icon, Row, Grid, Separator } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import FormComponentBuilder from '../addons/FormComponentBuilder';
import { FORM_TYPES } from '../enums/FormTypes';
import { IBaseConditionalFormProps, IFormComponent, IFormResult } from '../interfaces/BaseConditionalForm';
import BaseFormComponent from './BaseFormComponent';
import RightElements from './RightElements';


interface Props extends IBaseConditionalFormProps {

}

const TextInput = (props: Props) => {
    const [selectedKey, setSelectedKey] = useState<String | number>('');
    const [selectedComponent, setSelectedComponent] = useState<JSX.Element | IFormComponent>()
    const handleSelectionChanged = (val: string | number, propName: string) => {
        setSelectedKey(propName)
        if (props.setFormValue)
            props.setFormValue({ [props.propName]: val })

        const component = props.childComponents?.find(child => child.propName === propName);
        if (component?.type === FORM_TYPES.ELEMENT) {
            setSelectedComponent(component?.component)
        }
        else if (component?.component) {
            const child: IFormComponent = component.component;
            setSelectedComponent(FormComponentBuilder({ ...child }))
        }

    }
    useEffect(() => {
        return () => {
            if (props.setFormValue && props.resetInUnmount)
                props.setFormValue({ [props.propName]: null })
        }
    }, [])

    return (<BaseFormComponent
        title={props.title}
        subText={props.subText}
        helperText={props.helperText}
        subChildren={<RightElements>
            {selectedComponent}
        </RightElements>
        }>
        {props.childComponents?.map(child => {
            return <ListItem key={child.propName} onPress={() => handleSelectionChanged(child.value, child.propName)} style={styles.listItem}>
                <Radio selected={selectedKey === child.propName || (!!child.defualt && !selectedKey)} />
                <Text style={styles.listItemText}>{child.text}</Text>
            </ListItem>
        })}
    </BaseFormComponent>
    )
}

export default TextInput

const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: 0
    },
    listItemText: {
        paddingRight: 10,
        paddingStart: 10
    },
    listItemIcon: {

    }
})
