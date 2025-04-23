/*
 * CustomException: This class is extends standard "Error" and adds "http status code"
 * // and "log level".
 *
 */
export class CustomException extends Error {
  status: number;

  constructor(message: string, status: number /* logLevel: string */) {
    super(message);
    this.status = status;
  }
}
