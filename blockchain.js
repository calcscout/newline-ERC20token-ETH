const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');
console.log('🚀 ~ file: blockchain.js ~ line 8 ~ publicKey', publicKey);
console.log('🚀 ~ file: blockchain.js ~ line 10 ~ privateKey', privateKey);

class Block {
	constructor(timestamp, transactions, previousHash = '') {
		//this.index = index;
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		return SHA256(
			//this.index +
			this.previousHash +
				this.timestamp +
				JSON.stringify(this.transactions) +
				this.nonce
		).toString();
	}

	mineBlock(difficulty) {
		while (
			this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
		) {
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log('Block mined', this.hash);
	}

	hasValidTransactions() {
		for (const tx of this.transactions) {
			if (!tx.isValid()) {
				return false;
			}
		}
		return true;
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 100;
	}

	createGenesisBlock() {
		return new Block(0, '01/01/2020', 'Genesis Block', '0');
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (!currentBlock.hasValidTransactions()) {
				return false;
			}
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}
			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}

		return true;
	}

	createTransaction(transaction) {
		if (!transaction.fromAddress || !transaction.toAddress) {
			throw new Error('Transaction must include from and to address');
		}
		if (!transaction.isValid()) {
			throw new Error(
				'Cannot add a transaction which is not valid to the Blockchain'
			);
		}
		this.pendingTransactions.push(transaction);
	}

	minePendingTransactions(miningRewardAddress) {
		const rewardTx = new Transaction(
			null,
			miningRewardAddress,
			this.miningReward
		);
		this.pendingTransactions.push(rewardTx);

		let block = new Block(Date.now(), this.pendingTransactions);
		block.mineBlock(this.difficulty);

		console.log('Block successfully mined');

		this.chain.push(block);

		this.pendingTransactions = [];
	}

	getBalanceOfAddress(address) {
		let balance = 0;
		for (const block of this.chain) {
			for (const transaction of block.transactions) {
				if (transaction.fromAddress === address) {
					balance -= transaction.amount;
				}
				if (transaction.toAddress === address) {
					balance += transaction.amount;
				}
			}
		}
		return balance;
	}
}

class Transaction {
	constructor(fromAddress, toAddress, amount) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}
	calculateHash() {
		return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
	}
	signTransaction(signingKey) {
		if (signingKey.getPublic('hex') !== this.fromAddress) {
			throw new Error('You cannot sign transaction for other wallets');
		}
		const hashTx = this.calculateHash();
		const sig = signingKey.sign(hashTx, 'base64');
		this.signature = sig.toDER('hex');
	}
	isValid() {
		if (this.fromAddress === null) return false;

		if (!this.signature || this.signature.length === 0) {
			throw new Error('No signature in this transaction');
		}

		const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
		return publicKey.verify(this.calculateHash(), this.signature);
	}
}

// let simpleBlockchain = new Blockchain();
// simpleBlockchain.addBlock(new Block(1, '22/01/2020', { amount: 1 }));
// simpleBlockchain.addBlock(new Block(1, '23/01/2020', { amount: 3 }));
// console.log(simpleBlockchain.isChainValid());
// console.log(simpleBlockchain.getLatestBlock());

// let proofOfWorkBlockchain = new Blockchain();
// proofOfWorkBlockchain.addBlock(new Block(1, '22/01/2020', { amount: 1 }));
// proofOfWorkBlockchain.addBlock(new Block(1, '23/01/2020', { amount: 3 }));

// console.log(proofOfWorkBlockchain.getLatestBlock().nonce);
// console.log(proofOfWorkBlockchain.getLatestBlock().hash);
// console.log(proofOfWorkBlockchain.getLatestBlock().previousHash);

//testing

const myKey = ec.genKeyPair(); // Generates a public and private key pair
const myWalletAddress = myKey.getPublic('hex'); // Your public key is stored here (account for the blockchain)

const secondKey = ec.genKeyPair(); // Generates another public and private key pair
const secondWalletAddress = secondKey.getPublic('hex'); // Creates another public and private key pair

let sampleBlockchain = new Blockchain(); // Creates a new blockchain
const tx1 = new Transaction(myWalletAddress, secondWalletAddress, 10); // put another public key in the empty quotes //
tx1.signTransaction(myKey);
sampleBlockchain.createTransaction(tx1);

sampleBlockchain.minePendingTransactions(myWalletAddress); // Since you're one of the few members in your blockchain, you can be the miner as well
console.log(
	'Balance of my wallet:',
	sampleBlockchain.getBalanceOfAddress(myWalletAddress)
);
console.log(
	'Balance of second wallet:',
	sampleBlockchain.getBalanceOfAddress(secondWalletAddress)
);

console.log(sampleBlockchain);
