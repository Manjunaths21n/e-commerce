export class BaseError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly errorCode?: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}

export class BadRequestError extends BaseError {
  constructor(message = 'Bad Request', errorCode = 'BAD_REQUEST') {
    super(message, 400, errorCode);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized', errorCode = 'UNAUTHORIZED') {
    super(message, 401, errorCode);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = 'Forbidden', errorCode = 'FORBIDDEN') {
    super(message, 403, errorCode);
  }
}

export class NotFoundError extends BaseError {
  constructor(message = 'Not Found', errorCode = 'NOT_FOUND') {
    super(message, 404, errorCode);
  }
}

export class InternalServerError extends BaseError {
  constructor(message = 'Internal Server Error', errorCode = 'INTERNAL_SERVER_ERROR') {
    super(message, 500, errorCode);
  }
}
