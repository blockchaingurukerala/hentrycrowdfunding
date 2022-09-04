var Migrations = artifacts.require("./Crowd.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
