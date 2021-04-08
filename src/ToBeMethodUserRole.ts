import {
  Condition, Conditions, HttpMethod, HttpMethodController, UserInfoType, UserRoleType
} from 'apigateway-lambda-inversify-integration';

function toBeMethodUserRole<E extends UserInfoType, M extends UserRoleType, L extends HttpMethodController<E, M>>(
  controller: L,
  method: HttpMethod,
  roles: M[]
): jest.CustomMatcherResult {
  const conditions: Conditions<any, L> | undefined = (controller as any).conditions;
  const condition: Condition<any, L> | undefined = (conditions ?? {})[method];
  const flag1 = !roles.map(m => condition?.roles.includes(m)).includes(false);
  const flag2 = !condition?.roles.map(m => roles.includes(m)).includes(false);
  const flag3 = condition?.roles.length === roles.length;
  const pass: boolean = flag1 && flag2 && flag3;
  const message: () => string = !pass
    ? () => `expected HTTP Method[${method}] not to be UserRole[${roles.join(', ')}]. actual UserRole[${condition?.roles.join(', ')}].`
    : () => `expected HTTP Method[${method}] to be UserRole[${roles.join(', ')}].`;
  return {
    pass,
    message
  };
}

export default { toBeMethodUserRole };
