import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { navigate } from '@reach/router';
import { Button, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputRightElement, Spinner, Text, VStack } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function Login() {
    const { login } = React.useContext(AuthContext);
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [errors, setErrors] = React.useState({});
    const [toggleViewPassword, setToggleViewPassword] = React.useState(false);

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        variables: {
            loginInput: { username, password }
        },
        update(_, { data: { login: userData } }) {
            login(userData);
            navigate('/');
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        const errors = {};

        if (!username) {
            errors.username = 'Username is required';
        }

        if (!password) {
            errors.password = 'Password is required';
        }

        if (Object.keys(errors).length < 1) {
            loginUser();
        } else {
            setErrors(errors);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack w="100" gap={3} p={6} border="1px" borderColor="gray.50" shadow="base" borderRadius={8}>
                <Heading size="lg">Login</Heading>
                {
                    loading && Object.keys(errors).length === 0 && (<Spinner />)
                }
                <FormControl>
                    <FormLabel htmlFor='username'>User Name</FormLabel>
                    <Input 
                        id='username' 
                        type='text' 
                        onChange={(e) => setUsername(e.target.value)}
                        isInvalid={errors?.username}  
                    />
                    { errors?.username && <FormHelperText color="red.300">{ errors?.username }</FormHelperText> }
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <InputGroup>
                        <Input
                            id='password'
                            type={!toggleViewPassword ? 'password' : 'text'}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={errors?.password}
                        />
                        {
                            !toggleViewPassword ? (
                                <InputRightElement children={
                                        <ViewOffIcon 
                                            as="button" 
                                            cursor="pointer"
                                            onClick={() => setToggleViewPassword(value => !value)}
                                        />
                                    }
                                />
                            ) : (
                                <InputRightElement children={
                                        <ViewIcon 
                                            as="button" 
                                            cursor="pointer"
                                            onClick={() => setToggleViewPassword(value => !value)}
                                        />
                                    }
                                />
                            )
                        }
                    </InputGroup>
                    {errors?.password && <FormHelperText color="red.300">{errors?.password}</FormHelperText>}
                </FormControl>
                { errors?.form && <Text color="red.300" className="error">{ errors.form }</Text> }
                <Button width="full" type="submit">
                    Login
                </Button>
            </VStack>
        </form>
    );
}

const LOGIN_USER = gql`
    mutation login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            id
            username
            email
            createdAt
            connections
            token
        }
    }
`;

export default Login;
