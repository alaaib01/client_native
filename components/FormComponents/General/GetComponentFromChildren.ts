import FormComponentBuilder from "../../../addons/FormComponentBuilder";
import { IFormControlChildrenComponents } from "../../../interfaces/BaseConditionalForm";

const GetComponentFromChildren = (children: IFormControlChildrenComponents, name: string) => {
    const componentId = children?.children.find(child => child.uid === name)?.componentId;
    if (componentId) {
        const componentObj = children?.components.find(component => component.id === componentId);
        if (componentObj)
            return FormComponentBuilder({ ...componentObj.component })
        else
            return FormComponentBuilder({ type: -1 })
    }
    return null
}

export default GetComponentFromChildren