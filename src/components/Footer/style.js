import styled from "styled-components";

export const WrapperFooter = styled.div`
    height: 80px;
    display: flex;
    background-color: #79CCF2;
    position: relative;
    bottom: 0;
`;

export const WrapperContentCopyright = styled.div`
        width: fit-content;
        height: 100%;
        color: white;
        font-weight: 600;
        font-size: 17px;
        align-content: center;
        position: absolute;
        left: 470px;

        a {
            text-decoration: none;
        }
`;

export const WrapperLogos = styled.div`
        align-items: center;
        width: fit-content;
        display: flex;
        position: absolute;
        right: 85px;
        height: 100%;

        span {
            color: white;
            font-size: 35px;
            padding: 10px;
            margin-right: 8px;
            border-radius: 50%;
            justify-content: space-around;

            &:hover {
                color: rgb(138, 157, 163);
                cursor: pointer;
            }
        }
`;