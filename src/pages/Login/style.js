import styled from "styled-components";

export const WrapperFormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
    height: 100vh;
`;

export const WrapperContainLeftRight = styled.div`
    width: 800px;
    height: auto;
    border-radius: 6px;
    background-color: #fff;
    display: flex;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
`;

export const WrapperContainerLeft = styled.div`
    display: flex;
    flex-direction: column;
    flex:1;
    padding: 40px 45px 24px;
`;

export const WrapperHeader = styled.h1`
    margin: 0 0 10px;
    font-size: 30px;
    font-weight: 600;
`;

export const WrapperContainerRight = styled.div`
    width: 300px;
    background: linear-gradient(136deg, rgb(240,248,255) -1%, rgb(219,238,255) 85%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 4px;
     border-radius: 6px;
`;

export const WrapperTextLight = styled.span`
    color: rgb(13,92,182);
    font-size: 14px;
    cursor: pointer;
`;
