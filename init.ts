import axios from "axios";
import { I18nManager } from "react-native";
import { getRepository } from "typeorm";
import { SERVER_URL } from "./axios/Consts";
import { default as ConnectToLocalDB } from "./Data/sqliteConnection";
import { FormDTO, FormDTOUpdate } from "./DB/DTO/FormDTO";
import { Form } from "./DB/Entities/Forms.Entity";
import { getValueFor } from "./secureStorage/helpers";

async function initApp() {
    await I18nManager.forceRTL(true);
    await ConnectToLocalDB();
}

const getForms = async () => {

    axios.get(SERVER_URL+`/forms`).then(async (data: { data: FormDTOUpdate[] }) => {
        const formData: FormDTOUpdate[] = data.data;
        try {
            await formData.forEach(async form => {
                const formRepository = getRepository(Form);
                let oldForm = await formRepository.findOne(form.id) || new Form();;
                if (!oldForm || oldForm?.updateDate != form.updateDate || !oldForm.id) {
                    axios.get(`${SERVER_URL}/form/${form.id}`).then(async (data: { data: FormDTO }) => {
                        const f = data.data
                        oldForm.data = JSON.stringify(f.data);
                        oldForm.id = oldForm.id || f.id
                        oldForm.createBy = f.createBy
                        oldForm.createDate = f.createDate
                        oldForm.formName = f.formName
                        oldForm.project = f.project
                        oldForm.type = f.type
                        oldForm.updateDate = f.updateDate
                        oldForm.updatedBy = f.updatedBy
                        formRepository.save(oldForm).then(data => {
                          
                        }).catch(e => {
                            console.log(e)
                        });
                    })
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