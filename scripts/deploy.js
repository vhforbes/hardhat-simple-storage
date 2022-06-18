const { ethers, run, network } = require("hardhat")
const hre = require("hardhat")

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying...")

  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed to: ${simpleStorage.address}`)

  if (network.config.chainId === 4) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const transctionResponse = await simpleStorage.store("7")
  await transctionResponse.wait(1)
  const currentValue = await simpleStorage.retrieve()
  console.log(currentValue.toString())
}

const verify = async (contractAddress, args) => {
  console.log("Verifyng contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
