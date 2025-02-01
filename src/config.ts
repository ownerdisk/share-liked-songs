export const scope = "user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private";

export const client_id = "0fda30abbc1948b6bf16d6872f3c99c6";
export const redirect_uri = "https://ownerdisk.github.io/share-liked-songs/";

export const endpoints = {
    authorize: "https://accounts.spotify.com/authorize",
    access_token: "https://accounts.spotify.com/api/token",
    user_data: "https://api.spotify.com/v1/me",
    getCurrentSavedTracks: "https://api.spotify.com/v1/me/tracks?limit=50",
    createPlaylist: (user_id:string) => `https://api.spotify.com/v1/users/${user_id}/playlists`,
    addTrackPlaylist: (playlist_id:string) => `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    playlistCover: (playlist_id:string) => `https://api.spotify.com/v1/playlists/${playlist_id}/images`
};

export default { scope, client_id, redirect_uri, endpoints }

