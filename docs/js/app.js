App = {
  loading: false,
  contracts: {},  
  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    //var Web3 = require('web3')  ;  
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {

      //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        App.acc=await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = App.acc[0];  
    //window.alert(App.account);
   
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const Sample = await $.getJSON('Crowd.json')
    App.contracts.Sample = TruffleContract(Sample)
    App.contracts.Sample.setProvider(App.web3Provider)
    // Hydrate the smart contract with values from the blockchain
    App.crowd = await App.contracts.Sample.deployed();
  },
  render: async () => {


   
  },
  displaydonatepage:async () =>{
    $("#displaybalance").hide()
      $("#displaydonate").show();
  },
  displaybalancepage :async () =>{
    $("#displaydonate").hide();
    var b=await App.crowd.balance();
    c=(b/1000000000000000000)
    $("#disbalance").html(c.toString())
    $("#displaybalance").show();
  },
  donateFund :async () =>{
    
    var amount=$("#amount").val();
    var amountinwei=amount*1000000000000000000;
    await App.crowd.donateFunds({from:App.account,value:amountinwei})
  },
  donate :async () =>{
    await App.load();
    var amount=$("#amount").val();
    var amountinwei=amount*1000000000000000000;
    await App.crowd.donate({from:App.account,value:amountinwei})
  },
  getBalance : async ()=>{
    await App.load();
    var b=await App.crowd.total();
    c=(b/1000000000000000000)
    $("#dispbalance").html(c.toString())
  },
  register :async()=>{
    await App.load();
    await App.crowd.register({from:App.account})
  },
  distribute :async()=>{
    await App.load();
    await App.crowd.distribute({from:App.account});
  }
};




// A $( document ).ready() block.
$( document ).ready(function() {
  App.load();
});



