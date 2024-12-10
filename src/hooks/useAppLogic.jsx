import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { fetchDetailUser, updateUserInfo } from '../redux/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';

const useAppLogic = () => {
    const user = useSelector(state => state.user.info);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('/system/admin'))
            document.body.style.overflow = 'hidden'; // Vô hiệu hóa cuộn
        else
            document.body.style.overflow = 'auto'; // Bật lại cuộn

        // Cleanup để đảm bảo không bị ảnh hưởng khi component unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [location.pathname]);

    // return homepage if user not permission (not authenticated)
    useEffect(() => {
        if (localStorage.getItem('err_authenticate')) {
            toast.error(localStorage.getItem('err_authenticate'));
            localStorage.removeItem('err_authenticate');
            navigate('/');
        }
    }, [localStorage.getItem('err_authenticate')]);

    // return homepage if refresh_token invalid or expired
    useEffect(() => {
        if (localStorage.getItem('error_message_refreshToken')) {
            toast.error(localStorage.getItem('error_message_refreshToken'));
            localStorage.clear();
            navigate('/sign-in');
        }
    }, [localStorage.getItem('error_message_refreshToken')]);

    useEffect(() => {
        async function refreshPage() {
            const access_token = localStorage.getItem('access_token');
            const refresh_token = localStorage.getItem('refresh_token');
            if (access_token) {
                const { _id } = jwtDecode(access_token);
                if (_id) {
                    const result = await dispatch(fetchDetailUser({ id: _id }));
                    if (fetchDetailUser.fulfilled.match(result))
                        dispatch(updateUserInfo({ ...result?.payload, access_token, refresh_token }));
                }
            }
        }

        if (_.isEmpty(user) && !user._id)
            refreshPage();

    }, [user?._id]);

};

export default useAppLogic;
