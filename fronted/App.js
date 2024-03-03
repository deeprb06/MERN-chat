import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './src/pages/Home';
import { Toaster } from 'react-hot-toast';
import Chat from './src/pages/Chat';


const AppLayout = () => {
    return (
        <ChakraProvider>
            <Toaster position='top-right' reverseOrder={false}/>
            <Home/>
        </ChakraProvider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children: [
            {
                path: '/chats',
                element: <Chat/>
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);
