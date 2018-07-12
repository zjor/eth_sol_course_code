const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const provider = ganache.provider();
const web3 = new Web3(provider)
const { interface, bytecode } = require('../compile')

let accounts;
let contract;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts()
	contract = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode })
		.send({ from: accounts[0], gas: '1000000' })
	contract.setProvider(provider)
})

describe('Lottery', () => {

	it('deploys a contract', () => {
		assert.ok(contract.options.address)
	})

	it('allows one account to enter', async () => {
		await contract.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei("0.02", "ether")
		})
		const players = await contract.methods.getPlayers().call({ from: accounts[0] })
		assert.equal(accounts[0], players[0])
  	})

  	// it('updates message', async () => {
  	// 	const tx = await contract.methods.setMessage('bye').send({ from: accounts[0] })
	  //   const message = await contract.methods.message().call()
	  //   assert.equal(message, 'bye')
  	// })
})