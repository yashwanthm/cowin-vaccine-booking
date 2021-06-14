import axios from "axios";
import config from '../models/config'

// const vaxlogkey = `ZWh8jnnyrX5tBHQwlVJL23Q8IojEfQRQ9uz1qGmf`;
// let url = 'https://prya4emvub.execute-api.us-east-1.amazonaws.com/api';
const vaxlogkey = config.key
let url = config.url + '/log';
const log = (data) => {
  let opts = {
    headers: {
      'x-api-key': vaxlogkey,
    },
  };
  axios.post(url, data, opts).then(response=>{
  }).catch(err=>{
    console.info(err);
  })
}

// axios.options(url).then(response=>{
//   console.log('post', response);
// }).catch(err=>{
//   console.info(err);
// })
// log({
//   location: "testdistrict"
// })
export default log;
