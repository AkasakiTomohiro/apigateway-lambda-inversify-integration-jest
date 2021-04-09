import { CallFunctionEventParameter, HttpMethodController } from 'apigateway-lambda-inversify-integration';
import { APIGatewayProxyResult } from 'aws-lambda';

import toBeMethodUserRole from '../src/ToBeMethodUserRole';

describe('toBeMethodUserRole', () => {
  beforeEach(() => {
    expect.extend(toBeMethodUserRole);
  });

  it('UserRole Check Success', async () => {
    /* --------------------------- テストの前処理 --------------------------- */
    const controller = new Test1Controller();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    /* ------------------------------ 評価項目 ------------------------------ */
    expect(controller)
      .toBeMethodUserRole('GET', [1, 2])
      .toBeMethodUserRole('POST', [2, 3, 4])
      .toBeMethodUserRole('PUT',  [2, 3, 4, 5])
      .toBeMethodUserRole('PATCH',  ['1', '2'])
      .toBeMethodUserRole('DELETE',  ['1', '2'])
      .toBeMethodUserRole('OPTIONS',  [1, '1'])
      .toBeMethodUserRole('HEAD',  []);
  });

  it('Except for the controller', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = toBeMethodUserRole.toBeMethodUserRole({}, 'GET', [1, 2]);
    expect(result.message()).toBe('expected HTTP Method[GET] not to be UserRole[1, 2]. actual UserRole[undefined].');
  });

  it('to be success', () => {
    const controller = new Test1Controller();
    const result = toBeMethodUserRole.toBeMethodUserRole(controller, 'GET', [1, 2]);
    expect(result.message()).toBe('expected HTTP Method[GET] to be UserRole[1, 2].');
  });

  it('the controller', () => {
    const controller = new Test1Controller();
    const result = toBeMethodUserRole.toBeMethodUserRole(controller, 'GET', [1, 2, 3]);
    expect(result.message()).toBe('expected HTTP Method[GET] not to be UserRole[1, 2, 3]. actual UserRole[1, 2].');
  });
});

class Test1Controller extends HttpMethodController<any, Role> {
  public constructor() {
    super();
    this.setMethod<Test1Controller, never, never, never, any>('GET', {
      func: 'get',
      roles: [1, 2],
      isAuthentication: true,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('POST', {
      func: 'post',
      roles: [2, 3, 4],
      isAuthentication: true,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('PUT', {
      func: 'put',
      roles: [2, 3, 4, 5],
      isAuthentication: true,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('PATCH', {
      func: 'patch',
      roles: ['1', '2'],
      isAuthentication: true,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('DELETE', {
      func: 'delete',
      roles: ['2', '1'],
      isAuthentication: true,
      validation: {}
    });
    this.setMethod<Test1Controller, never, never, never, any>('OPTIONS', {
      func: 'options',
      roles: [1, '1'],
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

export const roleList = [1, 2, 3, 4, 5, '1', '2', '3', '4', '5'] as const;

export type Role = typeof roleList[number];
