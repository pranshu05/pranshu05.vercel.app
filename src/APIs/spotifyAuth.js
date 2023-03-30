import SpotifyAuth from 'react-spotify-auth'

const AUTH_SCOPES = ['user-read-currently-playing']

const SpotifyAuthWrapper = ({ onToken }) => {
    const handleToken = (token) => {
        onToken(token)
    }

    return (
        <SpotifyAuth
            redirectUri="http://localhost:3000/callback"
            clientID={process.env.REACT_APP_SPOTIFY_CLIENT_ID}
            scopes={AUTH_SCOPES}
            onAccessToken={handleToken}
        />
    )
}

export default SpotifyAuthWrapper
