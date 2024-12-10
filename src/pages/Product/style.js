import { Col } from "antd";
import styled from "styled-components";

export const WrapperProducts = styled.div`
    display:flex;
    gap: 14px;
    flex-wrap: wrap;
`;

export const WrapperNavbar = styled(Col)`
    background: #fff;
    padding: 10px;
    border-radius: 6px;
    height: fit-content;
    width: 200px;
`;

export const WrapperTypeProductPage = styled.div`
    width:100%;
    background: #efefef;

    .ant-spin-nested-loading{
        height: inherit;

        .ant-spin-container{
            height: inherit;
        }
    }
`;

export const WrapperPagination = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;