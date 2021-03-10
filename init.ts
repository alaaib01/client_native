import axios from "axios";
import { I18nManager } from "react-native";
import { getRepository } from "typeorm";
import { default as ConnectToLocalDB } from "./Data/sqliteConnection";
import { FormDTO } from "./DB/DTO/FormDTO";
import { Form } from "./DB/Entities/Forms.Entity";

async function initApp() {
    await I18nManager.forceRTL(true);
    await ConnectToLocalDB();
}

const getForms = () => {
    axios.get('http://192.168.1.83:3001/forms/form/type/123').then((data: { data: FormDTO }) => {
        const formData: FormDTO = data.data;
        const f = new Form();
        f.createBy = formData.createBy;
        f.data = JSON.stringify(formData.data)
        f.id = formData.id;
        f.type = formData.type;
        f.formName = formData.formName || '';
        f.createDate = formData.createDate;
        f.updateDate = formData.updateDate;
        f.updatedBy = formData.updatedBy||'';
        f.project = formData.project;
        const formRepository = getRepository(Form);
        formRepository.save(f).then(data=>{
            console.log(data)
        }).catch(e=>{
            console.log(e)
        });
    }).catch((err) => {
        console.log(err)
    })
    return () => {

    }
}



export {

    getForms,
    initApp
}