import { CallFunctionEventParameter, HttpMethodController, Validators } from 'apigateway-lambda-inversify-integration';
import { APIGatewayProxyResult } from 'aws-lambda';

import toBeMethodValidation from '../src/ToBeMethodValidation';

describe('ToBeMethodValidation', () => {
  beforeEach(() => {
    expect.extend(toBeMethodValidation);
  });

  it('Validation 1', async () => {
    /* --------------------------- テストの前処理 --------------------------- */
    const controller = new Test1Controller();

    const validation: Validators = { type: 'string', required: true };

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    /* ------------------------------ 評価項目 ------------------------------ */
    expect(controller).toBeMethodValidation<ITest>('POST', 'bodyValidator', 'key', validation);
  });

  it('Validation 2', async () => {
    /* --------------------------- テストの前処理 --------------------------- */
    const controller = new Test1Controller();

    const validation: Validators = {
      type: 'number',
      required: true,
      integer: true,
      lessThan: 1
    };

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    /* ------------------------------ 評価項目 ------------------------------ */
    expect(controller).toBeMethodValidation<ITest>('POST', 'bodyValidator', 'num', validation);
  });

  it('Except for the controller', () => {
    const validation: Validators = {
      type: 'number',
      required: true,
      integer: true,
      lessThan: 1
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = toBeMethodValidation.toBeMethodValidation<ITest>(1, 'GET', 'bodyValidator', 'num', validation);
    expect(result.message()).toBe('expected HTTP Method[GET] Validation[bodyValidator] to be Validation Value[num]');
  });

  it('the controller', () => {
    const controller = new Test1Controller();
    const validation: Validators = {
      type: 'number',
      required: true,
      integer: true,
      lessThan: 1
    };
    const result = toBeMethodValidation.toBeMethodValidation<ITest>(
      controller,
      'POST',
      'bodyValidator',
      'num',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validation
    );
    expect(result.message()).toBe(
      'expected HTTP Method[POST] Validation[bodyValidator] not to be Validation Value[num]'
    );
  });
});

class Test1Controller extends HttpMethodController<any> {
  public constructor() {
    super();
    this.setMethod('POST', {
      func: this.test,
      isAuthentication: false,
      validation: {
        bodyValidator: {
          key: {
            type: 'string',
            required: true
          },
          num: {
            type: 'number',
            required: true,
            integer: true,
            lessThan: 1
          }
        }
      }
    });
  }

  private async test(event: CallFunctionEventParameter<any, ITest, never, never, any>): Promise<APIGatewayProxyResult> {
    return {
      body: JSON.stringify({ ...event.userInfo, ...{ uri: '/test' } }),
      statusCode: 200
    };
  }
}

interface ITest {
  key: string;
  num: number;
}
