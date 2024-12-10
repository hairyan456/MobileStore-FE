import { jwtDecode } from "jwt-decode";
import { getRefreshToken } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

export default function useRefreshToken() {
    const navigate = useNavigate();
    const refresh = async () => {
        let accessToken = localStorage?.getItem('access_token');
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded?.exp < currentTime) {
                try {
                    const res = await getRefreshToken();
                    if (!_.isEmpty(res)) {
                        if (res?.EC === 0) {
                            accessToken = res.DT;
                            localStorage.setItem('access_token', res.DT); // Lưu vào localStorage
                        } else {
                            localStorage.setItem('error_message_refreshToken', res?.EM);
                            setTimeout(() => {
                                navigate('/sign-in');
                            }, 500);
                        }
                    }
                } catch (error) {
                    toast.error(error.message);
                    console.log(error);
                    return null;
                }
            }
        }
        return accessToken; // Trả về token hiện tại hoặc token mới
    };

    return refresh;
}
