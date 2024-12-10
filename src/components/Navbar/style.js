import styled from "styled-components";

export const WrapperLabelText = styled.h4`
    color:rgb(56,56,61);
    font-size: 17px;
    font-weight: 500;
    margin-top: 0px;
`;

export const WrapperTextValue = styled.span`
    color: rgb(56,56,61);
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;

    &:hover{
        text-decoration: underline;
    }
`;

export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    gap:12px;
`;

export const WrapperTextPrice = styled.div`
    border-radius: 12px;
    background-color: #ccc;
    width: fit-content;
    padding: 4px 12px;
    color: rgb(56,56,61)
`;