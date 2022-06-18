const { task } = require("hardhat/config")

task("block-number", "Prints Block Number").setAction(
  async (taskArgsm, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Block number ${blockNumber}`)
  }
)
