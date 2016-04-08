import express from 'express';

import {
  SoundCloudGraphQLSchema
} from './schema';

var graphqlHTTP = require('express-graphql');

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: SoundCloudGraphQLSchema,
  graphiql: true
}));

app.use('/search', express.static(__dirname + '/search'));

app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + process.env.PORT);
});
