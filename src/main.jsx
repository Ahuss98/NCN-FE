import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import LoginProvider from './components/Login.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<LoginProvider>
	<React.StrictMode>
		<App />
	</React.StrictMode>
	</LoginProvider>
);
