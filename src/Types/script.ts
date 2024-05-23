
export type ScriptSource = {
  source_category: string;
  source_type: string;
  model_name: string;
  training_data: string;
  created_by: string;
};

export type IrrigationInstruction = {
  start_time: string;
  end_time: string;
  duration_minutes: number;
  water_flow_rate: number;
};

export type IrrigationSchedule = {
  date: string;
  crop_type: string;
  irrigation_instructions: IrrigationInstruction[];
};

export type Script = {
  script_source: ScriptSource;
  irrigation_schedule: IrrigationSchedule;
};