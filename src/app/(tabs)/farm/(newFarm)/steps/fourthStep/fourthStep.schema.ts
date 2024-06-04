// validation for the password and the confirm password
import * as Yup from 'yup'

const fourthStepValidation = Yup.object().shape({
	des: Yup.string()
		.required('Description is required')
		.max(255, 'Description must be less than 255 characters'),
})

export default fourthStepValidation