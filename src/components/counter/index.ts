import './styles.scss';

function handleDisableButton(disable: boolean, button: HTMLButtonElement) {
  if (disable) {
    button.setAttribute('disabled', '');
  } else {
    button.removeAttribute('disabled');
  }
}

function decrement(button: HTMLButtonElement, input: HTMLInputElement) {
  const min = Number(input?.min || 0);
  const value = Number(input.value);
  const newValue = value - 1;

  if (value > min) input.value = String(newValue);
  handleDisableButton(!newValue, button);
}

function increment(button: HTMLButtonElement, input: HTMLInputElement) {
  const max = Number(input?.max || 0);
  const value = Number(input.value);
  const newValue = value + 1;

  if (value <= max) input.value = String(newValue);
  handleDisableButton(!newValue, button);
}

document.querySelectorAll('.counter')
  .forEach(element => {
    const [sub, add] = element.querySelectorAll('button');
    const input = element.querySelector<HTMLInputElement>('input[type="number"')!;

    sub.addEventListener('click', () => decrement(sub, input));
    add.addEventListener('click', () => increment(sub, input));
  });
