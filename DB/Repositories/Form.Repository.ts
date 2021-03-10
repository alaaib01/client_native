
import { Form } from "../Entities/Forms.Entity";
import { EntityRepository, Repository } from "typeorm";
import { FormDTO } from "../DTO/FormDTO";

@EntityRepository(Form)
export class FormRepository extends Repository<Form>{

    async createForm(formDTO: FormDTO): Promise<Form> {
        const { createBy, data, project, formName, type } = formDTO;
        const form: Form = new Form();
        form.data = data;
        form.createBy = createBy;
        form.createDate = Date.now();
        form.project = project;
        form.formName = formName;
        form.type = type;
        return await this.save(form)
    }


    async updateForm(newForm: FormDTO, oldForm: Form): Promise<Form> {

        return await this.save({ ...oldForm, ...newForm, history })
    }
}