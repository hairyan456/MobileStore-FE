import { Button } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    font-size: 1.5rem; /* Kích thước chữ */
    color: navy; /* Màu chữ */
    text-align: center; 
    margin: 20px 0; 
    border-bottom: 1px solid #ddd; /* Đường kẻ dưới */
    font-weight: bold; /* Chữ đậm */
    text-transform: uppercase; /* Chữ in hoa */

`;

export const WrapperButtonAddNew = styled(Button)`
    height: 90px;
    width: 90px;
    font-size: 33px;
`;

export const WrapperTable = styled.div`
    margin-top: 20px;
`;