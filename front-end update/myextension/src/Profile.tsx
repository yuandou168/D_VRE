import React, { useState, useEffect } from 'react';
import Blockies from 'react-blockies';

import {jwtDecode} from 'jwt-decode'
// import jwtDecode from 'jwt-decode';
import {
  TextField,
  Button,
  Grid,
  MenuItem
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface User {
  _id: number;
  username: string;
}

interface JwtDecoded {
  payload: {
    id: string;
    publicAddress: string;
  };
}

interface Props {
  auth: { accessToken: string };
  onLoggedOut: () => void;
}

interface State {
  loading: boolean;
  user?: User;
  username: string;
}

const Profile: React.FC<Props> = ({ auth, onLoggedOut }) => {
  const [state, setState] = useState<State>({
    loading: false,
    user: undefined,
    username: '',
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');


  const [selectedOrganization, setSelectedOrganization] = useState('');


  const backendUrl = 'http://localhost:3000';

  useEffect(() => {
    const { accessToken } = auth;
    const decodedToken = jwtDecode<JwtDecoded>(accessToken);
    // const decodedToken = jwtDecode<JwtPayload>(accessToken);

    const { id } = decodedToken.payload;

    axios.get<User>(`${backendUrl}/api/v1/users/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => setState({ ...state, user: response.data }))
      .catch((error) => window.alert(error));
  }, []);

   // Fetching country list from API
   useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((response) => {
		console.log(response.data);
		const countryList = response.data.map((country: any) => country.name.common);
		setCountries(countryList);
	  })
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, username: e.target.value });
  };

  const handleSubmit = () => {
    const { accessToken } = auth;
    const { user, username } = state;

    setState({ ...state, loading: true });

    if (!user) {
      window.alert('The user id has not been fetched yet. Please try again in 5 seconds.');
      return;
    }

    axios.post(`${backendUrl}/api/v1/users/${user._id}`, 
	{ 
		username,
		organization: selectedOrganization,
		country: selectedCountry
	},
	{
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setState({ ...state, loading: true, user: response.data, username: response.data.username });
        setSelectedCountry(response.data.country);
        setSelectedOrganization(response.data.organization);
        toast.success('Registration details updated successfully');
      })
      .catch((error) => {
        setState({ ...state, loading: false });
        toast.error('Error updating registration details');
      });
  };

  const { accessToken } = auth;
  const { payload: { publicAddress } } = jwtDecode<JwtDecoded>(accessToken);
  const { loading, user } = state;
  const username = user ? user.username : '';

  return (
    <div className="Profile">
      <ToastContainer autoClose={3000}/>
      <p>Logged in as <Blockies seed={publicAddress} /></p>
      <p style={{ justifyContent: 'right' }}>
        <button onClick={onLoggedOut}>Logout</button>
      </p>
      <div>
        My username is {username ? <pre>{username}</pre> : 'not set.'}{' '}
        Your publicAddress is <pre>{publicAddress}</pre>
      </div>
      <div> 
		<h2>Registration Details</h2>   
		<Grid container spacing={3}>
			<Grid item xs={4}>
				<TextField name="username" label="username" onChange={handleChange} />
			</Grid>
			<Grid item xs={4}>
			<TextField
				select
				label="Organization"
				fullWidth
				onChange={(e) => setSelectedOrganization(e.target.value)}
			>
				<MenuItem value="UvA">UvA</MenuItem>
        <MenuItem value="UiS">UiS</MenuItem>
        <MenuItem value="UPV">UPV</MenuItem>
        <MenuItem value="UGR">UGR</MenuItem>
        <MenuItem value="HF">HF</MenuItem>
        <MenuItem value="EMC">EMC</MenuItem>
        <MenuItem value="INCLIVA">INCLIVA</MenuItem>
        <MenuItem value="SUH">SUH</MenuItem>
        <MenuItem value="Tyris">Tyris</MenuItem>
        <MenuItem value="bitYoga">bitYoga</MenuItem>
				<MenuItem value="VU">VU</MenuItem>
				{/* Add more organizations */}
			</TextField>
			</Grid>
			
			<Grid item xs={4}>
          <Autocomplete
            value={selectedCountry}
            onChange={(e, newValue) => {
                setSelectedCountry(newValue || '');
              }}
            options={countries}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                variant="standard"
              />
            )}
          />
        </Grid>
      </Grid>
        <Button disabled={loading} onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default Profile;
