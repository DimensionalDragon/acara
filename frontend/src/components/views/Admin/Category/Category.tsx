import DataTable from "@/components/ui/DataTable";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import FileInput from "@/components/ui/FileInput";

const Category = () => {
    const router = useRouter();
    const {
        setUrl,
        currentPage,
        currentLimit,
        categoryData,
        isLoadingCategory,
        isRefetchingCategory,
        handleChangeLimit,
        handleChangePage,
        handleSearchChange,
        handleSearchClear
    } = useCategory();

    useEffect(() => {
        if (router.isReady) {
            setUrl();
        }
    }, [router.isReady]);

    const renderCell = useCallback((category: Record<string, unknown>, columnKey: Key) => {
        const cellValue = category[columnKey as keyof typeof category];

        switch(columnKey) {
            case 'icon':
                return <Image src={`${cellValue}`} alt='icon' width={100} height={200} />;
            case 'actions':
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly size='sm' variant='light'>
                                <CiMenuKebab className='text-default-700' />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem key='detail-category-button' onPress={() => router.push(`/admin/category/${category._id}`)}>
                                Details
                            </DropdownItem>
                            <DropdownItem key='delete-category-button' className='text-danger-500'>
                                Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                );
            default:
                return cellValue as ReactNode;
        }

    }, [router.push]);

    return (
        <section>
            {Object.keys(router.query).length > 0 && (
                <DataTable
                    renderCell={renderCell}
                    columns={COLUMN_LIST_CATEGORY}
                    data={categoryData?.data || []}
                    emptyContent='Category is empty'
                    isLoading={isLoadingCategory || isRefetchingCategory}
                    topContentButtonLabel='Create Category'
                    onTopContentButtonPress={() => console.log('Category create button pressed')}
                    onSearchClear={handleSearchClear}
                    onSearchChange={handleSearchChange}
                    limit={String(currentLimit)}
                    onChangeLimit={handleChangeLimit}
                    totalPages={categoryData?.pagination?.totalPages}
                    onChangePage={handleChangePage}
                    currentPage={Number(currentPage)}
                />
            )}
            <FileInput name='category' isDroppable />
        </section>
    )
}

export default Category;