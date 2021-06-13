import axios from 'axios';
import { Observable } from 'rxjs';
import CryptoJS from 'crypto-js';
const apipath = `https://cdn-api.co-vin.in/api`;
// const testPath = 'https://api.demo.co-vin.in/api'

const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin`
const zurl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict`
const burl = `https://cdn-api.co-vin.in/api/v2/appointment/schedule`
const secret = "U2FsdGVkX1+z/4Nr9nta+2DrVJSv7KS6VoQUSQ1ZXYDx/CJUkWxFYG6P3iM/VW+6jLQ9RDQVzp/RcZ8kbT41xw==";
// const pollFreq = parseInt(localStorage.pollFreq) || 3250;
const pollFreq = parseInt(localStorage.pollFreq) || 45000;
export default class CowinApi {
  req(endpoint) {
    let headers = {};
    if (localStorage.token) {
      headers.authorization = `Bearer ${localStorage.token}`;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint, {headers})
        .then(function (response) {
          // handle success
          return resolve(response.data);
        })
        .catch(function (error) {
          // handle error
          return reject(error);
        });
    });
  }
  init(zip, date) {
    let headers = {};
    if (localStorage.token) {
      headers.authorization = `Bearer ${localStorage.token}`;
    }
    return new Observable((subscriber) => {
      let req = this.req.bind(this);
      let m = () => {
        let thisUrl = url;
        if(localStorage.token){
          thisUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin`
        }
        req(`${thisUrl}?pincode=${zip}&date=${date}`)
          .then((data) => {
            subscriber.next(data);
          })
          .catch((err) => {
            subscriber.error(err);
          });
      };
      m();
      this.watcher = setInterval(m, pollFreq);
    });
  }

  initS(zip, date) {
    return new Observable((subscriber) => {
      let req = this.req.bind(this);
      let thisUrl = `${apipath}/v2/appointment/sessions/public/findByPin?pincode=${zip}&date=${date}`;
      if(localStorage.token){
        thisUrl = `${apipath}/v2/appointment/sessions/findByPin?pincode=${zip}&date=${date}`
      }
      let m = () => {
        req(thisUrl)
          .then((data) => {
            subscriber.next(data);
          })
          .catch((err) => {
            subscriber.error(err);
          });
      };
      m();
      this.watcher = setInterval(m, pollFreq);
    });
  }

  initDist(dist, date) {
    return new Observable((subscriber) => {
      let req = this.req.bind(this);
      let thisZurl = zurl;
      if(localStorage.token){
        thisZurl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict`
      }
      let m = () => {
        req(`${thisZurl}?district_id=${dist}&date=${date}`)
          .then((data) => {
            subscriber.next(data);
          })
          .catch((err) => {
            subscriber.error(err);
          });
      };
      m();
      this.watcher = setInterval(m, pollFreq);
    });
  }
  distS(url) {
    let headers = {};
    if (localStorage.token) {
      headers.authorization = `Bearer ${localStorage.token}`;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url, { headers })
        .then(function (response) {
          // handle success
          return resolve(response.data);
        })
        .catch(function (error) {
          // handle error
          return reject(error);
        });
    });
  }
  initDistS(dist, date) {
    return new Observable((subscriber) => {
      let req = this.distS.bind(this);
      let thisUrl = `${apipath}/v2/appointment/sessions/public/findByDistrict?district_id=${dist}&date=${date}`
      if(localStorage.token){
        thisUrl = `${apipath}/v2/appointment/sessions/findByDistrict?district_id=${dist}&date=${date}`
      }
      let m = () => {
        req(
          thisUrl
        )
          .then((data) => {
            subscriber.next(data);
          })
          .catch((err) => {
            subscriber.error(err);
          });
      };
      m();
      this.watcher = setInterval(m, pollFreq);
    });
  }
  clearWatch() {
    console.log(this);
    clearInterval(this.watcher);
  }
  clearAuthWatch() {
    clearInterval(this.authWatcher);
  }
  async generateOtp(mobile) {
    return await axios
      .post("https://cdn-api.co-vin.in/api/v2/auth/generateMobileOTP", {
        mobile: mobile,
        secret,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error;
      });
  }
  async verifyOtp(otp, txnId) {
    let otpHasKey = CryptoJS.SHA256(otp).toString(CryptoJS.enc.Hex);
    console.log(otpHasKey);
    return await axios
      .post("https://cdn-api.co-vin.in/api/v2/auth/validateMobileOtp", {
        otp: otpHasKey,
        txnId: txnId,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
  }
  async getBenefeciaries(token) {
    return await axios
      .get("https://cdn-api.co-vin.in/api/v2/appointment/beneficiaries", {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((response) => {
        return response.data.beneficiaries;
      })
      .catch((err) => {
        // return err
        throw err;
      });
  }

  async book(payload, token) {
    try{
      const response = await axios
      .post(burl, payload, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.token}`,
        },
      })
      if(response.data){
        return response.data
      }
    } catch( e ){
      throw e.response.data
    }
  }

  trackAuth(token) {
    return new Observable((subscriber) => {
      let req = this.getBenefeciaries.bind(this);
      this.authWatcher = setInterval(() => {
        req(token)
          .then((data) => {
            subscriber.next(data);
          })
          .catch((err) => {
            subscriber.next("err");
          });
      }, 1000 * 60 * (15 + 0.06));
    });
  }
  async getStates() {
    return axios
      .get(`${apipath}/v2/admin/location/states`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  }
  async getDistricts(stateId) {
    return axios
      .get(`${apipath}/v2/admin/location/districts/${stateId}`)
      .then((response) => {
        return response.data.districts;
      })
      .catch((err) => {
        throw err;
      });
  }

  async getCaptcha() {
    return await axios
      .post(
        "https://cdn-api.co-vin.in/api/v2/auth/getRecaptcha",
        {},
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.token}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  }
}
