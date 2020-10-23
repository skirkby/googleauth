const express = require('express');
const router = express.Router();

const keys = require('../oauth2.keys.json');

const { OAuth2Client } = require('google-auth-library');

const result = { "response": { "config": { "url": "https://people.googleapis.com/v1/people:listDirectoryPeople", "headers": { "Authorization": "Bearer ya29.a0AfH6SMBvCJIswnBjDJ-9xn_V5AA83d_JkLgbVJnML4eusHuZ0MkW1stMhCdMp4dhvJt1wiOtMtK3Y4oTnJwhjdjluAXDsSrvB7-C9XdwrBo4LPZEJxYJXV0BCKP0f3SIpNu65AJUjHXcGUKLjsLHVEoXBNQF37mZcIg", "User-Agent": "google-api-nodejs-client/6.1.1", "x-goog-api-client": "gl-node/12.19.0 auth/6.1.1", "Accept": "application/json" }, "params": {}, "responseType": "json", "method": "GET" }, "data": { "error": { "code": 400, "message": "readMask is required. Please specify one or more valid paths. Valid paths are documented at https://developers.google.com/people/api/rest/v1/people/get.", "errors": [{ "message": "readMask is required. Please specify one or more valid paths. Valid paths are documented at https://developers.google.com/people/api/rest/v1/people/get.", "domain": "global", "reason": "badRequest" }], "status": "INVALID_ARGUMENT" } }, "headers": { "alt-svc": "h3-Q050=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000,h3-T051=\":443\"; ma=2592000,h3-T050=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000,quic=\":443\"; ma=2592000; v=\"46,43\"", "cache-control": "private", "connection": "close", "content-encoding": "gzip", "content-type": "application/json; charset=UTF-8", "date": "Fri, 23 Oct 2020 20:48:54 GMT", "server": "ESF", "transfer-encoding": "chunked", "vary": "Origin, X-Origin, Referer", "x-content-type-options": "nosniff", "x-frame-options": "SAMEORIGIN", "x-xss-protection": "0" }, "status": 400, "statusText": "Bad Request", "request": { "responseURL": "https://people.googleapis.com/v1/people:listDirectoryPeople" } }, "config": { "url": "https://people.googleapis.com/v1/people:listDirectoryPeople", "headers": { "Authorization": "Bearer ya29.a0AfH6SMBvCJIswnBjDJ-9xn_V5AA83d_JkLgbVJnML4eusHuZ0MkW1stMhCdMp4dhvJt1wiOtMtK3Y4oTnJwhjdjluAXDsSrvB7-C9XdwrBo4LPZEJxYJXV0BCKP0f3SIpNu65AJUjHXcGUKLjsLHVEoXBNQF37mZcIg", "User-Agent": "google-api-nodejs-client/6.1.1", "x-goog-api-client": "gl-node/12.19.0 auth/6.1.1", "Accept": "application/json" }, "params": {}, "responseType": "json", "method": "GET" }, "code": 400, "errors": [{ "message": "readMask is required. Please specify one or more valid paths. Valid paths are documented at https://developers.google.com/people/api/rest/v1/people/get.", "domain": "global", "reason": "badRequest" }] };



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
        let url = 'https://people.googleapis.com/v1/people/me?personFields=names';
        url = 'https://people.googleapis.com/v1/people:listDirectoryPeople?readMask=names,addresses&sources=DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE';
        const apiData = await oAuth2Client.request({ url });
        console.log(apiData);
        console.log(apiData.people);


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


