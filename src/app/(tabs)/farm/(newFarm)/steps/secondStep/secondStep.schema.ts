import * as Yup from 'yup'

// name validation 
// less than 20 character
const secondStepValidation = Yup.object().shape({
	plantation: Yup.string()
		.max(20, 'Name must be less than 20 characters')
		.required('Name is required')
		.matches(/^[a-zA-Z ]*$/, 'Name must contain only alphabets'),

})

export default secondStepValidation