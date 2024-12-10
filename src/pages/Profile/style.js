import { Upload } from "antd";
import styled from "styled-components";

export const WrapperProfilePage = styled.div`
    width: 1270px;
    margin: 0 auto;
    height: 100%;

`;

export const WrapperHeader = styled.h1`
    font-size: 1.6rem; /* Kích thước chữ */
    color: navy; /* Màu chữ */
    text-align: center; /* Canh giữa nội dung */
    padding-bottom: 10px; /* Padding trên dưới */
    border-bottom: 1px solid #ddd; /* Đường kẻ dưới */
    font-weight: bold; /* Chữ đậm */
    text-transform: uppercase; /* Chữ in hoa */

`;

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width:  35%;
    margin: 0 auto;
    padding: 20px;
    border-radius: 13px;
    gap: 10px;
`;

export const WrapperLabel = styled.label`
    color: #79CCF2;
    font-size: 15px;
    line-height: 30px;
    font-weight: 700;
`;

export const WrapperInput = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const WrapperUploadAvatar = styled(Upload)`

    & .ant-upload-list-item-container{
        display: none;
    }
`;