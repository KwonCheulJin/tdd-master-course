export const mockBrowser = async () => {
  if (typeof window !== undefined) {
    const { mockInBrowser } = await import(
      '@/__tests__/mock-api/mock-in-browser'
    );
    mockInBrowser.start();
  }
};
