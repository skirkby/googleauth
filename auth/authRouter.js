const express = require('express');
const router = express.Router();

const keys = require('../oauth2.keys.json');

const { OAuth2Client } = require('google-auth-library');



router.get('/register', async (req, res, next) => {
    try {
        const { code } = req.query;



        const oAuth2Client = await getAuthenticatedClient(code);

        // After acquiring an access_token, you may want to check on the audience, expiration,
        // or original scopes requested.  You can do that with the `getTokenInfo` method.
        const tokenInfo = await oAuth2Client.getTokenInfo(
            oAuth2Client.credentials.access_token
        );

        console.log(tokenInfo);


        // Make a simple request to the People API using our pre-authenticated client. The `request()` method
        // takes an GaxiosOptions object.  Visit https://github.com/JustinBeckwith/gaxios.
        const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
        const apiData = await oAuth2Client.request({ url });
        console.log(apiData.data);


        res.json({ message: 'api up', tokens: oAuth2Client.credentials, data: apiData });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.get('/profile', async (req, res, next) => {
    try {
        const { code } = req.query;



        const oAuth2Client = await getAuthenticatedClient(code);

        // After acquiring an access_token, you may want to check on the audience, expiration,
        // or original scopes requested.  You can do that with the `getTokenInfo` method.
        const tokenInfo = await oAuth2Client.getTokenInfo(
            oAuth2Client.credentials.access_token
        );
        console.log(tokenInfo);


        // Make a simple request to the People API using our pre-authenticated client. The `request()` method
        // takes an GaxiosOptions object.  Visit https://github.com/JustinBeckwith/gaxios.
        const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
        const resp = await oAuth2Client.request({ url });
        console.log(resp.data);


        res.json({ message: 'api up' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});

function getAuthenticatedClient(code) {
    return new Promise((resolve, reject) => {

        // create a configured OAuth client
        const oAuth2Client = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[0]
        );

        // Call .getToken() with the auth code.
        // This will return the token(s) 
        oAuth2Client.getToken(code)
            .then((r) => {
                oAuth2Client.setCredentials(r.tokens);
                console.info('tokens acquired');
                resolve(oAuth2Client);
            })
            .catch(err => {
                reject(err);
            })
    });
}

module.exports = router;