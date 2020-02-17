export enum AlertType {
    SUCCESS,
    ERROR,
    INFO,
    WARNING,
    CONFIRM
}

export interface AlertInterface {
    title?: string;
    type: AlertType;
    message: string;
    buttons?: string[];
}
