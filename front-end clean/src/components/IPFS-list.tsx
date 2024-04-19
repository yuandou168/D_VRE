import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
// import CryptoJS from 'crypto-js';
// import axios from 'axios';
// import fileDownload from 'js-file-download';
import decryptFile from './lit-decrypt';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

interface FileItem {
  IPFSHash: string;
  name: string;
  type: string;
}

interface FileListProps {
  data: FileItem[];
}

const ITEMS_PER_PAGE = 10; // Number of items per page

const FileList: React.FC<FileListProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const slicedData = data.slice(offset, offset + ITEMS_PER_PAGE);

  const handleFileView = (IPFSHash: string) => {
    const ipfsLink = `https://ipfs.io/ipfs/${IPFSHash}`;
    window.open(ipfsLink, '_blank');
  };
  console.log(handleFileView, "handleFileView")

  // const handleDownload = (url: string, name: string) => {
  //   axios
  //     .get(url, {
  //       responseType: 'blob',
  //     })
  //     .then((res) => {
  //       const encryptedBlob = res.data;
  //       const reader = new FileReader();
  
  //       reader.onload = () => {
  //         const decryptedData = CryptoJS.AES.decrypt(reader.result, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
  //         // Now 'decryptedData' contains the decrypted content
  //         fileDownload(encryptedBlob, name);
  //       };
  
  //       reader.readAsText(encryptedBlob);
  //     });
  // };
  // console.log(handleDownload, "handleDownload")

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>IPFSHash</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.IPFSHash}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => decryptFile(item.IPFSHash, item.name)}>
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => decryptFile(item.IPFSHash, item.name)}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={Math.ceil(data.length / ITEMS_PER_PAGE)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default FileList;
