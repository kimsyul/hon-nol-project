import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.tsx';

const container = document.getElementById('root');
const queryClient = new QueryClient();

if (!container)
    throw new Error("Failed to find the root element. Make sure you have an element with the ID 'root' in your HTML.");
const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
);
