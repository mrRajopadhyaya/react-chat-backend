import admin from 'firebase-admin';
// const serviceAccount = require('../serviceAccount.json');
const {
  SERVICE_ACCOUNT_TYPE,
  SERVICE_ACCOUNT_PROJECT_ID,
  SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  SERVICE_ACCOUNT_PRIVATE_KEY,
  SERVICE_ACCOUNT_CLIENT_EMAIL,
  SERVICE_ACCOUNT_CLIENT_ID,
  SERVICE_ACCOUNT_AUTH_URI,
  SERVICE_ACCOUNT_TOKEN_URI,
  SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
} = process.env;

const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    // @ts-ignore
    type: SERVICE_ACCOUNT_TYPE,
    project_id: SERVICE_ACCOUNT_PROJECT_ID,
    private_key_id: SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    private_key: SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: SERVICE_ACCOUNT_CLIENT_EMAIL,
    client_id: SERVICE_ACCOUNT_CLIENT_ID,
    auth_uri: SERVICE_ACCOUNT_AUTH_URI,
    token_uri: SERVICE_ACCOUNT_TOKEN_URI,
    auth_provider_x509_cert_url: SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
  }),
});

export default firebase;
