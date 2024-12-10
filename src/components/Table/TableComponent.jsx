import { Table } from 'antd';
import React, { useMemo } from 'react';
import { WrapperTable } from '../../pages/Admin/User/style';
import Loading from '../Loading/Loading';


const TableComponent = ({ selectionType = 'checkbox', data = [], isLoading = false, columns = [], ...props }) => {

    const rowSelection = useMemo(() => ({
        onChange: (selectedRowKeys, selectedRows) => {
            props?.setProdIds(selectedRowKeys);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    }), []);

    const dataTable = data?.length > 0 ? data?.map(item => ({ ...item, sold: item?.sold ?? 0, key: item?._id })) : [];
    return (
        <WrapperTable>
            <Loading isLoading={isLoading}>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={dataTable}
                    pagination={{
                        pageSize: 5,  // Số lượng bản ghi trên mỗi trang
                    }}

                    {...props}
                />
            </Loading>
        </WrapperTable>

    );
};

export default TableComponent;