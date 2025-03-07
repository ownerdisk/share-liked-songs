import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heart, Loader } from "../../components";
import { generatePlaylist } from "../../utils/data";

import { ContextUser } from "../../interface/user";
import { RecordIcon } from "../../components/Icons/RecordIcon";
import { ArrowRightIcon } from "../../components/Icons/ArrowRightIcon";

const GeneratePlaylistPage = () => {
    const [isFetching, setFetching] = useState(false)
    const navigate = useNavigate()
    const { user } = useOutletContext<ContextUser>();

    async function handleChange() {
        setFetching(true)

        const playlist_id = await generatePlaylist(user.id)

        navigate("/view", { state: { playlist_id } });
    }

    return (
        <section className="w-full p-3 flex flex-col">
            <Heart color="#cc6271" />
            <div hidden={!isFetching}>
                <Loader />
            </div>
            <div hidden={isFetching}>
                <Button onClick={handleChange} >Generate Your Playlist</Button>
                <div className="or w-full relative text-center text-[#888384] from-current via-current to-transparent py-4 select-none">or</div>
                <form>
                    <label className="select-none block pb-[.5lh] display-block">Update an existing playlist</label>
                    <div className="input">
                        <RecordIcon />
                        <input type="text" className="h-[1.9lh]" placeholder="Paste the playlist URL Here" />
                        <button>
                            <ArrowRightIcon />
                        </button>
                    </div>
                    <div className="help">Paste the URL of a playlist that you want to update above. The previously generated playlist is saved by default.</div>
                </form>
            </div>
        </section>
    )
}

export default GeneratePlaylistPage