import Register from "@/app/register"

export interface RegisterForm {
    type_res: string
    value: string
    username: string
    gender: string
	password: string
	confirmPassword: string
	loading: boolean
	error: string
    step: number
}


export interface Farmer {
    type_res: string
    value: string
    username: string
    gender: string
    password: string
    password2: string
}