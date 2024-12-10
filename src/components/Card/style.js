import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    position: relative;
    height: auto;
    opacity: ${props => props?.disabled ? '0.5' : '1'};
    cursor:  ${props => props?.disabled ? 'not-allowed' : 'pointer'};

    .ant-card-cover{
        img{
            width: 100%;
            object-fit: cover;
            height: 190px !important;
        }
    }

    .ant-card-body{
        padding: 15px;
    }
`;

export const WrapperImageStyle = styled.img`
    width: 68px;
    height: 25px;
    position: absolute;
    top: -1px;
    left: -1px;
    border-top-left-radius: 8px;
    
`;

export const StyleNameCard = styled.div`
    font-weight: 650;
    font-size: 15px;
    line-height: 16px;
    color: rgb(56,56,61);
`;

export const WrapperReportText = styled.div`
    font-size: 13px;
    color: rgb(128,128,137);
    display: flex;
    align-items: center;
    margin:6px 0 0 ;

`;

export const WrapperPriceText = styled.div`
    color: rgb(255,66,78);
    font-size: 18px;
    font-weight: 500;
`;

export const WrapperDiscountText = styled.span`
    color: rgb(255,66,78);
    font-size: 14px;
    font-weight: 400;
`;

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120,120,120);
`;