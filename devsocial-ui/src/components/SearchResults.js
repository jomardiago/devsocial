import React from 'react';
import { Avatar, Divider, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { navigate } from '@reach/router';

function SearchResults({ users, onClose }) {
    function handleViewProfile(user) {
        navigate(`/profile/${user.username}`, { state: { userId: user.id } });
        onClose();
    }

    return (
        <VStack
            w="full"
            gap={3}
            border="1px"
            borderColor="gray.50"
            shadow="base"
            p={3}
        >
            <Text fontWeight="500" fontSize="lg" w="full">People</Text>
            { users.map(user => (
                <Stack key={user.id} w="full" justify="center" cursor="pointer" onClick={() => handleViewProfile(user)}>
                    <HStack align="center">
                        <Avatar />
                        <VStack w="full" align="flex-start" spacing="0">
                            <Text fontWeight="500" fontSize="md">{ user.username }</Text>
                            <Text fontSize="xs">{ user.email }</Text>
                        </VStack>
                    </HStack>
                    <Divider />
                </Stack>
            )) }
        </VStack>
    );
}

export default SearchResults;
