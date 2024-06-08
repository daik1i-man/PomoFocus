const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./Modules/dataBase');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
  }, async (req, token, refreshToken, profile, done) => {
    try {
      let user = await User.query("SELECT * FROM users WHERE googleid = $1", [profile.id]);
      if (user.rows.length > 0) {
        done(null, user.rows[0]); // Assuming the first row is the user
      } else {
        user = await User.query("INSERT INTO users (googleid, displayName, firstName, lastName, image, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [profile.id, profile.displayName, profile.name.givenName, profile.name.familyName, profile.photos[0].value, profile.emails[0].value]);
        done(null, user.rows[0]); // Assuming the first row is the user
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id); // Assuming user object has an id property
});

passport.deserializeUser((id, done) => {
    User.query("SELECT * FROM users WHERE id = $1", [id])
      .then(user => {
        done(null, user.rows[0]); // Assuming the first row is the user
      })
      .catch(err => {
        console.error(err);
        done(err);
      });
});
