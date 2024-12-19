import { HttpException, HttpStatus } from '@nestjs/common';

interface ServiceError {
  message?: string;
  [key: string]: string | number | boolean | object | null | undefined;
}

export function handleServiceError(
  error: ServiceError,
  status: HttpStatus,
  message: string,
): never {
  throw new HttpException(
    {
      status,
      error: error.message || message,
    },
    status,
  );
}