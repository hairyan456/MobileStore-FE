import { Image } from 'antd';
import React from 'react';
import Slider from "react-slick";
import './style.scss';

const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
};

const SliderComponent = ({ images = [] }) => {
    if (images.length <= 0)
        return null;

    return (
        <Slider {...settings}>
            {images.map(item => (
                <Image src={item} key={item} alt='slider' preview={false} width={'100%'} height={'25rem'} />
            ))
            }
        </Slider>
    );
};

export default SliderComponent;