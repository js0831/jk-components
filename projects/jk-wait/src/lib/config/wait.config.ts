export interface WaitConfig {
  text?: string;
  type: 'TEXT' | 'SPINNER' | 'TEXT_SPINNER' | 'CUSTOM';
  color?: {
    text?: string;
    spinner?: string;
    overlay?: string;
  };
}
