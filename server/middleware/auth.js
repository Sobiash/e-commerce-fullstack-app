// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

// const { User } = require("../models/user");

// let auth = () => {
//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passReqToCallback: true
//       },
//       async (email, password, done) => {
//         const user = await User.findOne({ email: email });
//         if (!user) {
//           return done(null, false, { message: "That email is not registered" });
//         }

//         const passwordValid = await passwordValidCheck(password, user.password);

//         if (!passwordValid) return done(null, false);
//         done(null, user);
//       }
//     )
//   );

//   function passwordValidCheck(rawPassword, hashedPassword) {
//     try {
//       return bcrypt.compare(rawPassword, hashedPassword);
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user);
//     });
//   });
// };

const { User } = require("../models/user");

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
