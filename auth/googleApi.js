const fs = require('fs');
const path = require('path');

const { google } = require('googleapis');
const plus = google.plus('v1');

let oAuth2Client = undefined;

function config() {

    console.log("dirname: ", __dirname);
    // load oauth2 keys from keypath in environment, 
    // or default to ./oauth2.keys.json
    const keyPath = process.env.OAUTH_KEYS_PATH ?
        process.env.OAUTH_KEYS_PATH :
        path.join(__dirname, '..', 'oauth2.keys.json');

    console.log(keyPath);

    let keys = { redirect_uris: [''] };
    if (fs.existsSync(keyPath)) {
        keys = require(keyPath).web;
    }

    console.log(keys);

    oAuth2Client = new google.auth.OAuth2(
        keys.client_id,
        keys.client_secret,
        keys.redirect_uris[0]
    );

    google.options({ auth: oAuth2Client });

}

async function retrieveTokens(authCode) {
    if (!oAuth2Client) { config(); }

    const { tokens } = await oAuth2Client.getToken(authCode);
    oAuth2Client.credentials = tokens;

    // After acquiring an access_token, you may want to check on the audience, expiration,
    // or original scopes requested.  You can do that with the `getTokenInfo` method.
    const tokenInfo = await oAuth2Client.getTokenInfo(
        oAuth2Client.credentials.access_token
    );

    console.log(tokenInfo);


}

module.exports = {
    api: plus,
    config,
    retrieveTokens
}
