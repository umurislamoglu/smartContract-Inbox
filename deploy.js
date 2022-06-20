// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require('./compile');
require("dotenv").config();

let INITIAL_STRING = "Hi There!";

const provider = new HDWalletProvider(
  process.env.ACC_MNEMONIC,
  process.env.NETWORK_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result  = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: [INITIAL_STRING],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });

  provider.engine.stop()
};
deploy();
