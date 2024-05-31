import { Script } from './script'
export interface Farm {
    name: string
    address: string
    area: number
    plantation: string
    scripts: Script[],
    accepted_script: Script,
    step: number,
    edit: boolean,
    id: string
}
