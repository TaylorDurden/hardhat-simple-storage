const { ethers, run, network } = require("hardhat");

async function main() {
  const simpleStorageContractFactory =
    await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await simpleStorageContractFactory.deploy();
  console.log(`Deployed contract to: ${await simpleStorage.getAddress()}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
