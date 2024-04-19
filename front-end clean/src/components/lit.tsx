import * as LitJsSdk from "@lit-protocol/lit-node-client";
import Dropzone from './asset-select';
import {Button } from '@material-ui/core';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const LS_KEY = 'login-with-metamask:auth';

const ls = window.localStorage.getItem(LS_KEY);
const auth = ls && JSON.parse(ls);

// Define the URL of your local backend server
const backendUrl = 'http://localhost:3000';

function EncryptFileAndUpload() {
    // const [file, setFile] = useState("");
    // const [cid, setCid] = useState("");
    const [uploading, setUploading] = useState(false);
    // add a new state for the cid to decrypt
    // const [decryptionCid, setDecryptionCid] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFilesSelected = (files: File[]) => {
        setSelectedFiles(files);
      };

    const handleIPFSUpload = async (event: React.FormEvent) => {
        event.preventDefault();
      
        const formData = new FormData();
        // Append the file(s)
          
     try {

            setUploading(true); 
            const litNodeClient = new LitJsSdk.LitNodeClient({
            litNetwork: 'cayenne',
            });
            // then get the authSig
            await litNodeClient.connect();

            const accs = [
                {
                  contractAddress: '',
                  standardContractType: '',
                  chain: 'ethereum',
                  method: 'eth_getBalance',
                  parameters: [':userAddress', 'latest'],
                  returnValueTest: {
                    comparator: '>=',
                    value: '0',
                  },
                },
              ];

              const authSig = await LitJsSdk.checkAndSignAuthMessage({
                chain: 'ethereum'
                });

                for (const selectedFile of selectedFiles) {
                     // Then we use our access controls and authSig to encrypt the file and zip it up with the metadata
                let encryptedZip = await LitJsSdk.encryptFileAndZipWithMetadata({
                    accessControlConditions: accs,
                    authSig,
                    chain: 'ethereum',
                    file: selectedFile,
                    litNodeClient: litNodeClient,
                    readme: "Registered user can decrypt this file"
                });

                let encryptedBlob = new Blob([encryptedZip], { type: 'text/plain' })
                let encryptedFile = new File([encryptedBlob], `${selectedFile.name}`)

                formData.append(`files`, encryptedFile, selectedFile.name);
            }

            const response = await axios({
              method: "post",
              url: `${backendUrl}/api/v1/users/asset-upload`,
              data: formData,
              headers: { 
                Authorization: `Bearer ${auth.accessToken}`,
                "Content-Type": "multipart/form-data" 
              },
            })
            if(response.data) {
            setUploading(false);
            toast.success('Files uploaded to IPFS successfully');
            console.log(uploading)
            return response.data;
            }        
          }  catch (e) {
            console.log(e);
            setUploading(false);
            toast.error('Error uploading files to IPFS');
          }
      };

  return (
    <div>
      <ToastContainer autoClose={3000}/>
      <h3>Upload Assets:</h3>
        <Dropzone onFilesSelected={handleFilesSelected} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleIPFSUpload}>Upload Files to IPFS</Button>
        </div>
    </div>
  );
}



export default EncryptFileAndUpload;