import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

const useCategory = () => {
    const router = useRouter();

    const debounce = useDebounce();

    const currentLimit = router.query.limit;
    const currentPage = router.query.page;
    const currentSearch = router.query.search;

    const {
        data: categoryData,
        isLoading: isLoadingCategory,
        isRefetching: isRefetchingCategory,
    } = useQuery({
        queryKey: ['category', {limit: currentLimit, page: currentPage, search: currentSearch}],
        queryFn: getCategories,
        enabled: router.isReady && !!currentPage && !!currentLimit,
    });

    const setUrl = () => {
        router.replace({
            query: {
                limit: currentLimit || LIMIT_DEFAULT,
                page: currentPage || PAGE_DEFAULT,
                search: currentSearch || '',
            }
        });
    }

    const handleChangePage = (page: number) => {
        router.push({
            query: {
                ...router.query,
                page,
            },
        });
    }

    const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedLimit = e.target.value;
        router.push({
            query: {
                ...router.query,
                limit: selectedLimit,
                page: PAGE_DEFAULT,
            },
        });
    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        debounce(() => {
            const search = e.target.value;
            router.push({
                query: {
                    ...router.query,
                    search,
                    page: PAGE_DEFAULT,
                }
            });
        }, DELAY);
    }

    const handleSearchClear = () => {
        router.push({
            query: {
                ...router.query,
                search: '',
                page: PAGE_DEFAULT,
            }
        });
    }

    async function getCategories() {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const result = await categoryServices.getCategories();
        const { data } = result;
        return data;
    }

    return {
        setUrl,
        currentPage,
        currentLimit,
        currentSearch,
        categoryData,
        isLoadingCategory,
        isRefetchingCategory,
        handleChangeLimit,
        handleChangePage,
        handleSearchChange,
        handleSearchClear,
    };
}

export default useCategory;