import { Button } from "antd";
import styled from "styled-components";

export const WrapperButtonComponent = styled(Button)`
    color: #fff;
    font-size: 17px;
    margin: 26px 0 10px;
    width: 100%;
    padding: 25px 0;
    border: none;
    font-weight: 600;

    &:hover{
        color: #fff !important;
    }
`;

// export const WrapperLoading = styled.div`
//     width: 24px;
//     height: 24px;
//     border: 4px solid rgba(255, 255, 255, 0.3);
//     border-top: 4px solid #fff;
//     border-radius: 50%;
//     animation: spin 1s linear infinite;

//     /* Animation for spinning effect */
//     @keyframes spin {
//         0% { transform: rotate(0deg); }
//         100% { transform: rotate(360deg); }
//     }
// `;