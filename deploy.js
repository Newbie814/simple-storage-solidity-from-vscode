const ethers = require('ethers');
// const solc = require('solc');
const fs = require('fs-extra');
require('dotenv').config();

// const ganache = require('ganache');

// const provider = new ethers.providers.Web3Provider(ganache.provider());

async function main() {
  //http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');
  const binary = fs.readFileSync(
    './SimpleStorage_sol_SimpleStorage.bin',
    'utf8'
  );

  // const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  // console.log('Deploying contract...');

  // const contract = await contractFactory.deploy();

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log('Deploying, please wait...');
  const contract = await contractFactory.deploy();
  const transactionReceipt = await contract.deployTransaction.wait(1);
  console.log('deployment transaction:');
  console.log(contract.deployTransaction);
  console.log('transaction receipt:');
  console.log(transactionReceipt);
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// setup movie night

// cook popcorn
// Pour drinks
// Start Movie
//
