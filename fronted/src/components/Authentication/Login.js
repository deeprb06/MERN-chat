import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ChatState } from '../../Context/ChatProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    // const { setUser } = ChatState();

    async function handleLogin() {
        if (!email || !password) {
            toast.error('Email and password is required');
            return;
        }
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/user/signin`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                },
            );
            const data = await response.json();
            if (response.ok) {
                toast.success('Login successfully');
                localStorage.setItem('access_token', data.data.token);
                setEmail('');
                setPassword('');
                // setUser(data.data);
                navigate('/chats');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    return (
        <VStack spacing="10px">
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? 'text' : 'password'}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                isLoading={loading}
                onClick={handleLogin}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                    setEmail('guest@example.com');
                    setPassword('123456');
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    );
};

export default Login;
