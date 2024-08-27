import Measure from '@/entities/Measure';
import { IMeasureRepository } from '@/repositories/MeasureRepository';
import { FormattedFastifyError } from '@/utils/handleFastifyError';

import { IUploadRequestDTO } from './UploadDTO';

export default class UploadUseCase {
  constructor(
    private measureRepository: IMeasureRepository
  ) {}

  async execute(data: IUploadRequestDTO) {

    const measureAlreadyExists = await this.measureRepository.findByMonth({
      date: data.measure_datetime,
      customer_code: data.customer_code
    });

    if(measureAlreadyExists) {
      throw FormattedFastifyError({
        error: 'Unable to upload',
        error_code: 'DOUBLE_REPORT',
        description: 'Leitura do mês já realizada',
        status: 409
      });
    }

    const measure = new Measure({
      image_url: '',
      customer_code: data.customer_code,
      date: data.measure_datetime,
      type: data.measure_type,
      has_confirmed: false,
      value: 10
    });

    await this.measureRepository.create({ measure });

    return {
      image_url: measure.image_url,
      measure_value: measure.value,
      measure_uuid: measure.id
    };

  }
}