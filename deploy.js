// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
require("dotenv").config();

let INITIAL_STRING = "Hi There!";

const provider = new HDWalletProvider(
  process.env.ACC_MNEMONIC,
  process.env.NETWORK_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(accounts[0]);

  const result  = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });

  console.log(result.options.address);

  provider.engine.stop()

};
deploy();
