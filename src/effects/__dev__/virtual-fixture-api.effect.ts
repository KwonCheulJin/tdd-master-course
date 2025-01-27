export const virtualFixtureApi = {
  async reset(): Promise<{
    status: 201;
  }> {
    const relative = `/virtual/reset`;
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${relative}`,
      {
        method: 'POST',
      }
    );
    const json = await data.json();

    return json;
  },
};
