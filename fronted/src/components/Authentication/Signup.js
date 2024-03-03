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

const Signup = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [password, setPassword] = useState('');
    const [pic, setPic] = useState('');
    const [picLoading, setPicLoading] = useState(false);

    async function handleSubmit() {
        setPicLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            toast.error('Please Fill all the fields');
            setPicLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            toast.error('password and confirm password not matched');
            return;
        }
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/user/signup`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                        isAdmin: false,
                    }),
                },
            );
            const data = await response.json();
            if (response.ok) {
                toast.success('User registered successfully');
                // Handle any additional logic after a successful registration
            } else {
                // If the response is not okay, handle the error
                toast.error(
                    `Error: ${data.message || 'Failed to register user'}`,
                );
            }
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setPicLoading(false);
        }
    }

    const handleProfile = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast('Please Select an Image!')
            return;
        }
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'chat-app');
            data.append('cloud_name', 'piyushproj');
            fetch(`${process.env.REACT_APP_API_URL}/upload`, {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            toast.error('Please Select an Image!')
            setPicLoading(false);
            return;
        }
    };

    return (
        <VStack spacing="5px">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input type="file" p={1.5} accept="image/*" />
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                // onClick={submitHandler}
                isLoading={picLoading}
                onClick={handleSubmit}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default Signup;
