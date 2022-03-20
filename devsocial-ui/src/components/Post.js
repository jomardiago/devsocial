import React from 'react';
import { Avatar, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';

function Post({ post }) {
    return (
        <Stack border="1px" borderRadius={6} borderColor="gray.200" w="full" p={6} shadow="lg">
            <VStack align="flex-start">
                <HStack>
                    <Avatar size="sm" />
                    <VStack align="flex-start" spacing={0}>
                        <Text fontWeight="500">{ post.user.username }</Text>
                        <Text fontSize="xs" color="gray.500">{ moment(post.createdAt).fromNow() }</Text>
                    </VStack>
                </HStack>
                <Text fontSize="lg">{ post.content }</Text>
            </VStack>
        </Stack>
    );
}

export default Post;
