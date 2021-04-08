import {
  Condition, Conditions, HttpMethod, HttpMethodController, UserInfoType, UserRoleType
} from 'apigateway-lambda-inversify-integration';

function toBeMethodDefied<E extends UserInfoType, M extends UserRoleType, L extends HttpMethodController<E, M>>(
  controller: HttpMethodController<E, M>,
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
