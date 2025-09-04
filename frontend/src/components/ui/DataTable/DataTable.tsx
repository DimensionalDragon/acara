import { LIMIT_LISTS } from "@/constants/list.constants";
import { classname } from "@/utils/classname";
import { Button, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface PropTypes {
    columns: Record<string, unknown>[];
    currentPage: number;
    data: Record<string, unknown>[];
    emptyContent: string;
    isLoading?: boolean;
    limit: string;
    onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
    onChangePage: (page: number) => void;
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSearchClear: () => void;
    onTopContentButtonPress?: () => void;
    renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
    topContentButtonLabel?: string;
    totalPages: number;
}

const DataTable = (props: PropTypes) => {
    const {
        columns,
        data,
        emptyContent,
        isLoading,
        limit,
        onChangeLimit,
        onSearchChange,
        onSearchClear,
        onTopContentButtonPress,
        renderCell,
        topContentButtonLabel,
        totalPages,
        onChangePage,
        currentPage,
    } = props;

    const topContent = useMemo(
        () => (
            <div className='flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-y-4'>
                <Input
                    isClearable
                    className='w-full sm:max-w-[24%]'
                    placeholder='Search by name'
                    startContent={<CiSearch />}
                    onClear={onSearchClear}
                    onChange={onSearchChange}
                />
                {topContentButtonLabel && (
                    <Button color='danger' onPress={onTopContentButtonPress}>
                        {topContentButtonLabel}
                    </Button>
                )}
            </div>
        ),
        [topContentButtonLabel, onSearchChange, onSearchClear, onTopContentButtonPress],
    );

    const bottomContent = useMemo(
        () => (
            <div className='flex items-center justify-center lg:justify-between'>
                <Select 
                    className='hidden lg:block max-w-36' 
                    size='md' 
                    selectedKeys={[limit]} 
                    selectionMode='single'
                    onChange={onChangeLimit}
                    startContent={<p className='text-small'>Show:</p>}
                    disallowEmptySelection
                >
                    {LIMIT_LISTS.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
                {totalPages > 1 && (
                    <Pagination
                        isCompact
                        showControls
                        color='danger'
                        page={currentPage}
                        total={totalPages}
                        onChange={onChangePage}
                        loop
                    />
                )}
            </div>
        ),
        [limit, currentPage, totalPages, onChangeLimit, onChangePage],
    );

    return (
        <Table
            classNames={{ 
                base: 'max-w-full',
                wrapper: classname({'overflow-x-hidden': isLoading}),
             }}
            topContent={topContent}
            topContentPlacement='outside'
            bottomContent={bottomContent}
            bottomContentPlacement='outside'
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid as Key}>
                        {column.name as string}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={data}
                emptyContent={emptyContent}
                isLoading={isLoading}
                loadingContent={
                    <div className='flex justify-center items-center w-full h-full bg-foreground-700/30 backdrop-blur-sm'>
                        <Spinner color='danger' />
                    </div>
                }
            >
                {(item) => (
                    <TableRow key={item._id as Key}>
                        {(columnKey) => (
                            <TableCell key={columnKey as Key}>
                                {renderCell(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default DataTable;