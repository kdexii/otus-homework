const { Strategy, ExtractJwt } = require('passport-jwt');
const dotenv = require('dotenv');
const { User } = require('../models/user'); // Замените на правильный путь к вашей модели пользователя

dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
    passport.use(
        new Strategy(options, async (jwt_payload, done) => {
            try {
                const user = await User.findByPk(jwt_payload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                console.error(err);
                return done(err, false);
            }
        })
    );
};
