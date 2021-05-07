import axios from 'axios';
import { Observable } from 'rxjs';
import CryptoJS from 'crypto-js';
const apipath = `https://cdn-api.co-vin.in/api`;
const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin`
const zurl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict`
const secret = "U2FsdGVkX19mD56KTNfQsZgXJMwOG7u/6tuj0Qvil1LEjx783oxHXGUTDWYm+XMYVGXPeu+a24sl5ndEKcLTUQ==";
export default class CowinApi {
    req(endpoint){
        return new Promise((resolve, reject)=>{
            axios.get(endpoint).then(function (response) {
                // handle success
                return resolve(response.data)
              })
              .catch(function (error) {
                // handle error
                return reject(error)
              })
        })
    }
    init(zip, date){
        return new Observable(subscriber => {
            let req = this.req.bind(this);
            this.watcher = setInterval(()=>{
                req(`${url}?pincode=${zip}&date=${date}`).then(data=>{
                    subscriber.next(data);
                }).catch(err=>{
                    subscriber.error(err);
                });
            }, 500)
          });
    }
    initDist(dist, date){
      return new Observable(subscriber => {
          let req = this.req.bind(this);
          this.watcher = setInterval(()=>{
              req(`${zurl}?district_id=${dist}&date=${date}`).then(data=>{
                  subscriber.next(data);
              }).catch(err=>{
                  subscriber.error(err);
              });
          }, 500)
        });
  }
    clearWatch(){
        console.log(this);
        clearInterval(this.watcher);
    }
    async generateOtp(mobile){
        return await axios.post('https://cdn-api.co-vin.in/api/v2/auth/generateMobileOTP', {
            mobile: mobile,
            secret
          })
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            throw error
          });
    }
    async verifyOtp(otp, txnId){
      let otpHasKey = CryptoJS.SHA256(otp).toString(CryptoJS.enc.Hex);
      console.log(otpHasKey);
        return await axios
          .post("https://cdn-api.co-vin.in/api/v2/auth/validateMobileOtp", {
            otp: otpHasKey,
            txnId: txnId,
          })
          .then((res) => {
            console.log(res);
            return res.data;
          })
          .catch((error) => console.log(error));
    }
    async getBenefeciaries(token){
      console.log(token);
      return await axios.get('https://cdn-api.co-vin.in/api/v2/appointment/beneficiaries',{headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }}).then(response=>{
        return response.data.beneficiaries
      }).catch(err=>{
        throw err
      })
    }

    trackAuth(token){
      return new Observable(subscriber => {
        let req = this.getBenefeciaries.bind(this);
        this.watcher = setInterval(()=>{
            req(token).then(data=>{
                subscriber.next(data);
            }).catch(err=>{
                subscriber.error(err);
            });
        }, 3000 )
      });
    }
    async getStates(){
      return axios.get(`${apipath}/v2/admin/location/states`).then(response=>{
        return response.data;
      }).catch(err=>{
        throw err
      })
    }
    async getDistricts(stateId){
      return axios.get(`${apipath}/v2/admin/location/districts/${stateId}`).then(response=>{
        return response.data.districts;
      }).catch(err=>{
        throw err
      })
    }
    
}
