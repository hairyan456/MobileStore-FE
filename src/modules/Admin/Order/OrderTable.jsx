import _ from 'lodash';
import { Button, Space } from 'antd';
import { SearchOutlined, ExportOutlined } from '@ant-design/icons';
import { InputForm } from '../../../components/Input';
import { useOrders } from '../../../hooks/useOrders';
import ButtonComponent from '../../../components/Button/ButtonComponent';
import exportFileExcel from '../../../utils/exportFileExcel';
import React, { useState, useRef } from 'react';
import TableComponent from '../../../components/Table/TableComponent';
import { format } from 'date-fns';

const OrderTable = () => {
    const { listOrders, isLoading } = useOrders();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    console.log(listOrders)

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

    });
    const columns = [
        {
            title: 'Order_ID',
            dataIndex: '_id',
            render: (text) => <a>{text}</a>,
            ...getColumnSearchProps('_id'),
        },
        {
            title: 'Amount',
            dataIndex: 'orderItems.length', // đường dẫn sâu
            render: (text, record) => _.get(record, 'orderItems.length', 'N/A'), // Sử dụng lodash.get
        },
        {
            title: 'Fullname',
            dataIndex: 'shippingAddress.fullName', // đường dẫn sâu
            render: (text, record) => _.get(record, 'shippingAddress.fullName', 'N/A'), // Sử dụng lodash.get
        },
        {
            title: 'Phone',
            dataIndex: 'shippingAddress.phone', // đường dẫn sâu
            render: (text, record) => _.get(record, 'shippingAddress.phone', 'N/A'), // Sử dụng lodash.get
        },
        {
            title: 'Address',
            dataIndex: 'shippingAddress.address', // đường dẫn sâu
            render: (text, record) => _.get(record, 'shippingAddress.address', 'N/A'), // Sử dụng lodash.get
        },
        {
            title: 'City',
            dataIndex: 'shippingAddress.city', // đường dẫn sâu
            render: (text, record) => _.get(record, 'shippingAddress.city', 'N/A'), // Sử dụng lodash.get
        },
        {
            title: 'Payment method',
            dataIndex: 'paymentMethod',
            render: (text) => {
                return text === 'cash' ? 'By cash' : 'By Paypal';
            },
        },
        {
            title: 'Payment Status',
            dataIndex: 'isPaid',
            render: (text) => {
                return text === false ? <div style={{ color: 'red' }}>Not paid</div> : <div style={{ color: 'green' }}>Paid</div>;
            },
        },
        {
            title: 'Delivery method',
            dataIndex: 'shippingPrice',
            render: (text) => {
                return text === 15 ? 'Save' : 'Fast';
            },
        },
        {
            title: 'Created time',
            dataIndex: 'createdAt',
            render: (text) => {
                return text ? format(new Date(text), 'dd/MM/yyyy - HH:mm') : '';
            },
        },
        {
            title: 'Total price',
            dataIndex: 'totalPrice',
        },
    ];

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ButtonComponent onClick={() => exportFileExcel(listOrders, 'Products', 'products-table.xlsx')}
                    text={'Export .xlsx'}
                    icon={<ExportOutlined />}
                    style={{ width: '13%', background: '#7ef27c', color: '#fff' }}
                />
            </div>
            <TableComponent data={listOrders} isLoading={isLoading} columns={columns} />
        </>
    );
};

export default OrderTable;