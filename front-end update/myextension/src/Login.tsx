import '../style/LoginWrapper.css';
import { ReactWidget } from '@jupyterlab/ui-components';

import React, { useEffect, useState } from 'react';

import { MetamaskLogin } from './metamask-login';
import Profile from './Profile';
import { Auth } from './API/types';
// import logo from './logo.svg';

const LS_KEY = 'login-with-metamask:auth';

interface State {
	auth?: Auth;
}

const LoginMain = (): JSX.Element => {
	const [state, setState] = useState<State>({});

	useEffect(() => {
		// Access token is stored in localstorage
		const ls = window.localStorage.getItem(LS_KEY);
		const auth = ls && JSON.parse(ls);
		setState({ auth });
	}, []);

	const handleLoggedIn = (auth: Auth) => {
		localStorage.setItem(LS_KEY, JSON.stringify(auth));
		setState({ auth });
	};

	const handleLoggedOut = () => {
		localStorage.removeItem(LS_KEY);
		setState({ auth: undefined });
	};

	const { auth } = state;

	return (
		<div className="App">
			<header className="App-header">
				{/* <img src={logo} className="App-logo" alt="logo" /> */}
				<h1 className="App-title">
					Welcome to Login with MetaMask
				</h1>
			</header>
			<div className="App-intro">
				{auth ? (
					<Profile auth={auth} onLoggedOut={handleLoggedOut} />
				) : (
					<MetamaskLogin onLoggedIn={handleLoggedIn} />
				)}
			</div>
		</div>
	);
};

// export default LoginMain;


export class LoginWrapper extends ReactWidget {
    /**
     * Constructs a new CounterWidget.
     */
    constructor() {
      super();
      this.addClass('jp-react-widget');
    }
  
    render(): JSX.Element {
      return <LoginMain />;
    }
  }
