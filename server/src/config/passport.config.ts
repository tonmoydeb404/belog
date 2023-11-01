import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import loadEnv from "../helpers/loadEnv";
import * as userService from "../services/user.service";

// google strategy
const googleConfig = {
  clientID: loadEnv.GOOGLE_CLIENT_ID,
  clientSecret: loadEnv.GOOGLE_CLIENT_SECRET,
  callbackURL: loadEnv.GOOGLE_CALLBACK_URL,
};
const googleStrategy = () => {
  passport.use(
    new GoogleStrategy(googleConfig, async (_ac, _rt, profile, done) => {
      if (!profile._json.email) return done("No access to user email!");

      let user = await userService.getOne("email", profile._json.email);

      if (!user) {
        console.log(profile);

        // if user don't exist then register user
        user = await userService.create({
          name: profile.displayName,
          avatar: profile._json.picture,
          email: profile._json.email,
          googleId: profile.id,
        });
      }

      const { payload, token } = user.generateAuthToken();

      done(undefined, payload, token);
    })
  );
};

// passport config
const passportConfig = () => {
  googleStrategy();

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    const user = await userService.getOne("_id", id);
    done(null, user);
  });
};

export default passportConfig;
