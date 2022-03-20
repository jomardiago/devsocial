import React from 'react';
import {
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import { Link } from '@reach/router';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { gql, useLazyQuery } from '@apollo/client';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { AuthContext } from '../context/AuthContext';
import SearchResults from './SearchResults';

function Header() {
    const { user, logout } = React.useContext(AuthContext);
    const isAuthenticated = user ? Object.keys(user).length > 0 : false;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const bgColor = useColorModeValue('#FFFFFF', '#1A202C');

    const [searchInput, setSearchInput] = React.useState('');
    const [searchUsers, { data, loading, error }] = useLazyQuery(SEARCH_USERS);

    function handleLogout() {
        setSearchInput('');
        searchUsers({
            variables: {
                searchInput: 'randomCharacter'
            }
        });
        logout();
    }

    function submitSearchUsers(e) {
        e.preventDefault();
        if (searchInput !== '') {
            searchUsers({
                variables: {
                    searchInput
                }
            });
        }
    }

    return (
        <HStack
            w="100%"
            p={2}
            justify="space-between"
            align="center"
            borderBottom="1px"
            borderColor="gray.50"
            shadow="base"
            position="fixed"
            top={0}
            zIndex={1}
            bg={bgColor}
        >
            <IconButton
                aria-label="Open Menu"
                icon={<HamburgerIcon />}
                ref={btnRef}
                onClick={onOpen}
            />
            <Heading as={Link} to="/">DevSocial</Heading>
            <ColorModeSwitcher />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <HStack><Text>Hi { user?.username ? <Link onClick={onClose} to={`/profile/${user.username}`}>{user.username}</Link> : 'There'}! 👋</Text></HStack>
                    </DrawerHeader>
                    <DrawerBody>
                        {
                            isAuthenticated ? (
                                <VStack w="full" gap={2}>
                                    <Button
                                        w="full"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                    <Divider />
                                    <form onSubmit={submitSearchUsers} style={{ width: '100%' }}>
                                        <InputGroup>
                                            <Input 
                                                placeholder='Search DevSocial'
                                                value={searchInput}
                                                onChange={e => setSearchInput(e.target.value)}
                                            />
                                            <InputRightElement children={
                                                    <SearchIcon 
                                                        as="button" 
                                                        cursor="pointer"
                                                        type="submit"
                                                        onClick={submitSearchUsers}
                                                    />
                                                }
                                            />
                                        </InputGroup>
                                    </form>
                                    { loading && <Spinner /> }
                                    { error && <Text color="red.300">Error</Text> }
                                    { data?.searchUsers?.length > 0 && <SearchResults users={data.searchUsers} onClose={onClose} /> }
                                </VStack>
                            ) : (
                                <HStack
                                    justify="space-between"
                                    align="center"
                                    w="full"
                                    h="30px"
                                >
                                    <Button
                                        w="full"
                                        variant="link"
                                        as={Link}
                                        to="/login"
                                        onClick={onClose}
                                    >
                                        Login
                                    </Button>
                                    <Divider orientation="vertical" />
                                    <Button
                                        w="full"
                                        variant="link"
                                        as={Link}
                                        to="/register"
                                        onClick={onClose}
                                    >
                                        Register
                                    </Button>
                                </HStack>
                            )
                        }
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </HStack>
    );
}

const SEARCH_USERS = gql`
    query searchUsers($searchInput: String!) {
        searchUsers(searchInput: $searchInput) {
            id
            username
            email
        }
    }
`;

export default Header;
