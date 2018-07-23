import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),
  '0xf914ce22879090b28ecf510137152f31c232b7de')

export default instance
