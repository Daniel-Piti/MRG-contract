import Marriage from '../abis/marriage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';


class App extends Component {
 
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    //connect to metamask
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Non-ETH browser detected')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    //Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    //Network ID

    const networkId = await web3.eth.net.getId()
    const networkData = Marriage.networks[networkId]
    if(networkData){
      const marriage = new web3.eth.Contract(Marriage.abi, networkData.address)
      this.setState({marriage})
    }
    else{
      window.alert('Marriage contract bot deployed to detected network.')
    }
    this.setState({loading:false})
  }
 
  //Upload File
  addWedding = async (name1, name2, link1, link2) => {
    console.log(name1, name2, link1, link2);
    await this.state.marriage.methods.addWedding(name1, name2, link1, link2).send({from: this.state.account})
    const id = await this.state.marriage.methods.getNextId().call()
    return id - 1
  }

  getNextId = async () => {
    const nextId = await this.state.marriage.methods.getNextId().call()
    console.log(nextId)
    return nextId
  }

  getWedding = async (id) => {
    const {0: name1, 1: name2, 2: link1, 3: link2, 4: wedding_address} = await this.state.marriage.methods.getWedding(id).call()
    return [name1, name2, link1, link2, wedding_address]
  }

  divorce = async (id) => {
    console.log(id)
    const check = await this.state.marriage.methods.checkIdExists(id).call()
    if(check){
      await this.state.marriage.methods.divorce(id).send({from: this.state.account})
      return true
    }
    return false
  }

  //Set states
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      marriage: null,
      loading: true
    }

    //Bind functions
  }

  render() {
    return (
      <div> 
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              addWedding = {this.addWedding}
              getNextId  = {this.getNextId}
              getWedding = {this.getWedding}
              divorce    = {this.divorce}
            />
        }
      </div>
    );
  }
}

export default App;