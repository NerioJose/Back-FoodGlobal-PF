require('dotenv').config(); // Asegúrate de que dotenv esté configurado

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  // Aquí es donde buscarías o crearías el usuario en la base de datos
  return done(null, profile);
}
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  // Aquí es donde buscarías o crearías el usuario en la base de datos
  return done(null, profile);
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
