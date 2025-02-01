import Config from "../config";

export const Token = {
    get access_token() {
        return localStorage.getItem("access_token") || null;
    },
    get refresh_token() {
        return localStorage.getItem("refresh_token") || null;
    },
    get expires_in() {
        return localStorage.getItem("refresh_in") || null;
    },
    get expires() {
        return localStorage.getItem("refresh") || null;
    },

    save: (response: Record<string, any>) => {
        if (response.error) {
            return;
        }

        const { access_token, refresh_token, expires_in } = response;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("expires_in", expires_in);

        const now = new Date();
        const expires = new Date(now.getTime() + (expires_in * 1000)).toISOString();
        localStorage.setItem('expires', expires);
    }
};

export const redirectAuthUrl = async () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(64));
    const code_verifier = values.reduce((acc, x) => acc + possible[x % possible.length], "");
    const data = new TextEncoder().encode(code_verifier);
    const hashed256 = await crypto.subtle.digest("SHA-256", data);

    const code_challenge = btoa(String.fromCharCode(...new Uint8Array(hashed256)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

    window.localStorage.setItem("code_verifier", code_verifier);

    const { endpoints, client_id, scope, redirect_uri } = Config;
    const url = new URL(endpoints.authorize)

    const params = {
        response_type: 'code',
        client_id,
        scope,
        code_challenge_method: 'S256',
        code_challenge,
        redirect_uri,
    }

    url.search = new URLSearchParams(params).toString();
    window.location.href = url.toString();
}

export const getAccessToken = async (code: string) => {
    const code_verifier = localStorage.getItem('code_verifier') || '';
    const { endpoints, client_id, redirect_uri } = Config;
    const url = endpoints.access_token

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id,
            grant_type: 'authorization_code',
            code,
            redirect_uri,
            code_verifier,
        }),
    }


    const body = await fetch(url, payload);
    const response = await body.json();

    return response
}

export const getRefreshToken = async () => {

    const { endpoints, client_id } = Config;

    const { refresh_token } = Token;
    const url = endpoints.access_token;

    const config: any = {
        grant_type: 'refresh_token',
        refresh_token,
        client_id
    }

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(config),
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    return response
}