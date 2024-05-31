import * as Yup from 'yup'

const sixthStepValidation = Yup.object().shape({
	irrigation_instructions: Yup.array().of(
		Yup.object().shape({
			start_time: Yup.string().required('Thời gian bắt đầu là bắt buộc')
            .matches(/^(0[0-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, 'Thời gian không hợp lệ'),
			duration_minutes: Yup.number()
				.required('Thời lượng là bắt buộc')
				.positive('Thời lượng phải lớn hơn 0'),
			water_flow_rate: Yup.number()
				.required('Lượng nước là bắt buộc')
				.positive('Lượng nước phải lớn hơn 0'),
		}),
	),
})
export default sixthStepValidation
