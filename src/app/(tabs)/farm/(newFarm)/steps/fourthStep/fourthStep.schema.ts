// validation for the password and the confirm password
import * as Yup from 'yup'

const fourthStepValidation = Yup.object().shape({
	area: Yup.string()
		.required('Area is required')
		.matches(/^[0-9]*$/, 'Area must contain only numbers'),
})

export default fourthStepValidation