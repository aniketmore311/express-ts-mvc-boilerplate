import { Request, Response, NextFunction } from 'express';
import { SiteError } from '../utils';

/**
 * @description
 * logs the error to console
 */
export function logError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.debug('inside logger');
  console.log(err.stack);
  next(err);
}

/**
 * @description
 * if the err is an Error then transform it into SiteError with default values
 */
export function errorTransformer(
  /* eslint-disable */
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.debug('inside transformer');
  // if err is not Error but SiteError then send it to the next middleware
  if (err.statusCode) {
    next(err);
  } else {
    const newError = new SiteError(err.message, 500);
    newError.name = err.name;
    newError.stack = err.stack;
    next(newError);
  }
}

/**
 * @description
 * check the statusCode set on the SiteError and then render the right view
 * as per the statusCode
 */
export function SiteErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.debug('inside error handler');
  if (err.statusCode == 404) {
    res.status(err.statusCode).render('pages/404');
  } else if (err.statusCode == 500) {
    res.status(err.statusCode).render('pages/500');
  }
}
