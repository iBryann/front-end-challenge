export type PayloadType = {
  framework: string[];
  quantity: number;
  description: string;
}

export interface StyckersForm extends HTMLFormElement {
  framework: HTMLInputElement[];
  quantity: HTMLInputElement;
  description: HTMLTextAreaElement;
}