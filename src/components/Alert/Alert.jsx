import styled from 'styled-components';
import React from 'react';

const AlertWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    background-color: ${(props) => (props.isHeader ? 'white' : '#f8d7da')};
    color: #721c24;
    padding: 125px 100px;
    border-radius: 5px;
    width: 100%;
    max-width: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


const AlertHeading = styled.h4`
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 15px;
`;

const Alert = ({ isHeader = false, heading = '', children = <></> }) => {

    return (
        <AlertWrapper isHeader={isHeader} >
            <AlertHeading>{heading}</AlertHeading>
            {children}
        </AlertWrapper>
    );
}

export default Alert;
