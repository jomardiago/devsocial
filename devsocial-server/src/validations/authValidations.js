const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

function validateAuth(context) {
    console.log('validating authentication based on the token headers');
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];

        if (token) {
            console.log('token received');
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY);
                console.log('token is valid for user:', user.username);
                return user;
            } catch (error) { 
                console.log('token is invalid');
                throw new AuthenticationError('Token is invalid or expired');
            }
        }

        throw new Error('Authentication Error: Make sure that the token is in valid format. I.E. Bearer {token}');
    }

    throw new Error('Authentication Error: Token is missing from the request headers');
}

module.exports = {
    validateAuth
};
