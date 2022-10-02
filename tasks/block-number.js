//we'll create tasks in this folder that will show up in yarn hardhat command
//purpose of this task: get the block number of wathever blockchain that we are working with
// https://hardhat.org/hardhat-runner/docs/advanced/create-task seguir o exemplo se precisar

const { task } = require("hardhat/config")

task("block-number", "Prints the current block number").setAction(
    //we can add parameters to the task; and set action to the task, which defines what the task should actually do. We're just gonna do setAction() (do que percebi)
    async (taskArgs, hre) => {
        //this is a Javascript Arrow Function.
        //In js we can define functions without using the function keyword. This is another way to define a function. Slight changes, but for the purpose of this course it's the same as a function.
        //for example, in our verify function in deploy.js(): we have, "async function verify(contractAddress, args) {}"
        //this is exactly the same as if we defined it as a variable, like: "const verify = async (contractAddress, args) => {}"
        //or of course, without declaring the variable we have: "async (contractAddress, args) => {}"
        //which is the syntax that we're doing here
        //this function we using "async (taskArgs, hre) => {" is known as "Anonymous Function" in javascript, because it doesn't have a name.
        //
        //when we run tasks, we automatically pass our anonymous functions the taskArgs (task arguments), but we also pass 'hre' (hardhat runtime environment)
        //hre is basicaly the same as the "hardhat" that we use in "const {ethers} = require("hardhat")" <-
        //So, this 'hre' can access a lot of the same packages that the hardhat package can.

        const blockNumber = await hre.ethers.provider.getBlockNumber() //just like how we can import ethers from hardhat. And then in our ethers package there's a number of functions we can use.
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}

// Now, this task doesnt show immediately in the tasks when we do yarn hardhat
// First, we need to add it as a require to our hardhat.config.js, and also create a module.exports.

// And now, we can run yarn hardhat block-number --network goerli, and it works!

// Scripts and tasks both can basically do the same thing, both can interact with contracts, both can deploy smart contracts, they can pretty much do everything.
// Patrick prefers scripts as a general rule of thumb because he doesnt always think adding a special thing from the command line, makes sense.
// So he prefers scripts but we'll see a ton of tasks and examples out there aswell. Tasks are really nice for specific use cases but for the most part we're
// pretty much gonna use exclusively scripts, but its good to know what a task looks like and how to use it.
// He thinks tasks are better for plugins, and scripts are better for our own local development environment, but we can do absolutely everything with tasks aswell.
