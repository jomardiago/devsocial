import React from 'react';
import { Avatar, Button, HStack, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';

function PostForm() {
    const [content, setContent] = React.useState('');
    const [error, setError] = React.useState('');

    const [createPost, { loading }] = useMutation(CREATE_POST, {
        variables: {
            postInput: { content }
        },
        refetchQueries: [
            'getPosts'
        ],
        onCompleted() {
            setContent('');
        }
    });

    function submitPost(e) {
        e.preventDefault();
        if (!content) {
            setError('Content is required');
        } else {
            createPost();
        }
    }

    return (
        <form onSubmit={submitPost} style={{ width: '100%' }}>
            <VStack w="full">
                <HStack w="full">
                    <Avatar size="sm" />
                    <Input
                        placeholder='What is on your mind today?'
                        onChange={e => setContent(e.target.value)}
                        value={content}
                        isInvalid={error}
                    />
                </HStack>
                {loading && !error && <Spinner />}
                {error && <Text color="red.300">{error}</Text>}
                <Button
                    w="full"
                    type="submit"
                >
                    Post
                </Button>
            </VStack>
        </form>
    );
}

const CREATE_POST = gql`
    mutation createPost($postInput: PostInput!) {
        createPost(postInput: $postInput) {
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

export default PostForm;
