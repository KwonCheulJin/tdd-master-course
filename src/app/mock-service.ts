import { mockInNode } from '__tests__/mock-api/mock-in-node';

if (process.env.NEXT_PUBLIC_MOCK === 'true') {
  if (typeof window !== 'undefined') {
    //
  } else {
    mockInNode.listen();
  }
}
