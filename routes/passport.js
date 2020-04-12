const passsport = require('passport')
const google = require('passport-google-oauth20');
const Mentor = require('../model/mentor');

passsport.serializeUser((user, done) => {
    console.log('serializeUser hit mentor')
    done(null, user.id)
})
passsport.deserializeUser((id, done) => {
    Mentor.findOne({ id }).then(user => {
        // console.log(user)
        console.log('deserializeUser hit')
        done(null, user)
    }).catch(err => console.log(err))
})

passsport.use(
    new google({
        callbackURL: "https://mentor-google-login-api.herokuapp.com/mentor/google/callback",
        clientID: '615837112153-sq409tbdb8r4f0aevlf3ruqfk8u8621c.apps.googleusercontent.com',
        clientSecret: 'Io0EBGeD1Sd_Lf25Puj_AIrT',
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile,'mentor ###');
        Mentor.findOne({ id: profile.id }).then(user => {
            if (user)
                done(null, user)
            else {
                const db = new Mentor({
                    name: profile.displayName,
                    id: profile.id,
                    email: profile._json.email,
                    verified: profile._json.email_verified,
                    profilepicture: profile._json.picture,
                    date_added: getTime()
                })
                db.save().then(user => { done(null, user) }).catch(err => { console.log(err) })

            }
        })
    })
)



// This Function is for Getting IST
function getTime() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  
    var currentTime = new Date();
  
    var currentOffset = currentTime.getTimezoneOffset();
  
    var ISTOffset = 330;   // IST offset UTC +5:30
  
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
  
    // ISTTime now represents the time in IST coordinates
    return ISTTime;
  }