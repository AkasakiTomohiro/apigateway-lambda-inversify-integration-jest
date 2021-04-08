import {
  Condition, Conditions, HttpMethod, HttpMethodController, IValidation, UserInfoType, UserRoleType, Validator
} from 'apigateway-lambda-inversify-integration';

const deepEqual = require('deep-equal');

function toBeMethodValidation<E extends UserInfoType, M extends UserRoleType, L extends HttpMethodController<E, M>, T extends Record<string, any> = any>(
  controller: HttpMethodController<E, M>,
  method: HttpMethod,
  validationType: keyof IValidation<any, any, any, any>,
  key: keyof T,
  validation: Validator<T[keyof T]>
): jest.CustomMatcherResult {
  const conditions: Conditions<any, L> | undefined = (controller as any).conditions;
  const condition: Condition<any, L> | undefined = (conditions ?? {})[method];
  let pass = false;
  if (condition !== undefined) {
    const validator: any = condition.validation[validationType];
    pass = deepEqual(validator[key], validation);
  }
  const message: () => string = pass
    ? () => `expected HTTP Method[${method}] Validation[${validationType}] not to be Validation Value[${key}]`
    : () => `expected HTTP Method[${method}] Validation[${validationType}] to be Validation Value[${key}]`;
  return {
    pass,
    message
  };
}

export default { toBeMethodValidation };
