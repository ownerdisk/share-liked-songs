import { toast } from "sonner";
import { endpoints } from "../config";
import { api } from "./utils";
import { Token } from "./auth";

const getCurrentUserProfile = async (token: string) => {
    const endpoint = endpoints.user_data;
    const headers = { Authorization: `Bearer ${token}` }

    return await api({
        endpoint,
        headers,
        onError: () => toast.error("Error: Couldn't get user data")
    })
}

const retrieveLikedSongs = async () => {
    let endpoint = endpoints.getCurrentSavedTracks
    const uris = []
    let total = 0

    async function query() {
        const headers = { Authorization: `Bearer ${Token.access_token}` }
        return await api({
            endpoint,
            headers,
            onError: () => toast.error("Error: Couldn't get the liked songs")
        })
    };

    while (endpoint) {
        const data = await query();
        const tracks = data.items.map((u: any) => u.track.uri)
        endpoint = data.next ? data.next : null
        total += data.items.length
        toast.success(`Fetched ${total} out of ${data.total} songs`)
        uris.push(tracks)
    }

    return { uris, total }
}

export const createPlaylist = async (user: string) => {
    const endpoint = `https://api.spotify.com/v1/users/${user}/playlists`;
    const headers = {
        Authorization: `Bearer ${Token.access_token}`,
        "Content-Type": "application/json",
    };

    const body = {
        name: "Liked Songs",
        public: true,
        collaborative: false,
        description: ""
    };

    const data = await api({
        endpoint,
        method: "POST",
        headers,
        body: JSON.stringify(body),
        onError: () => toast.error("Error: Couldn't create a new playlist"),
        onSuccess: () => toast.success("Created a new playlist."),
    });

    return data;
};

const addTrackPlaylist = async (playlist_id: string, uris: string[][], total: number) => {
    let added = 0

    for (const uri of uris) {
        const endpoint = endpoints.addTrackPlaylist(playlist_id)
        const body = JSON.stringify({ uris: uri });
        const headers = { Authorization: `Bearer ${Token.access_token}`, 'Content-Type': 'application/json' }

        await api({
            endpoint,
            method: "POST",
            headers,
            body,
            onError: () => toast.error("Error: Couldn't save tracks"),
            onSuccess: () => {
                added += uri.length
                toast.success(`Added ${added} out of ${total} songs`)
            }
        })

    }

}

export const generatePlaylist = async (user_id: string) => {
    const { uris, total } = await retrieveLikedSongs();
    const newPlaylist = await createPlaylist(user_id);

    await addTrackPlaylist(newPlaylist.id, uris, total)

    return newPlaylist.id
}

export const getPlaylistCover = async (playlist_id:string) => {
    const endpoint = endpoints.playlistCover(playlist_id);
    const headers = { Authorization: `Bearer ${Token.access_token}` }

    const data = await api({
        endpoint,
        headers
    })

    return data[0].url;
}





export { getCurrentUserProfile }