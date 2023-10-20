import './styles.scss';

const keys = ['Space', 'Enter'];

window.addEventListener('keydown', event => {
  const target = event.target as HTMLElement;

  if (
    keys.includes(event.code) &&
    target.classList.contains('checkbox')
  ) {
    target.click();
  }
});