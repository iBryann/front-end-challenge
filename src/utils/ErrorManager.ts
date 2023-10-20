type FieldTypes = 'checkbox' | 'number' | 'textarea';

const errorHandler = {
  'checkbox': (input: HTMLElement) => input
    .closest('.checkbox-container')?.setAttribute('error', ''),
  'number': (input: HTMLElement) => input.setAttribute('error', ''),
  'textarea': (input: HTMLElement) => input.setAttribute('error', ''),
};

export function setError(fieldName: string) {
  const input = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(
    `input[name="${fieldName}"], textarea[name="${fieldName}"]`,
  )!;
  const type = input.type as FieldTypes;

  errorHandler[type](input);
}

export function resetErrors(form: HTMLFormElement) {
  const fields = [...form.querySelectorAll('[error]')];

  fields.forEach(field => field.removeAttribute('error'));
}