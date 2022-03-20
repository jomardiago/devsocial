import React from 'react';
import { Spinner, VStack } from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import Post from './Post';

function Posts({ userId }) {
    const [posts, setPosts] = React.useState();
    const QUERY = userId ? GET_POSTS_BY_USER : GET_POSTS;
    const { data, loading, error } = useQuery(QUERY, {
        variables: {
            userId
        },
        onCompleted() {
            if (userId) {
                setPosts(data.postsByUser);
            } else {
                setPosts(data.posts);
            }
        },
        fetchPolicy: 'network-only' // we don't want to look at the cache, we always want the updated data
    });

    return (
        <VStack gap={6} mt={6} w="full">
            { loading && !error && <Spinner /> }
            {
                posts?.map(post => (<Post key={post.id} post={post} />))
            }
        </VStack>
    );
}

const GET_POSTS = gql`
    query getPosts {
        posts {
            id
            content
            createdAt
            user {
                id
                username
            }
        }
    }
`;

const GET_POSTS_BY_USER = gql`
    query postsByUser($userId: String!) {
        postsByUser(userId: $userId) {
            id
            content
            user {
                id
                username
                email
            }
            createdAt
        }
    }
`;

export default Posts;
