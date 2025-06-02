const CLIENT_ID = process.env.CLIENT_ID || '{clientId}';
const ISSUER = process.env.ISSUER || 'https://{yourOktaDomain}/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const DPOP_CLEINT_ID = process.env.DPOP_CLEINT_ID || '{dPoPClientId}';
const REDIRECT_URI = `${window.location.origin}/login/callback`;
const REDIRECT_URI_DPOP = `${window.location.origin}/login/dpop`;
const STEPUP_LEVEL = process.env.STEPUP_LEVEL || 'urn:okta:loa:1fa:any';
const STEPUP_AGE = process.env.STEPUP_AGE || 30;


// eslint-disable-next-line
export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
    stepup_level: STEPUP_LEVEL,
    stepup_age: STEPUP_AGE
  },
  oidcdpop: {
    clientId: DPOP_CLEINT_ID, 
    issuer: ISSUER,
    redirectUri: REDIRECT_URI_DPOP,
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
  },
  /*resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
    privateMessageUrl: 'http://localhost:8000/api/highlyPrivateMessages'
  },
  dpopGeneratorUrl: 'http://localhost:8000/getDPOPHeader',
  dpopWithNonceGeneratorUrl: 'http://localhost:8000/getDPOPHeaderWithNonce',
  dpopForResourceUrl: 'http://localhost:8000/getDPOPHeaderForResource',
  cibaInitiateUrl: 'http://localhost:8000/initiateCIBAFlow',
  cibaTokenUrl: 'http://localhost:8000/getCIBAToken',*/
  resourceServer: {
    messagesUrl: 'https://cis-sample-apiserver.vercel.app/api/messages',
    privateMessageUrl: 'https://cis-sample-apiserver.vercel.app/api/highlyPrivateMessages'
  },
  dpopGeneratorUrl: 'https://cis-sample-apiserver.vercel.app/getDPOPHeader',
  dpopWithNonceGeneratorUrl: 'https://cis-sample-apiserver.vercel.app/getDPOPHeaderWithNonce',
  dpopForResourceUrl: 'https://cis-sample-apiserver.vercel.app/getDPOPHeaderForResource',
  cibaInitiateUrl: 'https://cis-sample-apiserver.vercel.app/initiateCIBAFlow',
  cibaTokenUrl: 'https://cis-sample-apiserver.vercel.app/getCIBAToken',
};
