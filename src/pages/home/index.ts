import { z } from 'zod';

import './style.scss';
import '../../components/counter';
import { StyckersForm, PayloadType } from './home.types';

const formSchema = z.object({
  framework: z.array(z.string()).nonempty('Selecione algum sticker!'),
  quantity: z
    .number({
      required_error: 'Campo obrigatório!',
      invalid_type_error: 'Informe uma quantidade válida!',
    })
    .positive('Informe um valor maior que zero!'),
  description: z
    .string()
    .nonempty('Campo obrigatório!'),
});

function setFocus(fieldName: string | number) {
  type queryType = HTMLInputElement | HTMLSelectElement;
  const input = document.querySelector<queryType>(`[name="${fieldName}"]`)!;
  input.focus();
}

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
    // reseta todos os erros

    const formData = formSchema.parse(payload);

    // No mundo real, essa parte estaria dentro dos then/catch/finally de uma request
    console.log(formData);
    handleSuccessSubmit(form);
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      setFocus(error.errors[0].path[0]);

      error.errors.forEach(err => {
        console.log(String(err.path[0]), err);

        // coloca o campo em estado de erro
      });
    }
  }
}

document.querySelector<StyckersForm>('#styckers')!
  .addEventListener('submit', handleSubmit);
