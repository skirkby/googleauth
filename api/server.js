const express = require('express');
const server = express();
const authRouter = require('../auth/authRouter.js');

server.use(express.json());

server.use('/api/auth', authRouter);


server.get('/', async (req, res) => {
    try {
        const oAuth2Client = await getAuthenticatedClient();

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

function getAuthenticatedClient() {
    return new Promise((resolve, reject) => {
        // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
        // which should be downloaded from the Google Developers Console.
        const oAuth2Client = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[0]
        );

        // Generate the url that will be used for the consent dialog.
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
        });

        // Open an http server to accept the oauth callback. In this simple example, the
        // only request to our webserver is to /oauth2callback?code=<code>
        // const server = http
        //     .createServer(async (req, res) => {
        //         try {
        //             if (req.url.indexOf('/oauth2callback') > -1) {
        //                 // acquire the code from the querystring, and close the web server.
        //                 const qs = new url.URL(req.url, 'http://localhost:3000')
        //                     .searchParams;
        //                 const code = qs.get('code');
        //                 console.log(`Code is ${code}`);
        //                 res.end('Authentication successful! Please return to the console.');
        //                 server.destroy();

        //                 // Now that we have the code, use that to acquire tokens.
        //                 const r = await oAuth2Client.getToken(code);
        //                 // Make sure to set the credentials on the OAuth2 client.
        //                 oAuth2Client.setCredentials(r.tokens);
        //                 console.info('Tokens acquired.');
        //                 resolve(oAuth2Client);
        //             }
        //         } catch (e) {
        //             reject(e);
        //         }
        //     })
        //     .listen(3000, () => {
        //         // open the browser to the authorize url to start the workflow
        //         open(authorizeUrl, { wait: false }).then(cp => cp.unref());
        //     });
        // destroyer(server);
    });
}

module.exports = server;