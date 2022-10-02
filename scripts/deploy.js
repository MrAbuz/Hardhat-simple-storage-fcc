//imports
//async main
//call main

const { ethers, run, network } = require("hardhat") // 'run' package allows us to run any hardhat task
// we can get network configuration information like chainId by importing network

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage" //ao contrário de ethers, hardhat já sabe que temos simplestorage.sol compilado e consegue acedê-lo. Daí não adicionarmos abi, bin etc.
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log(`Deployed contract to: ${simpleStorage.address}`)

    //To verify the contract on etherscan, if we're on goerli testnet(bcuz in hh chain it would not work):
    //console.log(network.config) //we runed deploy.js in hardhat network with this line so we could see the hardhat network.config and see that the hardhat chain id is: 31337. To use this we had to import 'network'. It's actually not needed to run this, he just showed it to show how to see the network configs, but we didnt use any info from it.
    // 4 == 4 -> true
    // 4 == "4" -> true
    // 4 === "4" -> false, == is nearly the same as === but === requires that they must be the same type.
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        //had to import 'network' to use it.
        //on etherscan and all this block explorers, in the instant we deploy the contract they might not know about the contract, normaly it takes a few seconds. Its usually best practise to wait for a few blocks to be mined before we run the verification proccess.
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
        // [] is blank because we have no constructor in our solidity file
    }

    //Interact with the contract:
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    const transactionResponse = await simpleStorage.store("7")
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)
}

async function verify(contractAddress, args) {
    //função para verificar o contrato no etherscan
    //também podemos verificar manualmente através de uma expressão no terminal mas aqui vamos criar a função e fazê-lo de forma programática. No excel tenho um link com os passos de verificar no etherscan que inclui verificação manual, se quiser no futuro.
    //tive que adicionar secção no hardhat config antes, require, adicionar lá a api key, e antes adicionar key no .env etc.
    console.log("Verifying contract...")
    //'run' package -> we can run any task from hardhat using a run package. here we're running the hardhat verify task from etherscan that we can find at yarn hardhat (place to find the hardhat tasks) and its in the list.
    try {
        await run("verify:verify", {
            //1st parameter is the subtask. This second parameter that goes inside run (a seguir à virgula) is an object that contains the actual parameters:
            address: contractAddress,
            constructorArguments: args,
            //This code above this is enough, but often there's some errors that come up. One of the errors is that the contract has already been verified, and if so this await throws an error which we wanna avoid, because this would make the whole script end and not continue.
            //So we add a 'try catch' into this await, because we know that this error might happen. Outside of the await we add a try{} and below a catch.
        })
    } catch (e) {
        //this 'e' is gonna be any error that this sections throws. 'Try' the code above and 'catch' this error.
        //We're gonna do, if this message is already verified, then we're just gonna continue.
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
            //faz todo o sentido este código do try and catch, curti.
            //the reason we do this is if this errors our whole script would end and we want it to continue even if the verification doesn't work because it's not a big deal.
            //so 'try catch' works wonders in this situations.
        }
    }
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
