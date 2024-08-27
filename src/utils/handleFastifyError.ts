import { FastifyReply } from 'fastify';

import colorout from './colorout';

interface IMessageError {
  message: string;
}
function isMessageError(error: any): error is IMessageError {
  return typeof error==='object' &&
    Object.keys(error).length===1 &&
    'message' in error &&
    typeof error.message==='string';
}

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

  if(isMessageError(error)) {

    console.log(`[${colorout.fg.red}${date}${colorout.reset}]`);
    console.log(`[${colorout.fg.red}Fastify-MESSAGE ERROR${colorout.reset}]`);
    console.log(`[${colorout.fg.red}MESSAGE${colorout.reset}]`);
    console.log(error.message);

    reply.status(500).send(error.message);

  } else if(isFormattedFastifyError(error)) {

    console.log(`[${colorout.fg.red}${date}${colorout.reset}]`);
    console.log(`[${colorout.fg.red}Fastify-FORMATTED ERROR${colorout.reset}]`);
    console.log(`[${colorout.fg.red}MESSAGE${colorout.reset}]`);
    console.log(error.description);
    console.log(`[${colorout.fg.red}ERROR${colorout.reset}]`);
    console.log(error.error.stack ?error.error.stack :error.error);

    reply.status(error.status).send({ error_code: error.error_code, error_description: error.description });

  } else if(error instanceof Error) {

    console.log(`[${colorout.fg.red}${date}${colorout.reset}]`);
    console.log(`[${colorout.fg.red}Fastify-INSTANCE ERROR${colorout.reset}]`);
    console.log(`[${colorout.fg.red}MESSAGE${colorout.reset}]`);
    console.log(error.message);
    console.log(`[${colorout.fg.red}ERROR${colorout.reset}]`);
    console.log(error.stack ?error.stack :error);

    reply.status(500).send(error.message);

  } else {
    
    console.log(`[${colorout.fg.red}${date}${colorout.reset}]`);
    console.log(`[${colorout.fg.red}Fastify-ANY ERROR${colorout.reset}]`);
    console.log(error);

    reply.status(500).send('Erro Interno do Servidor');

  }

}