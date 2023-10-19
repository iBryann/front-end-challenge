import { z } from 'zod';

import './style.scss';
import '../../components/counter';
import { StyckersForm, PayloadType } from './home.types';

const formSchema = z.object({
  framework: z.array(z.string()),
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
    const formData = formSchema.passthrough().parse(payload, {  });
    console.log(formData);

    // spinner no botão por 2 segundos
    // reseta formulário
    // mensagem de enviado com sucesso por 4 segundos
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
