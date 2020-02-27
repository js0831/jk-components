import { PromptDataInterface } from './components/prompt/promp-data.interface';
import { PrompType } from './components/prompt/prompt-type.enum';

export enum AlertType {
    SUCCESS,
    ERROR,
    INFO,
    WARNING,
    CONFIRM,
    PROMPT
}

export interface AlertInterface {
    title?: string;
    type: AlertType;
    message: string;
    buttons?: string[];

    promptConfig?: {
      type: PrompType,
      data: PromptDataInterface
    };
}
