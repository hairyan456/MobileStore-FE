import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height: 65px !important;
    width: 65px !important;
`;

export const WrapperStyleColImage = styled(Col)`
        flex-basis: unset;
        display: flex;
`;

export const WrapperStyleNameProduct = styled.h1`
    margin: 0px ;
    color:rgb(36,36,36);
    font-size: 24px;
    font-weight: 300;
    line-height: 32px;
    word-break: break-word;
`;

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120,120,120);
`;

export const WrapperPriceProduct = styled.div`
    background-color: rgb(250,250,250);
    border-radius: 5px;
`;

export const WrapperPriceTextProduct = styled.h1`
    margin-top:10px;
    padding: 8px;
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
`;

export const WrapperAdressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    span.change-address{
        color: rgb(11,116,229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        flex-shrink: 0;
    }
`;

export const WrapperQuantityProduct = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    width: fit-content;
    padding: 0 10px;
    border:  1px solid #ddd;
    border-radius: 4px;

    span{
        cursor: pointer;
    }

    .ant-input-number {
        width: 55px;
        border-top: none;
        border-bottom: none;

        .ant-input-number-handler-wrap{
            display: none;
        }
    }
`;

export const WrapperTypeProduct = styled.div`
    padding: 12px 15px;
    cursor: pointer;
    color: #a68a88;
    font-weight: 550;

    &:hover{
        display: inline-block;
        background-color: #ddd;
        transition: background-color 0.3s ease, transform 0.3s ease; /* Thêm hiệu ứng cho background-color và transform */
        transform: scale(1.05); /* Thêm hiệu ứng phóng to nhẹ khi hover */
    }
`;