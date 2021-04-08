declare module 'jest-snapshot';
declare namespace jest {
  interface Matchers<R> {
    toBeMethodDefied(method: import("apigateway-lambda-inversify-integration").HttpMethod): R;
    toBeMethodAuthentication(method: import("apigateway-lambda-inversify-integration").HttpMethod): R;
    toBeMethodFunction(method: import("apigateway-lambda-inversify-integration").HttpMethod, funcName: string): R;
    toBeMethodUserRole(method: import("apigateway-lambda-inversify-integration").HttpMethod, roles: import("apigateway-lambda-inversify-integration").UserRoleType[]): R;
    toBeMethodValidation<T = any>(
      method: import("apigateway-lambda-inversify-integration").HttpMethod,
      validationType: keyof import("apigateway-lambda-inversify-integration").IValidation<any, any, any, any>,
      key: keyof T,
      validation: import("apigateway-lambda-inversify-integration").Validators<T[keyof T]>
    ): R;
  }
}
