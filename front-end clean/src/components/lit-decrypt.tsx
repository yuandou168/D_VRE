import * as LitJsSdk from "@lit-protocol/lit-node-client";


const decryptFile = async (fileToDecrypt, fileName) => {
    try {
      alert(process.env.PUBLIC_GATEWAY_URL)
      // First we fetch the file from IPFS using the CID and our Gateway URL, then turn it into a blob
      const fileRes = await fetch(`https://violet-wrong-beetle-984.mypinata.cloud/ipfs/${fileToDecrypt}?filename=${fileName}`)
      console.log(fileRes, "fileRes")
      const file = await fileRes.blob()
      // We recreated the litNodeClient and the authSig
      const litNodeClient = new LitJsSdk.LitNodeClient({
        litNetwork: 'cayenne',
      });
      await litNodeClient.connect();
      // const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'ethereum' });

      const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: 'ethereum'
      });
      // Then we simpyl extract the file and metadata from the zip
      // We could do more with this, like try to display it in the app UI if we wanted to
      const result = await LitJsSdk.decryptZipFileWithMetadata({
        file: file,
        litNodeClient: litNodeClient,
        authSig: authSig,
      })

      
      if(result) {
        const blob = new Blob([result.decryptedFile], { type: 'application/octet-stream' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = result.metadata.name; // Use the metadata to get the file name and type

        // Append the link to the DOM and trigger the click event
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Clean up after the download
        document.body.removeChild(downloadLink);
      }
    } catch (error) {
      alert("Trouble decrypting file")
      console.log(error)
    }
}

export default decryptFile;