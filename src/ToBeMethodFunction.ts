import {
  Condition, Conditions, HttpMethod, HttpMethodController, UserInfoType, UserRoleType
} from 'apigateway-lambda-inversify-integration';

function toBeMethodFunction<E extends UserInfoType, M extends UserRoleType, L extends HttpMethodController<E, M>>(
  controller: L,
  method: HttpMethod,
  funcName: string
): jest.CustomMatcherResult {
  const conditions: Conditions<any, L> | undefined = (controller as any).conditions;
  const condition: Condition<any, L> | undefined = (conditions ?? {})[method];
  const pass: boolean = condition !== undefined ? condition.func === funcName && (controller as any)[funcName] !== undefined : false;
  const message: () => string = pass
    ? () => `expected HTTP Method[${method}] not to be Function[${funcName}]`
    : () => `expected HTTP Method[${method}] to be Function[${funcName}]`;
  return {
    pass,
    message
  };
}

export default { toBeMethodFunction };
