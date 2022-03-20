import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { navigate } from '@reach/router';
import { Button, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputRightElement, Spinner, VStack } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function Register() {
    const { login } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState();
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [confirmPassword, setConfirmPassword] = React.useState();
    const [errors, setErrors] = React.useState({});
    const [toggleViewPassword, setToggleViewPassword] = React.useState(false);

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        variables: {
            registerInput: { email, username, password, confirmPassword }
        },
        update(_, { data: { register: userData } }) {
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
        if (!email) {
            errors.email = 'Email is required';
        }

        if (!username) {
            errors.username = 'Username is required';
        }

        if (!password) {
            errors.password = 'Password is required';
        }

        if (!confirmPassword) {
            errors.confirmPassword = 'Confirm password is required';
        }

        if (password !== confirmPassword) {
            errors.password = 'Passwords must match';
        }

        if (Object.keys(errors).length < 1) {
            registerUser();
        } else {
            setErrors(errors);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack w="100" gap={3} p={6} border="1px" borderColor="gray.50" shadow="base" borderRadius={8}>
                <Heading size="lg">Register</Heading>
                {
                    loading && Object.keys(errors).length === 0 && (<Spinner />)
                }
                <FormControl>
                    <FormLabel htmlFor='email'>Email Address</FormLabel>
                    <Input 
                        id='email' 
                        type='email' 
                        onChange={(e) => setEmail(e.target.value)} 
                        isInvalid={errors?.email} 
                    />
                    { errors?.email && <FormHelperText color="red.300">{ errors?.email }</FormHelperText> }
                </FormControl>
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
                    { errors?.password && <FormHelperText color="red.300">{ errors?.password }</FormHelperText> }
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                    <InputGroup>
                        <Input 
                            id='confirmPassword' 
                            type={!toggleViewPassword ? 'password' : 'text'}
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            isInvalid={errors?.confirmPassword} 
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
                    { errors?.confirmPassword && <FormHelperText color="red.300">{ errors?.confirmPassword }</FormHelperText> }
                </FormControl>
                <Button width="full" type="submit">
                    Register
                </Button>
            </VStack>
        </form>
    );
}

const REGISTER_USER = gql`
    mutation register($registerInput: RegisterInput) {
        register(registerInput: $registerInput) {
            id
            username
            email
            createdAt
            connections
            token
        }
    }
`;

export default Register;
