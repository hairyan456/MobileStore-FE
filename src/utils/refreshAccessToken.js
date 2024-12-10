import { jwtDecode } from "jwt-decode";
import { getRefreshToken } from "../services/userService";
import { toast } from "react-toastify";
import _ from 'lodash'

const refreshAccessToken = async () => {
    let accessToken = localStorage?.getItem('access_token');
    let refreshToken = localStorage?.getItem('refresh_token');
    if (accessToken) {
        const decoded = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded?.exp < currentTime) {
            try {
                const res = await getRefreshToken(refreshToken);
                if (!_.isEmpty(res)) {
                    if (res?.EC === 0) {
                        accessToken = res.DT;
                        localStorage.setItem('access_token', res.DT); // Lưu vào localStorage
                    } else
                        localStorage.setItem('error_message_refreshToken', res?.EM);
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

export default refreshAccessToken;
