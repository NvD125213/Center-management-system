export const getDataWithQuery = (queryHook, params) => {
  const { data, error, isLoading, refetch } = queryHook(params);
  return { data, error, isLoading, refetch };
};
