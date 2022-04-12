/* eslint-disable lines-between-class-members */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line lines-between-class-members
import Util from 'util';
import Cuid from 'cuid';

export class GeneralError extends Error {
  code;
  debugId;
  name;
  message;
  path: any;
  details;
  logOnly;

  constructor(code:number, name:string, message:string, details:any, logOnly:string) {
    super();
    this.code = code;
    this.debugId = Cuid();
    this.name = name;
    this.message = message;
    this.details = details;
    this.logOnly = logOnly || false;
  }

  printForHTTPResponse() {
    return {
      code: this.debugId,
      name: this.name,
      message: this.message,
      details: this.code === 500 ? '' : this.details,
    };
  }

  printForLogging() {
    return {
      code: this.code,
      debugId: this.debugId,
      name: this.name,
      message: this.message,
      path: this.path,
      details: typeof (this.details) === 'object'
        ? Util.inspect(this.details)
        : this.details,
    };
  }

  getCode() {
    return this.code;
  }

  setPath(path:string) {
    this.path = path;
  }
}

export class NotAuthenticated extends GeneralError {
  constructor(details: any, logOnly?: any) {
    super(
      401,
      'Not Authenticated',
      'Missing authentication or invalid credentials',
      details,
      logOnly,
    );
  }
}

export class NotFound extends GeneralError {
  constructor(details:any, logOnly?:any) {
    super(
      404,
      'Not Found',
      'The requested item was not found',
      details,
      logOnly,
    );
  }
}
