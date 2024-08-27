import Measure from '@/entities/Measure';
import { IMeasureRepository } from '@/repositories/MeasureRepository';

import { IUploadRequestDTO } from './UploadDTO';

export default class UploadUseCase {
  constructor(
    private measureRepository: IMeasureRepository
  ) {}

  async execute(data: IUploadRequestDTO) {

    const measure = new Measure({
      image_url: '',
      customer_code: data.customer_code,
      date: data.measure_datetime,
      type: data.measure_type,
      has_confirmed: false
    });

    const response = await this.measureRepository.create({ measure });

    return {
      measure: response
    };

  }
}