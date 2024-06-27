### D-VRE: From a Jupyter-enabled Private Research Environment to Decentralized Collaborative Research Ecosystem

Today, scientific research is increasingly data-centric and compute-intensive, relying on data and models across distributed sources. However, it still faces challenges in the traditional cooperation mode, due to the high storage and computing cost, geo-location barriers, and local confidentiality regulations. The Jupyter environment has recently emerged and evolved as a vital virtual research environment for scientific computing, which researchers can use to scale computational analyses up to larger datasets and high-performance computing resources. Nevertheless, existing approaches lack robust support of a decentralized cooperation mode to unlock the full potential of decentralized collaborative scientific research, e.g., seamlessly secure data sharing. In this work, we change the basic structure and legacy norms of current research environments via the seamless integration of Jupyter with Ethereum blockchain capabilities. As such, it creates a <u>D</u>ecentralized <u>V</u>irtual <u>R</u>esearch <u>E</u>nvironment (D-VRE) from private computational notebooks to decentralized collaborative research ecosystem. We propose a novel architecture for the D-VRE and prototype some essential D-VRE elements for enabling secure data sharing with decentralized identity, user-centric agreement-making, membership, and research asset management. To validate our method, we conducted an experimental study to test all functionalities of D-VRE smart contracts and their gas consumption. In addition, we deployed the D-VRE prototype on a test net of the Ethereum blockchain for demonstration. The feedback from the studies showcases the current prototype's usability, ease of use, and potential and suggests further improvements. 

### Folder structure
`back-end clean`: the cleaned back-end code of the D-VRE prototype

`front-end clean`: the cleaned front-end code of the D-VRE prototype

`front-end update`: the updated front-end code of the D-VRE prototype with further improvements


### Environment setup

#### install necessary software and dependencies in the back-end and front-end, respectively.
Go to the `back-end clean` and/or `front-end clean` folder, respectively, and install all necessary software and dependencies with `npm` or `yarn` with the `package.json`. More details please see the `README.md` in the folders. Note that the versions may conflicts in various platforms, so make sure the versions compatible. 

#### Deploy smart contracts to sepolia ETH testnet
`$ truffle migrate --network sepolia`

When the deployment has been successfully done, you can update the `.env` with the contract address of `PolicyManager` and `USER_METADATA_FACTORY`

#### configure credentials for blockchain network, IPFS gateway at the back-end folder 
* In the back-end, create an environment file named `.env` configure with your own credentials and contract addresses. 

```
ETHEREUM_NETWORK = "sepolia"    # Our blockchain network is Sepolia
INFURA_API_KEY = ""
SIGNER_PRIVATE_KEY_SECOND = ""  
SIGNER_PRIVATE_KEY = "" 

MNEMONIC = ""
PRIVATE_KEY = ""

POLICY_MANAGER=""
USER_METADATA_FACTORY = ""

PINATA_API_KEY=""
PINATA_SECRET_API_KEY=""

# JWT_SECRET="your_real_secret_here"

```

* In the front-end, create a local environment configuration file named `.env.local` with your own IPFS credentials.
```
PINATA_JWT=""
PUBLIC_GATEWAY_URL=""
```

#### start the services 
Use the terminal for the following steps:

* start the backend server
`$ node server.js`

* When the front-end extension is ready, use `jupyter lab` to start the JupyterLab environment.
`$ pip install mysampleextension`
`$ jupyter lab`

### Cite our work
Wang, Yuandou, Sheejan Tripathi, Siamak Farshidi, and Zhiming Zhao. "D-VRE: From a Jupyter-enabled Private Research Environment to Decentralized Cllaborative Research Ecosystem." arXiv preprint arXiv:2405.15392 (2024). 

```
@misc{wang2024dvrejupyterenabledprivateresearch,
      title={D-VRE: From a Jupyter-enabled Private Research Environment to Decentralized Collaborative Research Ecosystem}, 
      author={Yuandou Wang and Sheejan Tripathi and Siamak Farshidi and Zhiming Zhao},
      year={2024},
      eprint={2405.15392},
      archivePrefix={arXiv},
      primaryClass={cs.DC},
      url={https://arxiv.org/abs/2405.15392}, 
}
```
