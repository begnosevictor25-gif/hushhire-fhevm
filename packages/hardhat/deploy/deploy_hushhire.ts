import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("\n🚀 Deploying HushHire contract...");
  console.log("Deployer address:", deployer);

  const deployment = await deploy("HushHire", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log("✅ HushHire deployed to:", deployment.address);
  console.log("Transaction hash:", deployment.transactionHash);
  
  // Log candidate information
  console.log("\n📋 Contract initialized with 5 candidates:");
  console.log("0: Alice Chen - Senior Full-Stack Developer - $8,000/month");
  console.log("1: Bob Martinez - DevOps Engineer - $7,500/month");
  console.log("2: Carol Wang - Product Designer - $6,500/month");
  console.log("3: David Kim - Machine Learning Engineer - $9,500/month");
  console.log("4: Emma Johnson - Frontend Developer - $7,000/month");
};

export default func;
func.tags = ["HushHire"];

