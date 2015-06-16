# youtube-to-spotify
A service that allows you to add audio from your favorite Youtube videos to your Spotify playlists

## Local deployment
* Clone this repository
* Create a file called `spotify-credentials.js` in `services/` directory
* Add the following code to the file with your `ClientId` and `ClientSecret` values that you got creating application at [Spotify Developer API](https://developer.spotify.com/my-applications/)

```
module.exports = { 
	clientId: "your-client-id-here",
	clientSecret: "your-secred-secret-here" 
};
```
* With nodejs and npm installed, install required node modules and start the app
```
npm install
npm start
``` 
