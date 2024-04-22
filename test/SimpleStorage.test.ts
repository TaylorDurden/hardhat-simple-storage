import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorageTests", function () {
  async function deploySimpleStorageFixture() {
    const contractFactory = (await ethers.getContractFactory(
      "SimpleStorage",
    )) as SimpleStorage__factory;
    const simpleStorage = await contractFactory.deploy();
    return { simpleStorage };
  }

  describe("Deployment", function () {
    it("retrieve function should return 0", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);
      expect(await simpleStorage.retrieve()).to.equal(0);
    });
    it("retrieve function should return 7 after store value 7", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);
      await simpleStorage.store("7");
      expect(await simpleStorage.retrieve()).to.equal(7);
    });
    it("Should add a person and retrieve their favorite number", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);
      const name = "Alice";
      const favoriteNumber = 7;
      const transactionResponse = await simpleStorage.addPerson(
        name,
        favoriteNumber,
      );
      await transactionResponse.wait(1);
      // Verify the person was added to the people array
      const peopleLength = await simpleStorage.peopleLength();
      expect(peopleLength).to.equal(1);

      // Verify the mapping was updated
      expect(await simpleStorage.nameToFavoriteNumber(name)).to.equal(
        favoriteNumber,
      );

      // Verify the person's data in the people array
      const person = await simpleStorage.people(0);
      expect(person.favoriteNumber).to.equal(favoriteNumber);
      expect(person.name).to.equal(name);
    });
    // it("addPerson function should result 1 count nameToFavoriteNumber", async function () {
    //   const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);
    //   await simpleStorage.addPerson("taylor", "888");
    //   console.log(
    //     `simpleStorage.nameToFavoriteNumber: ${simpleStorage.nameToFavoriteNumber}`,
    //   );
    //   expect(simpleStorage.nameToFavoriteNumber.length).to.equal(1);
    //   expect(simpleStorage.nameToFavoriteNumber[0].name).to.equal("taylor");
    //   expect(simpleStorage.nameToFavoriteNumber[0].favoriteNumber).to.equal(
    //     888,
    //   );
    // });
  });
});
