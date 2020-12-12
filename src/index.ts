export * from './ToBeMethodAuthentication';
export * from './ToBeMethodDefied';
export * from './ToBeMethodFunction';
export * from './ToBeMethodValidation';

import toBeMethodAuthentication from './ToBeMethodAuthentication';
import toBeMethodDefied from './ToBeMethodDefied';
import toBeMethodFunction from './ToBeMethodFunction';
import toBeMethodValidation from './ToBeMethodValidation';

expect.extend(toBeMethodAuthentication);
expect.extend(toBeMethodFunction);
expect.extend(toBeMethodValidation);
expect.extend(toBeMethodDefied);
