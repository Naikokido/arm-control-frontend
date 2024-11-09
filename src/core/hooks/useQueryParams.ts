import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useQueryParams = () => {
  const { search: searchParams, pathname } = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

  const setQueryParams = useCallback(
    (key: string, value: string | null) => {
      value ? queryParams.set(key, value) : queryParams.delete(key);
    },
    [queryParams],
  );

  const deleteQueryParams = useCallback(
    (key: string) => {
      queryParams.delete(key);
    },
    [queryParams],
  );

  const getQueryParams = useCallback((key: string) => queryParams.get(key), [queryParams]);

  const handleOnNavigate = useCallback(() => {
    navigate(!queryParams ? pathname : `${pathname}?${queryParams}`);
  }, [navigate, pathname, queryParams]);

  return {
    queryParams,
    getQueryParams,
    setQueryParams,
    deleteQueryParams,
    handleOnNavigate,
  };
};
