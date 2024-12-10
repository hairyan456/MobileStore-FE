import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    width: 1270px; 
    align-items: center;
    padding: 16px 0px;
    gap: 16px;
    flex-wrap: nowrap;
`;

export const WrapperTextHeader = styled.span`
    font-size: 20px;
    color:#fff;
    font-weight: 800;
    text-transform: uppercase;
    font-family: cursive;
    cursor: pointer;
`;

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
`;

export const WrapperTextHeaderSmall = styled.span`
    font-size: 18px;
    color:#fff;
    white-space: nowrap;
`;
