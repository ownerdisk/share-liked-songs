import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router";

import { SuccessIcon } from "../../components/Icons/SuccessIcon";
import { getPlaylistCover } from "../../utils/data";

const ViewPlalistPage = () => {

    const location = useLocation();
    const playlistID = location.state?.playlist_id;
    const [cover, setCover] = useState("");
    const [opacity, setOpacity] = useState(0);

    if (!playlistID) {
        return <Navigate to="/" />
    }


    useEffect(() => {
        const retrieveCover = async () => {
            const image = await getPlaylistCover(playlistID);
            setCover(image);
        };

        if (playlistID) {
            retrieveCover();
        }
    }, []);

    return (
        <section className="w-full p-[8px] items-center flex flex-col gap-[8px] view-playlist">
            <div className="m-[5%] w-[95%] aspect-[1/1]">
                <a href={`https://open.spotify.com/playlist/${playlistID}`}
                    className="no-underline group hover:underline hover:underline-offset-2"
                >
                    <img
                        className="block w-full rounded-lg transition-all duration-200 ease-in-out hover:scale-105"
                        style={{ opacity }}
                        src={cover}
                        onLoad={() => setOpacity(1)}
                        title="Liked Songs Cover"
                        alt="Cover Liked Songs playlist"
                    />
                </a>
            </div>
            <div className="flex justify-center">
                <SuccessIcon />
                <a href={`https://open.spotify.com/playlist/${playlistID}`}
                    className="no-underline group hover:underline hover:underline-offset-2"
                >
                    &nbsp;Saved to Spotify
                </a>
            </div>
        </section>
    )
}

export default ViewPlalistPage