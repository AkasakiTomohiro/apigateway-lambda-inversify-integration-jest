import {
  Condition, Conditions, HttpMethod, HttpMethodController, UserInfoType, UserRoleType
} from 'apigateway-lambda-inversify-integration';

function toBeMethodAuthentication<E extends UserInfoType, M extends UserRoleType, L extends HttpMethodController<E, M>>(
  controller: HttpMethodController<E, M>,
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
