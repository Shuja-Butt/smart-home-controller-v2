import { LogLevel } from '@azure/msal-browser';

import dotenv from 'dotenv'

dotenv.config()





// User Flows or B2C policies
export const b2cPolicies = {
    // names for user flows
    names: {
        signUpSignIn: process.env.REACT_APP_ADB2C_SIGNUP_SIGNIN_POLICY,
        forgotPassword: process.env.REACT_APP_ADB2C_FORGOT_PASSWORD_POLICY,
    },
    //urls to link to these flows
    authorities: {
        signUpSignIn: {
            authority: process.env.REACT_APP_ADB2C_AUTHORITY,
        },
        forgotPassword: {
            authority: process.env.REACT_APP_ADB2C_FORGOT_PASSWORD_AUTHORITY,
        },
    },
    authorityDomain: process.env.REACT_APP_ADB2C_AUTHORITY_DOMAIN
}















export const msalConfig = {

    auth: {
        clientId: process.env.REACT_APP_ADB2C_CLIENT_ID,// Application or Cliend ID of SPA in B2C
        authority: process.env.REACT_APP_ADB2C_AUTHORITY,// Use a sign-up/sign-in user-flow as a default authority
        knownAuthorities: process.env.REACT_APP_ADB2C_KNOWN_AUTHORITIES.split(','),// Mark your B2C tenant's domain as trusted.
        redirectUri: process.env.REACT_APP_ADB2C_REDIRECT_URI,//Points to window.location.origin.(root url) You must register this URI on Azure Portal/App Registration
        postLogoutRedirectUri: process.env.REACT_APP_ADB2C_POST_LOGOUT_REDIRECT_URI // Indicates the page to navigate after logout.
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {	
                    return;	
                }
                switch (level) {	
                    case LogLevel.Error:	
                        console.error(message);	
                        return;	
                    case LogLevel.Info:	
                        console.info(message);	
                        return;	
                    case LogLevel.Verbose:	
                        console.debug(message);	
                        return;	
                    case LogLevel.Warning:	
                        console.warn(message);	
                        return;	
                    default:
                        console.log("What is going on")
                }
            }
        }
    }
};




/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    smartHomeAPI: {
        endpoint: "http://localhost:5000/device/addnew",
        scopes: ["https://smarthomesolutionsmain.onmicrosoft.com/dbe0876d-647d-4069-bf0d-4ec48cbc055b/devices.read"], // e.g. api://xxxxxx/access_as_user
    },
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
 export const loginRequest = {
    scopes: [...protectedResources.smartHomeAPI.scopes]
};