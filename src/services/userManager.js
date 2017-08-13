import { createUserManager } from 'redux-oidc';

/**
 * https://github.com/IdentityModel/oidc-client-js/wiki
 * 
 */
const userManager = createUserManager({
    /**
     *  [required] string
     * 
     *  Your client application's identifier as registered with the OIDC/OAuth2 provider.
     */
    client_id: 'js.tokenmanager',
    /**
     *  [required] string
     * 
     *  The redirect URI of your client application to receive a response from the OIDC/OAuth2 provider.
     */
    redirect_uri: RedirectUri('#/callback#'),
    /**
     *  [required] string, default: 'id_token'
     *  
     *  The type of response desired from the OIDC/OAuth2 provider.
     */
    response_type: 'token id_token',
    /**
     *  [required] string, default: 'openid'
     * 
     *  The scope being requested from the OIDC/OAuth2 provider.
     */
    scope: 'openid profile',
    /**
     *  [required] string
     * 
     *  The URL of the OIDC/OAuth2 provider.
     */
    authority: 'http://passport.x-dva.com',
    /**
     *  [Optional] number, default: 5000
     * 
     *  Number of milliseconds to wait for the silent renew to return before assuming it has failed or timed out.
     */
    silentRequestTimeout: 150000,
    /**
     *  [Optional] string
     * 
     *  Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
     *  The attempt is made as a result of the accessTokenExpiring event being raised.
     */
    automaticSilentRenew: true,
    /**
     *  [Optional] string
     *  
     *  The URL for the page containing the call to signinPopupCallback to handle the callback from the OIDC/OAuth2
     */
    popup_redirect_uri: RedirectUri('#/callback#'),
    /**
     *  [Optional] string, default: 'location=no,toolbar=no,width=500,height=500,left=100,top=100'
     * 
     *  The features parameter to window.open for the popup signin window.
     * 
     */
    popupWindowFeatures: 'top=nInt,left=nInt,width=nInt,height=nInt,location=yes,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no',
    /**
     *  [Optional] string, default: '_blank' 
     * 
     *  The target parameter to window.open for the popup signin window.
     */
    popupWindowTarget: '_blank',
    /**
     *  [Optional] boolean, default: true
     * 
     *  Should OIDC protocol claims be removed from profile.
     */
    filterProtocolClaims: true,
    /**
     *  [Optional] number, default: 60
     * 
     *  The number of seconds before an access token is to expire to raise the accessTokenExpiring event.
     */
    accessTokenExpiringNotificationTime: 60,
    /**
     *  [Optional] number, default: 2000
     * 
     *  Interval, in ms, to check the user's session.
     */
    checkSessionInterval: 2000,
    /**
     *  [Optional] boolean, default: true
     * 
     *  Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
     */
    loadUserInfo: true,
});

/**
 * return an split joint uri of absoulute
 * 
 * @param {string} hashPath 
 */
function RedirectUri(hashPath) {

    return `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${hashPath}`;
}

export default userManager;