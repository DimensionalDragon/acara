import DataTable from "@/components/ui/DataTable";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { LIMIT_LISTS } from "@/constants/list.constants";

const Category = () => {
    const router = useRouter();

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
            <DataTable
                renderCell={renderCell}
                columns={COLUMN_LIST_CATEGORY}
                data={[
                    { _id: '123', name: 'category 1', description: 'desc', icon: '/images/general/logo.png' }
                ]}
                emptyContent='Category is empty'
                topContentButtonLabel='Create Category'
                onTopContentButtonPress={() => console.log('Search pressed')}
                onSearchClear={() => console.log('Search cleared')}
                onSearchChange={(e) => console.log(e.target.value)}
                limit={LIMIT_LISTS[0].label}
                onChangeLimit={(e) => console.log(e.target.value)}
                totalPages={2}
                onChangePage={(page) => console.log(`Switch to page ${page}`)}
                currentPage={1}
            />
        </section>
    )
}

export default Category;