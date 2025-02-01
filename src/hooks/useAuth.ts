import { useState, useEffect } from "react";
import { Token, getAccessToken, getRefreshToken } from "../utils/auth";
import { getCurrentUserProfile } from "../utils/data";


const useAuth = () => {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const code = new URLSearchParams(window.location.search).get("code");

    useEffect(() => {
        const fetchUser = async () => {

            const expiryDate = localStorage.getItem('expires');

            if (expiryDate && new Date(expiryDate) < new Date()) {
                const token = await getRefreshToken();
                Token.save(token);
            }

            if (code) {
                const token = await getAccessToken(code);

                if (!token) return;

                Token.save(token);

                const url = new URL(window.location.href);
                url.searchParams.delete("code");

                const updatedUrl = url.search ? url.href : url.href.replace("?", "");
                window.location.href = updatedUrl;
            }

            const { access_token } = Token;

            if (access_token) {
                const user_profile = await getCurrentUserProfile(access_token);
                setUser(user_profile);
            }

            setLoading(false);
        };

        fetchUser();
    }, []);

    return { user, isLoading };
}

export default useAuth