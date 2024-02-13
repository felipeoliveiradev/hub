import { PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';

export const keycloakConfig = () => {
  return {
    authServerUrl: 'http://keycloak:8080', // might be http://localhost:8080/auth for older keycloak versions
    realm: 'auth-realm',
    clientId: 'nests',
    secret: 'nS74XHcAY8qIhUMxT5bWowY1nYg6JPLo',
    policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
    tokenValidation: TokenValidation.ONLINE,
  };
};
