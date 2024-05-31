import * as Yup from 'yup'

const firstStepValidation = Yup.object().shape({
	type_res: Yup.string(),
	value: Yup.string()
		.required('Không được để trống')
        .when('type_res',{
            is: 'phone',
            then: (schema) => schema.matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/,'Số điện thoại không hợp lệ'),
            otherwise: (schema) => schema.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'Email không hợp lệ')
        }),
})
export default firstStepValidation