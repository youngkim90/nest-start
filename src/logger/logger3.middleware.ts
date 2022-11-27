import { NextFunction, Request, Response } from 'express';

// 함수로 작성된 경우 의존성 주입 불가
export function logger3(req: Request, res: Response, next: NextFunction) {
  console.log(`Request3...`);
  next();
}
