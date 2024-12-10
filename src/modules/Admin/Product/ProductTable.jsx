import _ from 'lodash';
import { Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined, ExportOutlined } from '@ant-design/icons';
import { InputForm } from '../../../components/Input';
import { useProducts } from '../../../hooks/useProducts';
import ButtonComponent from '../../../components/Button/ButtonComponent';
import exportFileExcel from '../../../utils/exportFileExcel';
import ProductDelete from './ProductDelete';
import ProductDeleteMany from './ProductDeleteMany';
import ProductUpdate from './ProductUpdate';
import React, { forwardRef, useImperativeHandle, useCallback, useState, useRef } from 'react';
import TableComponent from '../../../components/Table/TableComponent';

const ProductTable = forwardRef((props, ref) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [productIdDeleted, setProductIdDeleted] = useState('');
    const [arrProdIds, setArrProdIds] = useState([]);
    const { listProducts, isLoading, refetchProducts, dataProduct, setProductId, } = useProducts();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    // xuất hàm fetchAllProducts cho ProductAddnew dùng
    useImperativeHandle(ref, () => ({
        refetchProducts,
    }));

    const handleDetailProduct = useCallback((id) => {
        if (id) {
            setProductId(id);
            setIsOpenDrawer(true);
        }
    }, []);

    const handleConfirmDelete = useCallback((id) => {
        if (id) {
            setIsShowModalDelete(true);
            setProductIdDeleted(id);
        }
    }, []);

    const renderAction = useCallback((id) => {
        return (
            <>
                <EditOutlined
                    style={{ fontSize: '25px', cursor: 'pointer', marginRight: '25px' }}
                    onClick={() => handleDetailProduct(id)}
                />
                <DeleteOutlined
                    style={{ fontSize: '25px', cursor: 'pointer' }}
                    onClick={() => handleConfirmDelete(id)}
                />
            </>
        );
    }, [handleDetailProduct]);



    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputForm
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: '#ffc069',
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '> 1500',
                    value: '>',
                },
                {
                    text: '<= 1500',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>')
                    return +record.price > 1500;
                return +record.price <= 1500;
            }
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '> 3.5',
                    value: '>',
                },
                {
                    text: '<= 3.5',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>')
                    return +record.rating > 3.5;
                return +record.rating <= 3.5;
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'CountInStock',
            dataIndex: 'countInStock',
        },
        {
            title: 'Sold',
            dataIndex: 'sold',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => renderAction(record._id),

        },
    ];

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ProductDeleteMany arrProdIds={arrProdIds} setProdIds={setArrProdIds} refetchProducts={refetchProducts} />
                <ButtonComponent onClick={() => exportFileExcel(listProducts, 'Products', 'products-table.xlsx')}
                    text={'Export .xlsx'}
                    icon={<ExportOutlined />}
                    style={{ width: '13%', background: '#7ef27c', color: '#fff' }}
                />
            </div>
            <TableComponent data={listProducts} isLoading={isLoading} columns={columns} setProdIds={setArrProdIds} />
            <ProductUpdate
                dataProduct={dataProduct}
                isOpenDrawer={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                refetchProducts={refetchProducts}
            />
            <ProductDelete
                productId={productIdDeleted}
                isModalOpen={isShowModalDelete}
                setShowModal={setIsShowModalDelete}
                refetchProducts={refetchProducts}
            />
        </>
    );
});

export default ProductTable;