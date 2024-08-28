import Measure from '@/entities/Measure';
import { Customer } from '@/entities/Customer';
import { IMeasureRepository } from '@/repositories/MeasureRepository';
import { ICustomerRepository } from '@/repositories/CustomerRepository';
import { FormattedFastifyError } from '@/utils/handleFastifyError';
import { ImageService } from '@/services/ImageService';

import { IUploadRequestDTO } from './UploadDTO';

export default class UploadUseCase {
  constructor(
    private measureRepository: IMeasureRepository,
    private customerRepository: ICustomerRepository
  ) {}

  async execute(data: IUploadRequestDTO) {

    const measureAlreadyExists = await this.measureRepository.findByMonth({
      measure_datetime: data.measure_datetime,
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

    const customerExists = await this.customerRepository.findByCode({ customer_code: data.customer_code });
    if(!customerExists) {
      const customer = new Customer(data.customer_code);

      await this.customerRepository.create({ customer });
    }

    const imageService = new ImageService();

    const measure = new Measure({
      image_url: 'not_set',
      customer_code: data.customer_code,
      measure_datetime: data.measure_datetime,
      measure_type: data.measure_type,
      has_confirmed: false,
      value: 10
    });
    
    const imageFilename = `${measure.measure_uuid}.png`;
    const imageURL = await imageService.saveImage(data.image, imageFilename);
    measure.image_url = imageURL;

    try {

      await this.measureRepository.create({ measure });

    } catch(error) {
      imageService.deleteImage(imageFilename);
      throw error;
    }

    return {
      image_url: measure.image_url,
      measure_value: measure.value,
      measure_uuid: measure.measure_uuid
    };

  }
}