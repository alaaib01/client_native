import axios from "axios";
import { I18nManager } from "react-native";
import { getRepository } from "typeorm";
import { default as ConnectToLocalDB } from "./Data/sqliteConnection";
import { FormDTO } from "./DB/DTO/FormDTO";
import { Form } from "./DB/Entities/Forms.Entity";
import { getValueFor } from "./secureStorage/helpers";

async function initApp() {
    await I18nManager.forceRTL(true);
    await ConnectToLocalDB();
}

const getForms = async () => {
    const user = await getValueFor('user');

    axios.get(`http://192.168.1.83:3001/forms/form/project/${user.project}`).then(async (data: { data: FormDTO[] }) => {
        const formData: FormDTO[] = data.data;
        try {
            await formData.forEach(async form => {
                const formRepository = getRepository(Form);
                let oldForm = await formRepository.findOne(form.id);
                if (!oldForm) {
                    const f = new Form();
                    f.createBy = form.createBy;
                    f.data = JSON.stringify(form.data)
                    f.id = form.id;
                    f.type = form.type;
                    f.formName = form.formName || '';
                    f.createDate = form.createDate;
                    f.updateDate = form.updateDate;
                    f.updatedBy = form.updatedBy || '';
                    f.project = form.project;
                    await formRepository.save(f);
                }
                else if (oldForm?.updateDate != form.updateDate) {
                    const f = new Form();
                    f.createBy = form.createBy;
                    f.data = JSON.stringify(form.data)
                    f.id = form.id;
                    f.type = form.type;
                    f.formName = form.formName || '';
                    f.createDate = form.createDate;
                    f.updateDate = form.updateDate;
                    f.updatedBy = form.updatedBy || '';
                    f.project = form.project;
                    oldForm = Object.assign(oldForm, f)
                    await formRepository.save(oldForm);
                }
            })
        } catch (e) {
            console.log(e)
        }


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