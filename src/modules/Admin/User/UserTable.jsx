import _ from 'lodash';
import { Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined, ExportOutlined } from '@ant-design/icons';
import { InputForm } from '../../../components/Input';
import { useUsers } from '../../../hooks/useUsers';
import ButtonComponent from '../../../components/Button/ButtonComponent';
import exportFileExcel from '../../../utils/exportFileExcel';
import UserDelete from './UserDelete';
import UserDeleteMany from './UserDeleteMany';
import UserUpdate from './UserUpdate';
import React, { forwardRef, useImperativeHandle, useCallback, useState, useRef } from 'react';
import TableComponent from '../../../components/Table/TableComponent';

const UserTable = forwardRef((props, ref) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [userIdDeleted, setUserIdDeleted] = useState('');
    const [arrUserIds, setArrUserIds] = useState([]);

    const { listUsers, isLoading, refetchUsers, dataUser, setUserId, } = useUsers();

    const searchInput = useRef(null);

    // xuất hàm fetchAllUsers cho ProductAddnew dùng
    useImperativeHandle(ref, () => ({
        refetchUsers,
    }));

    const handleDetailUser = useCallback((id) => {
        if (id) {
            setUserId(id);
            setIsOpenDrawer(true);
        }
    }, []);

    const handleConfirmDelete = useCallback((id) => {
        if (id) {
            setIsShowModalDelete(true);
            setUserIdDeleted(id);
        }
    }, []);

    const renderAction = useCallback((id) => {
        return (
            <>
                <EditOutlined
                    style={{ fontSize: '25px', cursor: 'pointer', marginRight: '25px' }}
                    onClick={() => handleDetailUser(id)}
                />
                <DeleteOutlined
                    style={{ fontSize: '25px', cursor: 'pointer' }}
                    onClick={() => handleConfirmDelete(id)}
                />
            </>
        );
    }, [handleDetailUser]);



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
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            onFilter: (value, record) => {
                if (value === '>')
                    return +record.price > 1500;
                return +record.price <= 1500;
            }
        },
        {
            title: 'Role',
            dataIndex: 'isAdmin',
            render: (text) => {
                return text ? 'ADMIN' : 'USER';
            },
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'City',
            dataIndex: 'city',
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
                <UserDeleteMany arrUserIds={arrUserIds} setUserIds={setArrUserIds} refetchUsers={refetchUsers} />
                <ButtonComponent onClick={() => exportFileExcel(listUsers, 'Products', 'users -table.xlsx')}
                    text={'Export .xlsx'}
                    icon={<ExportOutlined />}
                    style={{ width: '13%', background: '#7ef27c', color: '#fff' }}
                />
            </div>
            <TableComponent data={listUsers} isLoading={isLoading} columns={columns} setUserIds={setArrUserIds} />
            <UserUpdate
                dataUser={dataUser}
                isOpenDrawer={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                refetchUsers={refetchUsers}
            />
            <UserDelete
                userId={userIdDeleted}
                isModalOpen={isShowModalDelete}
                setShowModal={setIsShowModalDelete}
                refetchUsers={refetchUsers}
            />
        </>
    );
});

export default UserTable;