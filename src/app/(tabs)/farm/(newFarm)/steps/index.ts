import * as Yup from 'yup';

import FirstStep from './firstStep/firstStep';
import firstStepValidation from './firstStep/firstStep.schema'

import SecondStep from './secondStep/secondStep';
import secondStepValidation from './secondStep/secondStep.schema';

import ThirdStep from './thirdStep/thirdStep';
import thirdStepValidation from './thirdStep/thirdStep.schema';

import FourthStep from './fourthStep/fourthStep';
import fourthStepValidation from './fourthStep/fourthStep.schema';

import FifthStep from './fifthStep/fifthStep';
import fifthStepValidation from './fifthStep/fifthStep.schema';

import SixthStep from './sixthStep/sixthStep';
import sixthStepValidation from './sixthStep/sixthStep.schema';

import SeventhStep from './seventhStep/seventhStep';
import seventhStepValidation from './seventhStep/seventhStep.schema';

export type Step ={
    name: string
    component: React.ElementType
    validationSchema: Yup.Schema<any>
}   

const baseSteps: Step[] = [
	{
		name: 'FirstStep',
		component: FirstStep,
		validationSchema: firstStepValidation,
	},
	{
		name: 'SecondStep',
		component: SecondStep,
		validationSchema: secondStepValidation,
	},
	{
		name: 'ThirdStep',
		component: ThirdStep,
		validationSchema: thirdStepValidation,
	},
	{
		name: 'FourthStep',
		component: FourthStep,
		validationSchema: fourthStepValidation,
	},
	{
		name: 'FifthStep',
		component: FifthStep,
		validationSchema: fifthStepValidation, 
	},
	{
		name: 'SixthStep',
		component: SixthStep,
		validationSchema: sixthStepValidation,
	},
	{
		name: 'SeventhStep',
		component: SeventhStep,
		validationSchema: seventhStepValidation,
	}
	
]

export const genarateSteps = (): Step[] => {
    return baseSteps
}




export const getStepSchema = (currentIndex: number, steps: Step[]) => { 
	if (currentIndex < steps.length) 
    	return steps[currentIndex].validationSchema 
	else 
		return steps[steps.length - 1].validationSchema
}