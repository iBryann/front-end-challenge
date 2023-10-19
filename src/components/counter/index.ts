import './styles.scss';

function handleDisableButton(disable: boolean, button: HTMLButtonElement) {
  if (disable) {
    button.setAttribute('disabled', '');
  } else {
    button.removeAttribute('disabled');
  }
}

function operation(
  option: '-' | '+',
  button: HTMLButtonElement,
  input: HTMLInputElement,
) {
  const min = Number(input?.min || 0);
  const max = Number(input?.max || 0);
  const value = Number(input.value);
  const selectedOption = option === '+';
  const expression = selectedOption ? value <= max : value > min;
  const newValue = selectedOption ? value + 1 : value - 1;

  if (expression) input.value = String(newValue);
  handleDisableButton(!newValue, button);
}

document.querySelectorAll('.counter')
  .forEach(element => {
    const [sub, add] = element.querySelectorAll('button');
    const input = element.querySelector<HTMLInputElement>('input[type="number"]')!;

    sub.addEventListener('click', () => operation('-', sub, input));
    add.addEventListener('click', () => operation('+', sub, input));
  });
