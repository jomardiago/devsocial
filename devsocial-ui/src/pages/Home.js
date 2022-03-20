import React from 'react';
import { Stack } from '@chakra-ui/react';
import PostForm from '../components/PostForm';
import Posts from '../components/Posts';

function Home() {
    return (
        <Stack>
            <PostForm />
            <Stack>
                <Posts />
            </Stack>
        </Stack>
    );
}

export default Home;
