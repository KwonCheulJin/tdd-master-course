import { delayMiddleware } from '__tests__/mock-api/middleware/delay-middleware';
import { contentsHandler } from './contents-handler';

export const mswHandler = [delayMiddleware, ...contentsHandler];
