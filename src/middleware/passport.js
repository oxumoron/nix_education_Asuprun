import {
  Strategy as JwtStrategy,
  ExtractJwt as ExtractJwt
} from 'passport-jwt';
import mongoose from 'mongoose';
import User from '../models/user.js';
import {
  keys
} from '../config/config.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
}

export const passport = function () {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id')
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e);
      }
    })
  )
}