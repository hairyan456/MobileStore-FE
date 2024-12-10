import React, { useEffect } from 'react';

const LikePlugin = ({ dataHref, ...props }) => {
    useEffect(() => {
        // Kiểm tra SDK Facebook đã được tải chưa
        if (window.FB) 
            window.FB.XFBML.parse();
    }, []);

    return (
        <div {...props}
            className="fb-like"
            data-href={dataHref}
            data-width=""
            data-layout="standard"
            data-action="like"
            data-size="small"
            data-share="true"
        ></div>
    );
};

export default LikePlugin;
