import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactWidget } from '@jupyterlab/ui-components';
import FileList from './IPFS-list';
import Dropzone from './asset-select';
import {Button } from '@material-ui/core';
import FileSelect from "./select-wrapper";
import "../../style/scrollable.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the interfaces for group and file dat
interface Group {
  name: string;
  contractAddress: string;
}

interface FileType {
  name: string;
  type: string;
  IPFSHash: string;
}

interface FileOption {
  name: string;
  IPFSHash: string;
}
const GroupListComponent: React.FC = () => {
  // const notify = (notify_value: string) => toast(notify_value);

  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [sharedFiles, setSharedFiles] = useState<FileType[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedIPFSFiles, setSelectedIPFSFiles] = useState<FileOption[]>([]);
  const [userUploadedFiles, setUserUploadedFiles] = useState<FileOption[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleIPFSFileSelection = (selectedFiles: FileOption[]) => {
    setSelectedIPFSFiles(selectedFiles);
  };

  const backendUrl = 'http://localhost:3000';
  const LS_KEY = 'login-with-metamask:auth';
  const ls = window.localStorage.getItem(LS_KEY);
  const auth = ls && JSON.parse(ls);
  const { accessToken } = auth;

  // Fetch the list of groups from your API
  useEffect(() => {   
    axios
      .get(`${backendUrl}/api/v1/users/groups`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setGroups(response.data);
      })
      .catch((error) => {
        console.error('Error fetching contract information:', error);
        window.alert('Error fetching contract information');
      });
  }, []);

  useEffect(() => {
		loadUserUploadedFiles()
	}, []);


//   Function to fetch shared files within a group
  const fetchSharedFiles = (contractAddress: string) => {
    axios
      .get(`${backendUrl}/api/v1/users/group/files?groupContractAddress=${contractAddress}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setSharedFiles(response.data.formattedData);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response) {
          toast.error(error.response.data.message)
          console.log('Response status:', error.response.status);
          console.log('Error message:', error.response.data.message);
        }
      });
  };

  const handleIPFSUpload = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = new FormData();
    
    // Append the file(s)
    selectedFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });


 try {
        const response = await axios({
          method: "post",
          url: `${backendUrl}/api/v1/users/asset-upload-test`,
          data: formData,
          headers: { 
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "multipart/form-data" 
          },
        })
        if(response.data) {
          loadUserUploadedFiles()
          return response.data;
        }        
      } catch(error) {
        console.log(error)
        // if(error.response) {
        //   toast.error(error.response.data.message)
        // }
      } 
  };

  const loadUserUploadedFiles = async () => { 
    const { accessToken } = auth;
		axios(`${backendUrl}/api/v1/users/uploadedFiles`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				const uploadedFiles = response.data
        let selectOptions = uploadedFiles.rows.map((file: any) => {
          return {name:file.metadata.name, IPFSHash: file.ipfs_pin_hash}
        })
        setUserUploadedFiles(selectOptions)
			})
			.catch(window.alert);
  };
  
  const assignFilesToGroup = async (contractAddress: string) => {
    try {
      const response = await axios({
        method: "post",
        url: `${backendUrl}/api/v1/policies/add-files-to-group?groupContractAddress=${contractAddress}`,
        data: selectedIPFSFiles,
        headers: { 
          Authorization: `Bearer ${auth.accessToken}`
        },
      })
      if(response.data) {
        fetchSharedFiles(contractAddress)
        return response.data;
      }        
    } catch(error) {
      console.log(error)
    } 

  };

  return (
    <div className='scrollable-page'>
      <ToastContainer autoClose={3000}/>
      <h3>Select Research Assets:</h3>
        <Dropzone onFilesSelected={handleFilesSelected} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleIPFSUpload}>Upload Files to IPFS</Button>
        </div>
      <h2>Groups</h2>
      <ul>
      
        {groups.map((group) => (
          <li key={group.contractAddress}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ flex: 1, marginRight: '10px' }}>
              <button onClick={() => {
              setSelectedGroup(group);
              fetchSharedFiles(group.contractAddress);
            }}>{group.name}-{group.contractAddress}</button>
            </div> 
            <div style={{ flex: 1 }}>
                      <FileSelect
                        files={userUploadedFiles}
                        onSelect={handleIPFSFileSelection}
                      />
            </div>
            <div style={{ flex: 1 }}>
            <Button variant="contained" onClick={() => {
              assignFilesToGroup(group.contractAddress)
            }}>Share</Button>
            </div>
            
          </div>
        </li>   
      ))}
        
      </ul>
      
      {selectedIPFSFiles.length > 0 && (
        <div>
          <h2>Selected IPFS files:</h2>
            <ul>
              {selectedIPFSFiles.map((file, index) => (
                <li key={index}>
                  {file.name} - {file.IPFSHash}
                </li>
              ))}
            </ul>
        </div>
      )}
      
      {selectedGroup && (
        <div>
          <h2>Shared Files in {selectedGroup.name}</h2>
            <FileList data={sharedFiles} />
        </div>
      )}
      </div>
  );
};

export class GroupListWrapper extends ReactWidget {
    constructor() {
      super();
      this.addClass('jp-react-widget');
    }
  
    render(): JSX.Element {
      return <GroupListComponent />;
    }
  }
  