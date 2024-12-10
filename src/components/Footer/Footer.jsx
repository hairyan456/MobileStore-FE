import React from 'react';
import { WrapperContentCopyright, WrapperFooter, WrapperLogos } from './style';
import {
    FacebookOutlined, TwitterOutlined, YoutubeOutlined, InstagramOutlined
} from '@ant-design/icons';

const Footer = () => {
    return (
        <WrapperFooter>
            <WrapperContentCopyright>
                <p>&copy; 2024 by Hoang Hai. More informations, please visit my channel &#8594;
                    <a target='_blank' href='https://www.youtube.com'>Click here</a> &#8592;
                </p>
            </WrapperContentCopyright>
            <WrapperLogos>
                <TwitterOutlined /> <FacebookOutlined />
                <YoutubeOutlined /> <InstagramOutlined />
            </WrapperLogos>
        </WrapperFooter>
    );
};

export default Footer;