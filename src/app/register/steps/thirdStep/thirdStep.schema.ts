// validation for the password and the confirm password
import * as Yup from 'yup'

const thirdStepValidation = Yup.object().shape({
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
})

export default thirdStepValidation