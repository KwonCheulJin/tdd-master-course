import { virtualHandler } from '__tests__/mock-api/handlers/virtual-handler';
import { delayMiddleware } from '__tests__/mock-api/middleware/delay-middleware';
import { contentsHandler } from './contents-handler';

export const mswHandler = [
  delayMiddleware,
  ...virtualHandler,
  ...contentsHandler,
];
