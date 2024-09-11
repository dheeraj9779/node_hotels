const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy   //USing username and password strategy
const Person = require('./models/Person');

passport.use(new LocalStrategy(async (username,password,done) => {
    try{
        const user = await Person.findOne({username: username});
        if(!user) return done(null, false, {message: 'Incorrect Username'});

        const isPasswordMatch = await user.comparePassword(password)
        //const isPasswordMatch = user.password === password ? true : false;
        if(isPasswordMatch){
            return done(null,user)
        }
        else{
            done(null, false, {message: 'Incorrect Password'});
        }
    }catch(error){
        return done(error)
    }
}));

module.exports = passport;