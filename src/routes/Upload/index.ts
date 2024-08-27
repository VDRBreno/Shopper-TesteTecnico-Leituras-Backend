import { RouteOptions } from 'fastify';

import handleFastifyError, { FormattedFastifyError } from '@/utils/handleFastifyError';
import { PrismaMeasureRepository } from '@/repositories/implementations/PrismaMeasureRepository';

import UploadRequestDTO from './UploadDTO';
import UploadUseCase from './UploadUseCase';

const UploadController: RouteOptions = {
  method: 'POST',
  url: '/upload',
  handler: async (req, reply) => {
    try {

      const dto = new UploadRequestDTO();
      if(!dto.validate(req.body) || !dto.value)
        throw FormattedFastifyError({
          error: 'Unable to upload',
          error_code: 'INVALID_DATA',
          description: `${dto.error}`,
          status: 400
        });

      const prismaMeasureRepository = new PrismaMeasureRepository();
      const uploadUseCase = new UploadUseCase(prismaMeasureRepository);
      await uploadUseCase.execute(dto.value);

      reply.status(200).send();

    } catch(error) {
      handleFastifyError({ error, reply });
    }
  }
}

export default UploadController;