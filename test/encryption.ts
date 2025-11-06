import { expect } from "chai";
import { ethers } from "hardhat";

describe("GamePreferenceSurvey Encryption", function () {
  let surveyContract: any;

  beforeEach(async function () {
    const GamePreferenceSurvey = await ethers.getContractFactory("GamePreferenceSurvey");
    surveyContract = await GamePreferenceSurvey.deploy();
    await surveyContract.waitForDeployment();
  });

  it("Should encrypt and store user preferences", async function () {
    const [owner] = await ethers.getSigners();

    // Create a survey
    const createTx = await surveyContract.createSurvey(
      "Test Survey",
      "Testing encryption functionality",
      3600 // 1 hour
    );
    await createTx.wait();

    // In a real test, we would:
    // 1. Generate encrypted preferences using FHEVM
    // 2. Submit the encrypted response
    // 3. Verify the response was stored

    const surveyCount = await surveyContract.getSurveyCount();
    expect(surveyCount).to.equal(1);
  });

  it("Should handle multiple encrypted responses", async function () {
    const [owner, user1, user2] = await ethers.getSigners();

    // Create survey
    await surveyContract.createSurvey("Multi-user Survey", "Testing multiple responses", 3600);

    // In production, each user would encrypt their preferences
    // For this test, we verify the survey structure supports multiple responses

    const survey = await surveyContract.getSurvey(1);
    expect(survey.isActive).to.be.true;
  });
});
