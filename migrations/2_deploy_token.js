const iToken = artifacts.require("iToken");

module.exports = function (deployer) {
    const _name = "iToken";
    const _symbol = "ITK";

  deployer.deploy(iToken,_name, _symbol);
};
