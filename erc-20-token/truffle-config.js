require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
	networks: {
		development: {
			host: '127.0.0.1',
			port: '8545',
			network_id: '*',
		},
		ropsten: {
			provider: function () {
				return new HDWalletProvider(
					process.env.BLOCKCHAIN_PRIVATE_KEY,
					`https://ropsten.infura.io/v3/${process.env.INFURA_ID}`
				);
			},
			network_id: 3,
			gas: 4000000,
			confirmations: 2,
		},
	},
	compilers: {
		solc: {
			// version: '0.6.12',
			settings: {
				optimizer: {
					enabled: true,
					runs: 1,
				},
				evmVersion: 'istanbul',
			},
		},
	},
};
