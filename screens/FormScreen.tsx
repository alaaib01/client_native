import { Button, Card, Col, Content, Grid, Row, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import FormComponentBuilder from "../addons/FormComponentBuilder";
import { Form as FormDB } from "../DB/Entities/Forms.Entity";
import { getRepository } from "typeorm";
import Error from "../components/Error/Error";
import { IFormControl } from "../interfaces/BaseConditionalForm";
import { COLORS } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { ITaskSummaryData } from "../interfaces/Tasks";
import TaskSummary from "../components/Task/TaskSummary";
import { CommonActions, useNavigation } from "@react-navigation/native";
import STORE_CONSTS from "../store/Consts";
import axios from "axios";
import { SERVER_URL } from "../axios/Consts";
import { AssetResult } from "../DB/Entities/AssetResult.Entity";

interface Props {
  navigation: NavigationType;
  route: { name: string; params: { task: ITaskSummaryData } };
}

const Form = (props: Props) => {
  const [loading, setLoading] = useState(true);
  let [formData, setFormData] = useState<IFormControl[]>([]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  // if agent press tasks without passing a task id redirect to calendar page
  if (!props.route.params || !props.route.params.task) {
    const navigator = useNavigation();
    navigator.dispatch(
      CommonActions.navigate({
        name: "יומן",
      })
    );
    return <View></View>;
  }
  // if form is ready to save
  const allowSave = useSelector((state) => state?.form?.formValues?.allowSave);

  const formValues = useSelector((state) => state.form?.formValues);
  // if task id changes reload form , and if component unmounted remove form values from redux
  useEffect(() => {
    try {
      dispatch({
        type: STORE_CONSTS.FORM.ACTIONS.SET_TASK_ID,
        payload: props.route.params.task.taskId,
      });
      const repository = getRepository(FormDB);
      repository
        .findOne({ type: props.route.params.task.formType })
        .then((form) => {
          if (form?.data) setFormData(JSON.parse(form.data));
          else setError(true);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (ex) {
      console.log(ex);
    }
    return () => {
      setFormData([]);
      dispatch({ type: STORE_CONSTS.FORM.ACTIONS.SET_TASK_ID, payload: -1 });
    };
  }, [props.route.params]);

  //save form data
  // if saving form successfull then remove task from redux store , else
  // save task to offline and retry upload
  const saveFormToServer = () => {
    axios
      .post(`${SERVER_URL}/taskAsset`, { form: formValues })
      .then((res) => {
        dispatch({
          type: STORE_CONSTS.TASK.ACTIONS.REMOVE_TASK,
          payload: { key: props.route.params.task.taskId },
        });
      })
      .catch((err) => {
        const assetRepo = getRepository(AssetResult);
        const assetResult = new AssetResult();
        assetResult.taskId = props.route.params.task.taskId;
        assetResult.updateDate = Date.now();
        assetResult.createDate = Date.now();
        assetResult.data = formValues;
        assetResult.createBy = "";
        assetResult.updatedBy = "";
        assetRepo
          .save(assetResult)
          .then((res) => {})
          .then((err) => {});
      });
  };

  // if form is still loading display only the task summary
  if (loading)
    return (
      <Content style={styles.root}>
        <TaskSummary {...props.route.params.task} hideBeginButton></TaskSummary>
      </Content>
    );

  // in case of error display error page
  if (error) return <Error />;
  else
    return (
      <Content style={styles.root}>
        <TaskSummary {...props.route.params.task} hideBeginButton></TaskSummary>
        <Card>
          <Grid style={{ padding: 20 }}>
            {formData.map((formControl: IFormControl) => {
              return (
                <FormComponentBuilder
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
              );
            })}
          </Grid>
        </Card>
        {!!allowSave ? (
          <Button
            style={{ backgroundColor: COLORS.main.SUCCESS }}
            onPress={saveFormToServer}
          >
            <Text>שמור טופס</Text>
          </Button>
        ) : null}
      </Content>
    );
};

export default Form;

const styles = StyleSheet.create({
  root: {
   
  },
});
