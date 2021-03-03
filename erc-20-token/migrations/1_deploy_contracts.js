const CalcToken = artifacts.require('CalcToken');

module.exports = function (deployer) {
	deployer.deploy(CalcToken, 'TOKEN1', 'T1', 18);
	deployer.deploy(CalcToken, 'TOKEN2', 'T2', 18);
};
