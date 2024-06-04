import * as Yup from 'yup'

// name validation 
// less than 20 character
const secondStepValidation = Yup.object().shape({
	plantation: Yup.string()
		.required('Name is required')

})

export default secondStepValidation