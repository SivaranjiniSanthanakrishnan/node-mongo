

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usermodel');
var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken')

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.createToken=(user=>{
    
    return jwt.sign(user,'12345-67890-09876-54321',{expiresIn:3600})
})

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '12345-67890-09876-54321';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

exports.verifyuser=passport.authenticate('jwt',{session:false})