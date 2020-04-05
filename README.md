# hanabi-net

Is this something the world needs? No. Absolutely not. Especially considering that this already exists in a whole bunch of flavors! Not surpisingly a bunch of nerds love this game and independently decided to build versions.
But, I'm going to build it anyway for the sake of learning a bunch of technology.

Local & production setup for the next.js react app

Set up a mongo DB or use mine. (Shoot me a text or DM or something and I'll create you a user)

Then you'll need to set up the environment variables to run locally.
next.js documentation on env variables:
https://nextjs.org/docs/api-reference/next.config.js/environment-variables

Create a file in the root dir called "next.config.js"

Here is a sample one:

```javascript
module.exports = {
  env: {
    // # Mongo base URL
    // # Example: "mongodb+srv://"
    MONGO_BASE_URL: "mongodb+srv://",

    // # Mongo DB username
    // # Example: "hananbiDatabase"
    MONGO_USERNAME: "hananbiDatabase",

    // # Mongo password
    // # Example: "examplePass1234"
    MONGO_PW: "examplePass1234",

    // # Mongo collection URL
    // (basically don'w know WTF I'm doing with this. Good luck.)
    // # Example: "@hanabinet-yihkk.mongodb.net/test?retryWrites=true&w=majority"
    MONGO_COLLECTION_URL:
      "@hanabinet-yihkk.mongodb.net/test?retryWrites=true&w=majority",

    // # Mongo collection name
    // # Example: "HanabiGames"
    MONGO_COLLECTION_NAME: "HanabiGames",
  },
};

// # these vars will be used to construct the endpoint for mongo callouts
// # the url will be constructed as follows:
// # MONGO_BASE_URL + MONGO_USERNAME + ':' + MONGO_PW + MONGO_COLLECTION_URL
// #
// # the collection used when retrieving writing game data will be the MONGO_COLLECTION_NAME
```
