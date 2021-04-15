const express = require('express');
const app = express();

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');

const PORT = 3001;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true

}))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));