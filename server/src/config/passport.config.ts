import passport from "passport";
import {
  StrategyOptions as GithubOptions,
  Strategy as GithubStrategy,
} from "passport-github";
import {
  StrategyOptions as GoogleOptions,
  Strategy as GoogleStrategy,
} from "passport-google-oauth20";
import { getAuthPayload } from "../helpers/authPayload";
import loadEnv from "../helpers/loadEnv";
import * as userService from "../services/user.service";

// github
const githubConfig: GithubOptions = {
  clientID: loadEnv.GITHUB_CLIENT_ID,
  clientSecret: loadEnv.GITHUB_CLIENT_SECRET,
  callbackURL: loadEnv.GITHUB_CALLBACK_URL,
};
const githubStrategy = new GithubStrategy(githubConfig, async function (
  _accessToken,
  _refreshToken,
  profile,
  done
) {
  if (!profile.emails[0].value)
    return done(new Error("No access to user email!"));
  let user = await userService.getOne("email", profile.emails[0].value);

  if (!user) {
    // if user don't exist then register user
    user = await userService.create({
      name: profile.displayName,
      avatar: profile.photos[0].value,
      email: profile.emails[0].value,
      githubId: profile.id,
    });
  }

  if (user.githubId !== profile.id)
    return done(new Error("Account is not linked with the provider"));

  const payload = getAuthPayload(user);

  done(undefined, payload);
});

// google
const googleConfig: GoogleOptions = {
  clientID: loadEnv.GOOGLE_CLIENT_ID,
  clientSecret: loadEnv.GOOGLE_CLIENT_SECRET,
  callbackURL: loadEnv.GOOGLE_CALLBACK_URL,
};
const googleStrategy = new GoogleStrategy(googleConfig, async function (
  _accessToken,
  _refreshToken,
  profile,
  done
) {
  if (!profile._json.email)
    return done(null, null, { message: "No access to user email!" });
  let user = await userService.getOne("email", profile._json.email);

  if (!user) {
    // if user don't exist then register user
    user = await userService.create({
      name: profile.displayName,
      avatar: profile._json.picture,
      email: profile._json.email,
      googleId: profile.id,
    });
  }

  if (user.googleId !== profile.id)
    return done(null, null, {
      message: "Account is not linked with the provider",
    });

  const payload = getAuthPayload(user);

  done(undefined, payload);
});

// passport config
const passportConfig = () => {
  passport.use(googleStrategy);
  passport.use(githubStrategy);

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    const user = await userService.getOne("_id", id);
    const payload = getAuthPayload(user);
    done(null, payload);
  });
};

export default passportConfig;
