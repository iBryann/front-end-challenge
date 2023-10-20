export * from './ErrorManager';

export function setFocus(fieldName: string | number) {
  const input = document.querySelector<HTMLElement>(
    `input[name="${fieldName}"], textarea[name="${fieldName}"]`,
  )!;

  input.focus();
}