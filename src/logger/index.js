import axios from "axios";


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

export default log;
