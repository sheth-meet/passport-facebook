const passport = require('passport');
const strategy = require('passport-facebook');
const User = require('./models/user');
const FacebookStrategy = strategy.Strategy;

passport.use(
    new FacebookStrategy(
    {
        clientID : 'YOUR FACEBOOK APP ID',
        clientSecret : "YOUR FACEBOOK APP SECRET",
        callbackURL : "http://localhost:3000/login/callback",
        profileFields: ['id', 'emails', 'name']
    },
    
    async function(accessToken,refreshToken,profile,done)
    {   
        
        const id = profile.id;
        const name = profile.displayName;
        const email = profile.emails[0].value;
        const user = await User.findOne({fbID : id});
        if(!user)
        {
            const user = new User({fbID : id , name, email});
            await user.save();
            console.log('Facebook profile data stored in database');
        }
        done(null,profile);
    }
    )
);

