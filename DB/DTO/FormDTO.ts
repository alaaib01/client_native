
export class FormDTOUpdate {
    id: string;
    updateDate: number;
}
export class FormDTO {
    id: string;
    formName: string;
    project: number;
    data: object;
    type: number;
    createDate: number
    updateDate: number;
    updatedBy: string;
    createBy: string;
}