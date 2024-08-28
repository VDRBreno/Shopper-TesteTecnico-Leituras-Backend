import { FastifyReply } from 'fastify';

import colorout from './colorout';

export function FormattedFastifyError(args: IFormattedFastifyError): IFormattedFastifyError {
  return args;
}
interface IFormattedFastifyError {
  error: any;
  error_code: string;
  description: string;
  status: number;
}
function isFormattedFastifyError(error: any): error is IFormattedFastifyError {
  return 'error' in error
    && 'error_code' in error
    && 'description' in error
    && 'status' in error;
}

interface HandleFastifyErrorProps {
  error: any;
  reply: FastifyReply;
}
export default function handleFastifyError({
  error,
  reply
}: HandleFastifyErrorProps) {

  const date = new Date().toISOString();

  console.error(`[${colorout.fg.red}FULL ERROR${colorout.reset}]`);
  console.error(error);

  if(isFormattedFastifyError(error)) {

    console.error(`[${colorout.fg.red}${date}${colorout.reset}]`);
    console.error(`[${colorout.fg.red}Fastify-FORMATTED ERROR${colorout.reset}]`);
    console.error(`[${colorout.fg.red}MESSAGE${colorout.reset}]`);
    console.error(error.description);
    console.error(`[${colorout.fg.red}ERROR${colorout.reset}]`);
    console.error(error.error.stack ?error.error.stack :error.error);

    reply.status(error.status).send({ error_code: error.error_code, error_description: error.description });

  } else if(error instanceof Error) {

    console.error(`[${colorout.fg.red}${date}${colorout.reset}]`);
    console.error(`[${colorout.fg.red}Fastify-INSTANCE ERROR${colorout.reset}]`);
    console.error(`[${colorout.fg.red}MESSAGE${colorout.reset}]`);
    console.error(error.message);
    console.error(`[${colorout.fg.red}ERROR${colorout.reset}]`);
    console.error(error.stack ?error.stack :error);

    reply.status(500).send('Erro Interno do Servidor');

  } else {
    
    console.error(`[${colorout.fg.red}${date}${colorout.reset}]`);
    console.error(`[${colorout.fg.red}Fastify-ANY ERROR${colorout.reset}]`);
    console.error(error);

    reply.status(500).send('Erro Interno do Servidor');

  }

}