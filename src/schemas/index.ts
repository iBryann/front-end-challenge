import { z } from 'zod';

export const formSchema = z.object({
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