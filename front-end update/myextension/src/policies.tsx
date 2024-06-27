import { ReactWidget } from '@jupyterlab/ui-components';
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  MenuItem
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import "../style/policies.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EncryptFileAndUpload from './components/lit';

const LS_KEY = 'login-with-metamask:auth';

const ls = window.localStorage.getItem(LS_KEY);
const auth = ls && JSON.parse(ls);

// Define the URL of your local backend server
const backendUrl = 'http://localhost:3000';

interface Input {
  group: string;
  permissions: string;
  organizations: string[];
  countries: string[];
}


const SharingPolicyComponent: React.FC = () =>{

  const [countries, setCountries] = useState<string[]>([]);
  
  const [inputs, setInputs] = useState<Input[]>([{ group: '', permissions: '',  organizations: [], countries: []}]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then((response) => {
        console.log(response.data);
        const countryList = response.data.map((country: any) => country.name.common);
        setCountries(countryList);
      })
    .catch(error => console.error(error));
	}, []);

  const handleInputChange = (
    index: number,
    value: string | string[],
    field: string
  ) => {
    const values = [...inputs];
    if (value !== null) {
      if (field === 'group' || field === 'permissions') {
        values[index][field] = value as string;
      }
      else if (field === 'organizations' || field === 'countries') {
        values[index][field] = value as string[];
      }
      setInputs(values);
    }
  };
  

  const handleAddInput = () => {
    setInputs([...inputs, { group: '', permissions: '', organizations: [], countries: []}]);
  };

  const handleRemoveInput = (index: number) => {
    const values = [...inputs];
    if(values) {
      values.splice(index, 1);
      setInputs(values);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    
    event.preventDefault();

    const formData = new FormData();

    formData.append('policies', JSON.stringify(inputs));

    // Sending a POST request to the backend server using Axios
      try {
        const response = await axios({
          method: "post",
          url: `${backendUrl}/api/v1/policies/add`,
          data: formData,
          headers: { 
            Authorization: `Bearer ${auth.accessToken}`
          },
        });
        toast.success('Policy Saved Successfully and Smart Contract Deployed');
        return response.data;
      } catch(error) {
        toast.error("Error while deploying smart contract")
        console.log(error)
      }  
  };
  
  return (
    <div className='scrollable-page'>
      <ToastContainer autoClose={3000}/>
      <h2>Custom Policies Definition</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <EncryptFileAndUpload />
        </div>
        <div>
          <h3>Groups and Policies:</h3>
          <button type="button" onClick={handleAddInput}>Add</button>
        </div>
        {inputs.map((input, index) => (
          <div key={index} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input
                type="text"
                name="group"
                placeholder="Group Name"
                value={input.group}
                onChange={(event) => handleInputChange(index, event.target.value, 'group')}
                style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
              <select
                name="permissions"
                value={input.permissions}
                onChange={(event) => handleInputChange(index, event.target.value, 'permissions')}
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginLeft: '10px' }}
              >
                <option value="">Select a permission</option>
                <option value="read_access">Read Access</option>
                <option value="edit_access">Edit Access</option>
                <option value="unlimited_access">Full Access</option>
              </select>
              {/* <select
                name="permissions"
                value={input.permissions}
                onChange={(event) => handleInputChange(index, event.target.value, 'permissions')}
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginLeft: '10px' }}
              >
                <option value="">Select a permission</option>
                <option value="read_access">Read Access</option>
                <option value="unlimited_access">Full Access</option>
              </select> */}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Grid container spacing={3}>
			<Grid item xs={6}>
      <TextField
              select
              label="Organizations"
              fullWidth
              SelectProps={{
                multiple: true,
                value: input.organizations,
                onChange: (event) => {
                  handleInputChange(index, event.target.value as string[], 'organizations')
                },
                renderValue: (selected) => (selected as string[]).join(', '),
              }}
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
			
			<Grid item xs={6}>
            <Autocomplete
          multiple
              value={input.countries}
              onChange={(event, newValue) => {
                handleInputChange(index, newValue, 'countries')
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
            </div>    
            <button type="button" onClick={() => handleRemoveInput(index)} style={{ backgroundColor: '#ff0000', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', alignSelf: 'flex-end' }}>
              Remove
            </button> 
          </div>
        ))}
        <div style={{ alignItems: 'center' }}>
          <Button variant="contained" type="submit" >Save Policies</Button>
        </div>
      </form>
    </div>
  );
  
  
};

// export default SharingPolicyComponent;

export class SharingPolicyForm extends ReactWidget {
    /**
     * Constructs a new CounterWidget.
     */
    constructor() {
      super();
      this.addClass('jp-react-widget');
    }
  
    render(): JSX.Element {
      return <SharingPolicyComponent />;
    }
  }

