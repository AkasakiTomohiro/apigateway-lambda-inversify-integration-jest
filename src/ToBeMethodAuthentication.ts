import { Condition, Conditions, HttpMethod, HttpMethodController } from 'apigateway-lambda-inversify-integration';

function toBeMethodAuthentication<E, L extends HttpMethodController<any>>(
  controller: HttpMethodController<E>,
  method: HttpMethod
): jest.CustomMatcherResult {
  const conditions: Conditions<E, L> | undefined = (controller as any).conditions;
  const condition: Condition<E, L> | undefined = (conditions ?? {})[method];
  const pass: boolean = condition !== undefined ? condition.isAuthentication : false;
  const message: () => string = pass
    ? () => `expected HTTP Method[${method}] not to be Authentication`
    : () => `expected HTTP Method[${method}] to be Authentication`;
  return {
    pass,
    message
  };
}

export default { toBeMethodAuthentication };
