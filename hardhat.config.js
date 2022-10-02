require("@nomicfoundation/hardhat-toolbox") //o patrick afinal não tem este. como é que o adicionei?
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number") //in order for us to import the tasks/block-number file we have to have a module.exports in the tasks/block-number file
require("hardhat-gas-reporter")
require("solidity-coverage")
// require("@nomiclabs/hardhat-waffle") hardhat não estava a funcionar porque não tinha isto instalado. pesquisar no google @nomiclabs/hardhat-waffle e vai aparecer logo o link com o comando para instalar. o patrick de repente já tinha isto no require e devo-me ter esquecido de instalar, mas no final mesmo do curso ele disse que isto foi a única coisa que não vimos o que era por isso não sei onde é que ele instalou.. quando precisar instalo (é um package para fazer testes).

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli" // || são para o hardhat não dar bug se não tivermos alguma env variable specified em algum momento. Pelo que percebi se não estivermos a usar goerli por exemplo e não tivermos goerli definida no .env isso dá problemas com hardhat. Assim estão sempre definidas mesmo que não usemos. Vamos ver isto a ser feito em muitos códigos.
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "0xkey"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "0xkey"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            //just like a testnet but much quicker than a real testnet
            //ctrl c in the terminal of the node to stop the node, then yarn hardhat node again, if we need to stop the node. (a node pode ficar aberta dum dia pro outro, right?. A hardhat normal não. É a distinção que fiquei a perceber)
            //we runed 'yarn hardhat node' before setting this localhost
            url: "http://127.0.0.1:8545",
            // accounts: hardhat automatically sets here the private keys (that it shows in yarn hardhat node)
            chainId: 31337, //we got this in deploy.js() when we imported network and used console.log(network.config) to see the network configs of hardhat. Now we knew by memory. And it shares the same chainId from hardhat normal network.
        },
    },
    solidity: "0.8.8",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY, //API key obtida na secção de 'API key' do etherscan.io, tenho que dar login, já tenho conta.
    },
    gasReporter: {
        enabled: false, //patrick normally disables when he doesn't wanna work with the gas
        outputFile: "gas-report.txt", //to output the gas table to a file
        noColors: true,
        currency: "USD", //best adiction we can do in here -> to know the cost of each function in usd
        coinmarketcap: COINMARKETCAP_API_KEY, //to have a currency here (USD), we actually need to get an api key from coinmarketcap
        //token: "MATIC",  //to use if we were deploying to matic for example. reflects the gas costs in matic, and then matic to usd
    },
}
