import * as Yup from 'yup'

const firstStepValidation = Yup.object().shape({
    name: Yup.string().required('Tên nông trại không được để trống'),
})
export default firstStepValidation