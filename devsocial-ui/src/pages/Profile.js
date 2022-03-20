import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Avatar, Button, Divider, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import Posts from '../components/Posts';
import PostForm from '../components/PostForm';

function Profile({ username, location }) {
    const { user, updateConnections } = React.useContext(AuthContext);
    const userId = user.username === username ? user.id : location?.state?.userId;
    const [addToConnections, { loading }] = useMutation(ADD_TO_CONNECTIONS, {
        variables: {
            username
        },
        onCompleted(data) {
            updateConnections(data?.addToConnections);
        }
    });

    if (user.username !== username && !user?.connections?.find(user => user === userId)) {
        return (
            <VStack w="full" align="center" gap={3}>
                <Avatar size="xl"/>
                <Heading>{username}</Heading>
                { loading ? <Spinner /> : <Text>Not your connection yet!</Text> }
                <Button w="full" onClick={addToConnections}>Connect</Button>
            </VStack>
        );
    }

    return (
        <VStack w="full" align="center" gap={3}>
            <Avatar size="xl"/>
            <Heading>{username}</Heading>
            <Divider />
            { user.username === username && <PostForm /> }
            <Posts userId={userId} />
        </VStack>
    );
}

const ADD_TO_CONNECTIONS = gql`
    mutation addToConnections($username: String!) {
    addToConnections(username: $username) {
            id
            username
            email
            createdAt
            connections
        }
    }
`;

export default Profile;
