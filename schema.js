const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;
const posts = require('./posts.js');
const authors = require('./authors.js');

const authorType = new GraphQLObjectType({
    name: 'Author',
    fields: {
        name: {
            type: GraphQLString,
        },
        surname: {
            type: GraphQLString,
        },
        age: {
            type: GraphQLInt,
        },
    },
});

const postType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        tittle: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        author: {
            type: authorType,
            resolve: (source, params) => {
                return authors[source.author]
            },
        },
    },
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        post: {
            type: postType,
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (source, { id }) => posts[id]
        },
        posts: {
            type: new GraphQLList(postType),
            resolve: () => posts
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType,
})

module.exports = schema