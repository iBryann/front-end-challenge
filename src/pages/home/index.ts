import { z } from 'zod';

import './style.scss';
import 'components/checkbox';
import 'components/counter';
import 'components/textarea';
import { formSchema } from 'schemas';
import { setFocus, setError, resetErrors } from 'utils';
import { StyckersForm, PayloadType } from './home.types';

function handleSuccessSubmit(form: StyckersForm) {
  const overlay = document.querySelector('#loader-overlay')!;

  overlay.classList.add('show');
  setTimeout(() => form.reset(), 3000);
  setTimeout(() => overlay.classList.remove('show'), 7000);
}

function handleSubmit(event: SubmitEvent) {
  event.preventDefault();

  const form = event.target as StyckersForm;
  const { description, framework, quantity } = form;
  const payload: PayloadType = {
    description: description.value,
    quantity: Number(quantity.value),
    framework: [...framework]
      .filter(check => check.checked)
      .map(check => check.value),
  };

  try {
    const formData = formSchema.parse(payload);

    // No mundo real, essa parte estaria dentro dos then/catch/finally de uma request
    console.log(formData);
    resetErrors(form);
    handleSuccessSubmit(form);
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      setFocus(error.errors[0].path[0]);

      error.errors.forEach(err => {
        setError(String(err.path[0]));
      });
    }
  }
}

document.querySelector<StyckersForm>('#styckers')!
  .addEventListener('submit', handleSubmit);
