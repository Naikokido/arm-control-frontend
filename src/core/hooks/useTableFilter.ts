import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  type ChangeEvent,
} from "react";
import { useDebounce } from "./useDebounce";
import { useQueryParams } from "./useQueryParams";

interface IFilterData {
  value: string;
  label: string;
}

type IInitialFilters<T extends string> = {
  [K in T]: IFilterData;
};

interface IUseFilterProps<T extends string> {
  pageLimits?: number[];
  initialFilters?: IInitialFilters<T>;
}

export const useFilters = <T extends string>({
  initialFilters,
  pageLimits,
}: IUseFilterProps<T> = {}) => {
  const {
    getQueryParams,
    setQueryParams,
    deleteQueryParams,
    handleOnNavigate,
  } = useQueryParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [filters, setFilters] = useState<IInitialFilters<T> | undefined>(
    initialFilters
  );

  const totalPageLimits = useMemo(
    () => (!pageLimits || pageLimits.length === 0 ? [10, 25, 100] : pageLimits),
    [pageLimits]
  );

  const defaultLimit = useMemo(
    () => (totalPageLimits ? totalPageLimits[0] || 10 : 10),
    [totalPageLimits]
  );

  const params = useMemo(() => {
    const page = Number(getQueryParams("pagina")) || 1;
    const limit = Number(getQueryParams("limite")) || defaultLimit;
    const search = getQueryParams("busqueda") || "";

    const dynamicFilters = Object.entries(filters || {}).reduce(
      (acc, [key, filterData]) => {
        const data = filterData as IFilterData;
        const value = getQueryParams(data.label) || data.value;

        return { ...acc, [key]: value };
      },
      {} as { [K in T]: string }
    );

    return { page, limit, search, ...dynamicFilters };
  }, [getQueryParams, defaultLimit, filters]);

  const onChangeSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.value) {
        deleteQueryParams("busqueda");
      }
      deleteQueryParams("pagina");
      setSearchValue(event.target.value);
    },
    [deleteQueryParams]
  );

  const onChangePageLimit = useCallback(
    (pageLimit: number) => {
      deleteQueryParams("pagina");
      pageLimit !== defaultLimit
        ? setQueryParams("limite", pageLimit.toString())
        : deleteQueryParams("limite");
      handleOnNavigate();
    },
    [defaultLimit, deleteQueryParams, setQueryParams, handleOnNavigate]
  );

  const onChangePage = useCallback(
    (page: number) => {
      page !== 1
        ? setQueryParams("pagina", page.toString())
        : deleteQueryParams("pagina");

      handleOnNavigate();
    },
    [setQueryParams, deleteQueryParams, handleOnNavigate]
  );

  const onChangeFilter = useCallback(
    (filterKey: T, filterValue: unknown) => {
      if (!filters) {
        return;
      }

      setFilters({
        ...filters,
        [filterKey]: {
          ...filters[filterKey],
          value: filterValue,
        },
      });

      const label = filters[filterKey].label;

      if (filterValue) {
        setQueryParams(label, filterValue.toString());
      } else {
        deleteQueryParams(label);
      }

      deleteQueryParams("pagina");

      handleOnNavigate();
    },
    [deleteQueryParams, setQueryParams, handleOnNavigate, filters]
  );

  useEffect(() => {
    if (debouncedSearchValue) {
      setQueryParams("busqueda", debouncedSearchValue);
    }

    handleOnNavigate();
  }, [debouncedSearchValue, setQueryParams, handleOnNavigate]);

  useEffect(() => {
    if (!totalPageLimits.includes(params.limit)) {
      deleteQueryParams("limite");
      deleteQueryParams("pagina");
      deleteQueryParams("busqueda");

      handleOnNavigate();
    }
  }, [params.limit, totalPageLimits, deleteQueryParams, handleOnNavigate]);

  return {
    params,
    searchValue,
    totalPageLimits,
    onChangeSearch,
    onChangePageLimit,
    onChangePage,
    onChangeFilter,
  };
};
