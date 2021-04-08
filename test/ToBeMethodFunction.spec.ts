import { CallFunctionEventParameter, HttpMethodController } from 'apigateway-lambda-inversify-integration';
import { APIGatewayProxyResult } from 'aws-lambda';

import toBeMethodFunction from '../src/ToBeMethodFunction';

describe('ToBeMethodFunction', () => {
  beforeEach(() => {
    expect.extend(toBeMethodFunction);
  });

  it('Method Defined', async () => {
    /* --------------------------- テストの前処理 --------------------------- */
    const controller = new Test1Controller();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    /* ------------------------------ 評価項目 ------------------------------ */
    expect(controller)
      .toBeMethodFunction('GET', 'get')
      .toBeMethodFunction('POST', 'post')
      .toBeMethodFunction('PUT', 'put')
      .toBeMethodFunction('PATCH', 'patch')
      .toBeMethodFunction('DELETE', 'delete')
      .toBeMethodFunction('OPTIONS', 'options')
      .toBeMethodFunction('HEAD', 'head');
  });

  it('Except for the controller', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = toBeMethodFunction.toBeMethodFunction(1, 'GET', 'get');
    expect(result.message()).toBe('expected HTTP Method[GET] to be Function[get]');
  });

  it('the controller', () => {
    const controller = new Test1Controller();
    const result = toBeMethodFunction.toBeMethodFunction(controller, 'GET', 'get');
    expect(result.message()).toBe('expected HTTP Method[GET] not to be Function[get]');
  });
});

class Test1Controller extends HttpMethodController<any> {
  public constructor() {
    super();
    this.setMethod<Test1Controller, never, never, never, any>('GET', {
      func: 'get',
      roles: [],
      isAuthentication: true,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('POST', {
      func: 'post',
      roles: [],
      isAuthentication: true,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('PUT', {
      func: 'put',
      roles: [],
      isAuthentication: true,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('PATCH', {
      func: 'patch',
      roles: [],
      isAuthentication: true,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('DELETE', {
      func: 'delete',
      roles: [],
      isAuthentication: true,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('OPTIONS', {
      func: 'options',
      roles: [],
      isAuthentication: true,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('HEAD', {
      func: 'head',
      roles: [],
      isAuthentication: true,
      validation: {}
    });
  }

  public async get(event: CallFunctionEventParameter<any, never, never, never, any>): Promise<APIGatewayProxyResult> {
    return {
      body: JSON.stringify({ ...event.userInfo, ...{ uri: '/test' } }),
      statusCode: 200
    };
  }

  public async post(event: CallFunctionEventParameter<any, never, never, never, any>): Promise<APIGatewayProxyResult> {
    return {
      body: JSON.stringify({ ...event.userInfo, ...{ uri: '/test' } }),
      statusCode: 200
    };
  }

  public async put(event: CallFunctionEventParameter<any, never, never, never, any>): Promise<APIGatewayProxyResult> {
    return {
      body: JSON.stringify({ ...event.userInfo, ...{ uri: '/test' } }),
      statusCode: 200
    };
  }

  public async patch(event: CallFunctionEventParameter<any, never, never, never, any>): Promise<APIGatewayProxyResult> {
    return {
      body: JSON.stringify({ ...event.userInfo, ...{ uri: '/test' } }),
      statusCode: 200
    };
  }

  public async delete(event: CallFunctionEventParameter<any, never, never, never, any>): Promise<APIGatewayProxyResult> {
    return {
      body: JSON.stringify({ ...event.userInfo, ...{ uri: '/test' } }),
      statusCode: 200
    };
  }

  public async options(event: CallFunctionEventParameter<any, never, never, never, any>): Promise<APIGatewayProxyResult> {
    return {
      body: JSON.stringify({ ...event.userInfo, ...{ uri: '/test' } }),
      statusCode: 200
    };
  }

  public async head(event: CallFunctionEventParameter<any, never, never, never, any>): Promise<APIGatewayProxyResult> {
    return {
      body: JSON.stringify({ ...event.userInfo, ...{ uri: '/test' } }),
      statusCode: 200
    };
  }
}
