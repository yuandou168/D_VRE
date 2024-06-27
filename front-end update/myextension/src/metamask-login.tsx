import '../style/Login.css';

import React, { useState } from 'react';
import Web3 from 'web3';

import { Auth } from './API/types';
import axios from 'axios';

interface Props {
	onLoggedIn: (auth: Auth) => void;
}

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

export const MetamaskLogin = ({ onLoggedIn }: Props): JSX.Element => {
	const [loading, setLoading] = useState(false); // Loading button state
    const backendUrl = 'http://localhost:3000';

	const handleAuthenticate = ({
		publicAddress,
		signature,
	}: {
		publicAddress: string;
		signature: string;
	}) =>
    axios.post(`${backendUrl}/api/v1/auth`, JSON.stringify({ publicAddress, signature }), {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.data)
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });

	const handleSignMessage = async ({
		publicAddress,
		nonce,
	}: {
		publicAddress: string;
		nonce: string;
	}) => {
		try {
			const signature = await web3!.eth.personal.sign(
				`I am signing my one-time nonce: ${nonce}`,
				publicAddress,
				'' // MetaMask will ignore the password argument here
			);

			return { publicAddress, signature };
		} catch (err) {
			throw new Error(
				'You need to sign the message to be able to log in.'
			);
		}
	};

	const handleSignup = (publicAddress: string) =>
    axios.post(`${backendUrl}/api/v1/users`, JSON.stringify({ publicAddress }), {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.data)
      .catch((error) => {
        // Handle errors here
        console.log('Error:', error.message);
      });

	const handleClick = async () => {
		// Check if MetaMask is installed
		if (!(window as any).ethereum) {
			window.alert('Please install MetaMask first.');
			return;
		}

		if (!web3) {
			try {
				// Request account access if needed
				await (window as any).ethereum.enable();

				// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				web3 = new Web3((window as any).ethereum);
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}

		const coinbase = await web3.eth.getCoinbase();
		if (!coinbase) {
			window.alert('Please activate MetaMask first.');
			return;
		}

		const publicAddress = coinbase.toLowerCase();
		setLoading(true);

		// Look if user with current publicAddress is already present on backend
		axios.get(
			`${backendUrl}/api/v1/users?publicAddress=${publicAddress}`,
		)
			.then(
                (response) => response.data)
			// If yes, retrieve it. If no, create it.
			.then((users) =>
				users ? users : handleSignup(publicAddress)
			)
			// Popup MetaMask confirmation modal to sign message
			.then(handleSignMessage)
			// Send signature to backend on the /auth route
			.then(handleAuthenticate)
			// Pass accessToken back to parent component (to save it in localStorage)
			.then(onLoggedIn)
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	return (
		<div>
			<p>
				Please Login to your Ethereum Account.
			</p>
			<button className="Login-button Login-mm" onClick={handleClick}>
				{loading ? 'Loading...' : 'Login with MetaMask'}
			</button>
		</div>
	);
};