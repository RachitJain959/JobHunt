import { StatusCodes } from 'http-status-codes'; // Removing hard-coded status codes with refactored reusable status codes

// NotFoundError is variable class-name while Error is JavaScript inbuilt class
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.stack = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthenticatedError';
    this.stack = StatusCodes.UNAUTHORIZED;
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.stack = StatusCodes.FORBIDDEN;
  }
}
