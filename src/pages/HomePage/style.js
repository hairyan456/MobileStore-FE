import { Button } from "antd";
import styled from "styled-components";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
    padding: 0 120px;
`;

export const WrapperHomePageBody = styled.div`
    width: 100%;
    background-color: #efefef;
`;

export const WrapperProducts = styled.div`
    display:flex;
    gap: 14px;
    margin-top: 20px;
    flex-wrap: wrap;
`;

export const WrapperButtonMore = styled(Button)`
    border: 1px solid rgb(11,116,229);
    color: rgb(11,116,229);
    width: 240px;
    height: 38px;
    font-weight: 500;
    display: ${({ hidden }) => (hidden ? 'none' : 'block')};
    
    &:hover{
        color: #fff !important;
        background-color: rgb(13,92,182) !important;
        transition: all;
    }
`;
