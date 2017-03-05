let twit = require("twit");

let config = {
    consumer_key: process.env.GOBLIN_CONSUMER_KEY,
    consumer_secret: process.env.GOBLIN_CONSUMER_SECRET,
    access_token: process.env.GOBLIN_ACCESS_TOKEN,
    access_token_secret: process.env.GOBLIN_ACCESS_TOKEN_SECRET
};

let tracking_keywords = ['Obama'];
let watch_users = ['POTUS', 'realDonaldTrump'];

let get_response = function() {
    let responses = ["Sad!", "Nope.", "lol", "u mad?"];
    return responses[Math.floor(Math.random()*responses.length)];
};


let T = new twit(config);

let stream = T.stream('statuses/filter',
                         {track: tracking_keywords,
                          screen_name: watch_users});

stream.on('tweet', function(tweet) {
    let response = `.@${tweet.user.screen_name} ${get_response()}`;
    T.post('statuses/update',
              {in_reply_to_status_id: tweet.id_str,
               status: response},
              function(err, data, response) {
                  if (err) {
                      console.log("There was an error!");
                      console.log(err);
                  }
              });
});
