// validation for the password and the confirm password
import * as Yup from 'yup'

const thirdStepValidation = Yup.object().shape({
    address: Yup.string().required('Address is required')
    .max(100, 'Address must be less than 100 characters')
    .min(3, 'Address must be more than 3 characters')
})

export default thirdStepValidation