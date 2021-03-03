import { CallFunctionEventParameter, HttpMethodController } from 'apigateway-lambda-inversify-integration';
import { APIGatewayProxyResult } from 'aws-lambda';

import toBeMethodDefied from '../src/ToBeMethodDefied';

describe('ToMethodDefied', () => {
  beforeEach(() => {
    expect.extend(toBeMethodDefied);
  });

  it('Method Defined', async () => {
    /* --------------------------- テストの前処理 --------------------------- */
    const controller = new Test1Controller();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    /* ------------------------------ 評価項目 ------------------------------ */
    expect(controller)
      .toBeMethodDefied('GET')
      .toBeMethodDefied('POST')
      .toBeMethodDefied('PUT')
      .toBeMethodDefied('PATCH')
      .toBeMethodDefied('DELETE')
      .toBeMethodDefied('OPTIONS')
      .toBeMethodDefied('HEAD');
  });

  it('Method Not Defined', async () => {
    /* --------------------------- テストの前処理 --------------------------- */
    const controller = new Test2Controller();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    /* ------------------------------ 評価項目 ------------------------------ */
    expect(controller)
      .not.toBeMethodDefied('GET')
      .not.toBeMethodDefied('POST')
      .not.toBeMethodDefied('PUT')
      .not.toBeMethodDefied('PATCH')
      .not.toBeMethodDefied('DELETE')
      .not.toBeMethodDefied('OPTIONS')
      .not.toBeMethodDefied('HEAD');
  });

  it('Except for the controller', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = toBeMethodDefied.toBeMethodDefied(1, 'GET');
    expect(result.message()).toBe('expected HTTP Method[GET] to be Defined');
  });

  it('the controller', () => {
    const controller = new Test1Controller();
    const result = toBeMethodDefied.toBeMethodDefied(controller, 'GET');
    expect(result.message()).toBe('expected HTTP Method[GET] not to be Defined');
  });
});

class Test1Controller extends HttpMethodController<any> {
  public constructor() {
    super();
    this.setMethod<Test1Controller, never, never, never, any>('GET', {
      func: 'test',
      isAuthentication: false,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('POST', {
      func: 'test',
      isAuthentication: false,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('PUT', {
      func: 'test',
      isAuthentication: false,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('PATCH', {
      func: 'test',
      isAuthentication: false,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('DELETE', {
      func: 'test',
      isAuthentication: false,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('OPTIONS', {
      func: 'test',
      isAuthentication: false,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('HEAD', {
      func: 'test',
      isAuthentication: false,
      validation: {}
    });
  }

  public async test(event: CallFunctionEventParameter<any, never, never, never, any>): Promise<APIGatewayProxyResult> {
    return {
      body: JSON.stringify({ ...event.userInfo, ...{ uri: '/test' } }),
      statusCode: 200
    };
  }
}

class Test2Controller extends HttpMethodController<any> {
  public constructor() {
    super();
  }
}
