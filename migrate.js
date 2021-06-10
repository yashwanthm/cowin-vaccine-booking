const { default: axios } = require('axios');
const https = require('https');

const vaxlogkey = `ZWh8jnnyrX5tBHQwlVJL23Q8IojEfQRQ9uz1qGmf`;
let url = 'https://prya4emvub.execute-api.us-east-1.amazonaws.com/api';
const log = (data) => {
  let opts = {
    headers: {
      'x-api-key': vaxlogkey,
    },
  };
  axios.post(url, data, opts).then(response=>{
    console.log('post', response);
  }).catch(err=>{
    console.info(err);
  })
}

let logItem = {
  type: String,
  count: Number,
  date: Date,
  vaccine: String,
  location: String,
  centerName: String,
  beneficiaries: Array,
  build: String,
};

let headers = {
    "X-Rollbar-Access-Token": "143e39ee71ce45aeb6af216d334e1cc0"
}

const transRbItem = (item) => {
    let obj = {};

    return obj;
}
axios.get('https://api.rollbar.com/api/1/items', {headers})
  .then(response => {
      console.log('data', response.data.page, response.data.total_count);
      console.log(JSON.stringify(response.data.result.items[0]))
  }).catch(err=>{
      console.log(err);
  })