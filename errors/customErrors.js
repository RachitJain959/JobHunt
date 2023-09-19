import { StatusCodes } from 'http-status-codes'; // Removing hard-coded status codes with refactored reusable status codes

// NotFoundError is variable classname while Error is JavaScript inbuilt class
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.stack = StatusCodes.NOT_FOUND;
  }
}
