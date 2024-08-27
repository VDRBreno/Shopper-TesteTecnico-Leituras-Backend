import { IMeasureRepository } from '@/repositories/MeasureRepository';
import { FormattedFastifyError } from '@/utils/handleFastifyError';

import { IConfirmRequestDTO } from './ConfirmDTO';

export default class ConfirmUseCase {
  constructor(
    private measureRepository: IMeasureRepository
  ) {}

  async execute(data: IConfirmRequestDTO) {

    const measureExists = await this.measureRepository.findById({ measureId: data.measure_uuid });
    if(!measureExists) {
      throw FormattedFastifyError({
        error: 'Unable to confirm',
        error_code: 'MEASURE_NOT_FOUND',
        description: 'Leitura não encontrada',
        status: 404
      });
    }

    if(measureExists.has_confirmed) {
      throw FormattedFastifyError({
        error: 'Unable to confirm',
        error_code: 'CONFIRMATION_DUPLICATE',
        description: 'Leitura do mês já realizada',
        status: 409
      });
    }

    await this.measureRepository.confirm({
      measureId: data.measure_uuid,
      value: data.confirmed_value
    });

  }
}