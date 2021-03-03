import { Condition, Conditions, HttpMethod, HttpMethodController } from 'apigateway-lambda-inversify-integration';

function toBeMethodDefied<E, L extends HttpMethodController<any>>(
  controller: HttpMethodController<E>,
  method: HttpMethod
): jest.CustomMatcherResult {
  const conditions: Conditions<E, L> | undefined = (controller as any).conditions;
  const condition: Condition<E, L> | undefined = (conditions ?? {})[method];
  const pass: boolean = condition !== undefined;
  const message: () => string = pass
    ? () => `expected HTTP Method[${method}] not to be Defined`
    : () => `expected HTTP Method[${method}] to be Defined`;
  return {
    pass,
    message
  };
}

export default { toBeMethodDefied };
