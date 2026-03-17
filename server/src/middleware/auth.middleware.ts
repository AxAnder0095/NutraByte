import "dotenv/config";
import { expressjwt as jwt } from "express-jwt";
import JwksRsa from "jwks-rsa";

const auth0Domain = process.env.AUTH0_DOMAIN;
const auth0Audience = process.env.AUTH0_AUDIENCE;

if (!auth0Domain || !auth0Audience) {
  throw new Error("Auth0 domain and audience must be set in environment variables.");
};

export const authMiddleware = jwt({
    secret: JwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${auth0Domain}/.well-known/jwks.json`
    }),
    audience: auth0Audience,
    issuer: `https://${auth0Domain}/`,
    algorithms: ["RS256"]
});