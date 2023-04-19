// Default ErrorResponse class.
export class ErrorResponse {
  constructor(public message: string, public status: number) {}
}

 
export class AuthorizationError implements ErrorResponse {
  constructor(public message: string, public status: number) {}
}
