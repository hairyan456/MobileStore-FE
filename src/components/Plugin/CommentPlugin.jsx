import React, { useEffect } from 'react';

const CommentPlugin = ({ dataHref, width, ...props }) => {
    useEffect(() => {
        // Kiểm tra SDK Facebook đã được tải chưa
        if (window.FB)
            window.FB.XFBML.parse();
    }, []);

    return (
        <div
            {...props}
            className="fb-comments"
            data-href={dataHref}
            data-width={width}
            data-numposts="5"
        ></div>
    );
};

export default CommentPlugin;
