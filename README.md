# Readme

Define Matcher for jest in apigateway-lambda-inversify-integration library.

## Usage

### setting jest

In order for Jest to recognize it, you need to configure the following settings in Jest.

``` jest.config.js
setupFilesAfterEnv: ['apigateway-lambda-inversify-integration']
```

### Typescript

Add `import 'apigateway-lambda-inversify-integration-jest';` to `global.d.ts`.

### unit test

Several Matchers have been implemented for unit testing of HttpMethodController.

・ matcher that evaluates whether the specified HTTP Method is implemented.

For example, if you have a class called Test1Controller that extends HttpMethodController, and you want to evaluate whether a GET method has been defined, you can evaluate it as follows

``` test.ts
  it('Test', async () => {
    const controller = new Test1Controller();
    expect(controller).toBeMethodDefied('GET');
  });
```

・ Matcher that evaluates whether or not the authentication is correctly set for the specified HTTP Method.

For methods that require authentication

``` test.ts
  it('Test', async () => {
    const controller = new Test1Controller();
    expect(controller).toBeMethodAuthentication('GET');
  });
```

For methods that do not require authentication

``` test.ts
  it('Test', async () => {
    const controller = new Test1Controller();
    expect(controller).not.toBeMethodAuthentication('GET');
  });
```

・ Matcher that evaluates whether or not the specified function is defined in the specified HTTP method.

``` test.ts
  it('Test', async () => {
    const controller = new Test1Controller();
    expect(controller).toBeMethodFunction('GET', 'get');
  });
```

・ matcher that evaluates if the validation is set correctly for the specified HTTP Method.

When the ITest type is defined in the Body parameter of the POST method in Test1Controller, validation can be evaluated for each key of the ITest type.

``` test.ts
 it('Test', async () => {
    const controller = new Test1Controller();
    const validation: Validators = { type: 'string', required: true };
    expect(controller).toBeMethodValidation<ITest>('POST', 'bodyValidator', 'key', validation);
  });
```

``` Defined.ts
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
```

## Acknowledgements

I had it translated to DeepL. Thank you.
