import Joi from 'joi';

export default abstract class RequestDTO<DTO> {

  public error: Joi.ValidationError | undefined;
  public value: DTO | undefined;

  abstract validate(data: unknown): data is DTO;

  assign(data: Joi.ValidationResult) {
    if(data.error)
      this.error = data.error;
    else
      this.value = data.value;
  }

}