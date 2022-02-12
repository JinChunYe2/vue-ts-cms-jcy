type FormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
    field: string
    type: FormType
    label: string
    rules?: any[]
    placeholder?: any
    options?: any
    // 针对特殊属性
    otherOptions?: any
    isHidden?: boolean
}

export interface IForm {
    title?: string
    formItems: IFormItem[]
    labelWidth?: string
    itemStyle?: any
    colLayout?: any
}
