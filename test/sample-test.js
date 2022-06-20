const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", () => {
  // Initializes in a outside scope
  let simpleStorageFactory, simpleStorage

  // Code run before all the "it's"
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favorite number of 0", async () => {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("Should update when call store", async () => {
    const expectedValue = "7"
    const transctionResponse = await simpleStorage.store(expectedValue)
    await transctionResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("Should add a person to the array", async () => {
    const expectedName = "Victor"
    const expectedNumber = "17"
    const transctionResponse = await simpleStorage.addPerson("Victor", "17")
    await transctionResponse.wait(1)
    const person = await simpleStorage.people("0")
    assert.equal(person.name, expectedName)
    assert.equal(person.favoriteNumber, expectedNumber)
  })
})
