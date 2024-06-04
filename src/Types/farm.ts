import { Script } from './script'
export interface Farm {
    name: string
    address: string
    des: string
    plantation: string
    scripts: Script[],
    accepted_script: Script,
    step: number,
    edit: boolean,
    id: string
}
