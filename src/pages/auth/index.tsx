import { Button, Heart, Loader } from "../../components";
import { Navigate } from "react-router";

import useAuth from "../../hooks/useAuth";
import { redirectAuthUrl } from "../../utils/auth";

const AuthorizePage = () => {
    const { isLoading, user } = useAuth()

    if (isLoading) return <Loader />

    if (user) return <Navigate to='/' />

    return (
        <section className="w-full p-3 flex flex-col">
            <Heart color="#1db954" />
            <Button onClick={redirectAuthUrl}>Continue with Spotify</Button>
        </section>
    )
}

export default AuthorizePage