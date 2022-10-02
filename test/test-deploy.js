// hardhat testing works with the 'mocha' framework, its a js based framework for running tests

const { ethers } = require("hardhat")
const { expect, assert } = require("chai") // we instaled chai automatically when we downloaded the basic packages for hardhat

//describe("SimpleStorage", () => {}) both this syntax and the one below that we're using are basicaly the same. there are some differences and the one we using is best practise, but we might see this syntax in tests aswell.
describe("SimpleStorage", function () {
    //inside each of our describe blocks we're gonna have a beforeEach() and a bunch of it()s.
    //It() is where we actually write the code for our tests, and beforeEach() is gonna be some code that tells us what to do before each of this it()

    let simpleStorageFactory, simpleStorage
    //the same as //let simpleStorageFactory //let simpleStorage in different lines, easier if you have a lot of variables
    //we declare them here so we can use them in our it()s, if we initialized inside beforeEach() it would only be inside beforeEach() scope.

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // we can use either'assert'
        // or 'expect'
        // for this we have to import a package called 'chai'
        // Patrick is a big fan of using 'assert' as much as possible because the syntax makes a little more sense, but there will be scenarios where we need to use 'expect'.
        // assert has a lot of functions built in that we can use

        assert.equal(currentValue.toString(), expectedValue)
        //expect(currentValue.toString()).to.equal(expectedValue)

        //another way we'll see this tests written is with the 'expect' keyword, both of this (lines above) are the same and its sort of up to us which one we wanna use.
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()

        assert.equal(currentValue.toString(), expectedValue)
    })
})

//if I want to just do one of the tests, I can use yarn hardhat test --grep store (store is an example, we must choose a keyword that is in the test we want to run and not in the other)
//                                       other way is to type it.only() on the it() we want, and yarn hardhat test normally and it will only test that one.
