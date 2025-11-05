import { task } from "hardhat/config";

task("deploy-survey", "Deploy GamePreferenceSurvey contract")
  .setAction(async (taskArgs, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const GamePreferenceSurvey = await hre.ethers.getContractFactory("GamePreferenceSurvey");
    const survey = await GamePreferenceSurvey.deploy();

    await survey.waitForDeployment();

    console.log("GamePreferenceSurvey deployed to:", await survey.getAddress());
  });
