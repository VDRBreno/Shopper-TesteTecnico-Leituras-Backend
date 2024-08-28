import imageBase64JSON from '@/tests/data/imageBase64.json';
import { PrismaMeasureRepository } from '@/repositories/implementations/PrismaMeasureRepository';
import { PrismaCustomerRepository } from '@/repositories/implementations/PrismaCustomerRepository';

import UploadRequestDTO from './UploadDTO';
import UploadUseCase from './UploadUseCase';
import { Customer } from '@/entities/Customer';
import catchThrowError from '@/tests/utils/catchThrowError';

describe('UploadDTO', () => {
  
  const validImageBase64 = imageBase64JSON.validImageBase64;
  const prismaMeasureRepository = new PrismaMeasureRepository();
  const prismaCustomerRepository = new PrismaCustomerRepository();

  it('All properties are correct', () => {
    
    const dto = new UploadRequestDTO();
    dto.validate({
      image: validImageBase64.water,
      customer_code: 'teste',
      measure_datetime: new Date(),
      measure_type: 'Water'
    });

    expect(dto.error).toBe(undefined);

  });

  it('Test measure_type insensitive validation', () => {
    
    const dto = new UploadRequestDTO();
    dto.validate({
      image: validImageBase64.water,
      customer_code: 'teste',
      measure_datetime: new Date(),
      measure_type: 'WaTeR'
    });

    expect(dto.error).toBe(undefined);

  });

  describe('Missing property', () => {

    it('image', () => {

      const dto = new UploadRequestDTO();
      dto.validate({
        customer_code: 'teste',
        measure_datetime: new Date(),
        measure_type: 'Water'
      });
  
      expect(dto.error).toBe("\"image\" is required");

    });

    it('customer_code', () => {

      const dto = new UploadRequestDTO();
      dto.validate({
        image: validImageBase64.water,
        measure_datetime: new Date(),
        measure_type: 'Water'
      });
  
      expect(dto.error).toBe("\"customer_code\" is required");

    });

    it('measure_datetime', () => {

      const dto = new UploadRequestDTO();
      dto.validate({
        image: validImageBase64.water,
        customer_code: 'teste',
        measure_type: 'Water'
      });
  
      expect(dto.error).toBe("\"measure_datetime\" is required");

    });

    it('measure_type', () => {

      const dto = new UploadRequestDTO();
      dto.validate({
        image: validImageBase64.water,
        customer_code: 'teste',
        measure_datetime: new Date()
      });
  
      expect(dto.error).toBe("\"measure_type\" is required");

    });

  });
  
  describe('Invalid property', () => {

    it('image is not base64', () => {

      const dto = new UploadRequestDTO();
      dto.validate({
        image: 'invalid_image',
        customer_code: 'teste',
        measure_datetime: new Date(),
        measure_type: 'Water'
      });
  
      expect(dto.error).toBe('\"image\" must be a valid base64 string');

    });

    it('measure_datetime is an invalid date', () => {

      const dto = new UploadRequestDTO();
      dto.validate({
        image: validImageBase64.water,
        customer_code: 'teste',
        measure_datetime: '2028-30-30',
        measure_type: 'Water'
      });
  
      expect(dto.error).toBe("\"measure_datetime\" must be a valid date");

    });

    it('measure_type is invalid', () => {

      const dto = new UploadRequestDTO();
      dto.validate({
        image: validImageBase64.water,
        customer_code: 'teste',
        measure_datetime: new Date(),
        measure_type: 'Agua'
      });
  
      expect(dto.error).toBe("\"measure_type\" must be one of [WATER, GAS]");

    });

  });

  it('Create a new customer', async () => {

    const customer = new Customer();

    const dto = new UploadRequestDTO();
    dto.validate({
      image: validImageBase64.water,
      customer_code: customer.customer_code,
      measure_datetime: new Date(),
      measure_type: 'Water'
    });

    const customerShouldBeNull = await prismaCustomerRepository.findByCode({ customer_code: customer.customer_code });

    expect(customerShouldBeNull).toBeNull();

    if(dto.value) {

      const uploadUseCase = new UploadUseCase(prismaMeasureRepository, prismaCustomerRepository);
      await uploadUseCase.execute(dto.value);

      const customerShouldExists = await prismaCustomerRepository.findByCode({ customer_code: customer.customer_code });

      expect(customerShouldExists).not.toBeNull();
      expect(customerShouldExists?.customer_code).toBe(customer.customer_code);

    }

  });

  it('Reject, measure already exists', async () => {

    const customer = new Customer();

    const dto = new UploadRequestDTO();
    dto.validate({
      image: validImageBase64.water,
      customer_code: customer.customer_code,
      measure_datetime: new Date(),
      measure_type: 'Water'
    });

    if(dto.value) {

      const uploadUseCase = new UploadUseCase(prismaMeasureRepository, prismaCustomerRepository);
      await uploadUseCase.execute(dto.value);

      const result = await catchThrowError(async () => uploadUseCase.execute(dto.value!));

      expect(result).toEqual({
        error: 'Unable to upload',
        error_code: 'DOUBLE_REPORT',
        description: 'Leitura do mês já realizada',
        status: 409
      });

    }

  });
});