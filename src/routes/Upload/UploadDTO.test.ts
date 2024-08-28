import UploadRequestDTO from './UploadDTO';

describe('UploadDTO', () => {
  
  const validImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAABmJLR0QA/wD/AP+gvaeTAAAAFUlEQVQImWP8////fwY0wIQuQAVBAJrrBAaTeWaVAAAAAElFTkSuQmCC';

  it('PASS - all properties are correct', () => {
    
    const dto = new UploadRequestDTO();
    dto.validate({
      image: validImageBase64,
      customer_code: 'teste',
      measure_datetime: new Date(),
      measure_type: 'Water'
    });

    expect(dto.error).toBe(undefined);

  });
});