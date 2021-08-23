// required是否必填，trigger锚点响应
export const rulesPhone = {
    number: [
        {
            required: true,
            message: '手机号是必填内容~',
            trigger: 'blur'
        },
        {
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: '手机号填写有误~',
            trigger: 'blur'
        }
    ],
    code: [
        {
            required: true,
            message: '验证码是必填内容~',
            trigger: 'blur'
        },
        {
            pattern: /\d{6}$/,
            message: '验证码为六位~',
            trigger: 'blur'
        }
    ]
}
// 编辑规则
export const rulesAccount = {
    name: [
        {
            required: true,
            message: '用户名是必填内容～',
            trigger: 'blur'
        },
        {
            pattern: /^[a-z0-9]{5,10}$/,
            massage: '用户名必须是3—5个字母或者数字~',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '密码是必填内容～',
            trigger: 'blur'
        },
        {
            pattern: /^[a-z0-9]{3,}$/,
            massage: '密码必须是3位以上的字母或者数字~',
            trigger: 'blur'
        }
    ]
}
