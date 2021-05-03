import axios from 'axios';
import { Observable } from 'rxjs';

const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin`

export default class CowinApi {
    req(endpoint){
        return new Promise((resolve, reject)=>{
            axios.get(endpoint).then(function (response) {
                // handle success
                return resolve(response)
              })
              .catch(function (error) {
                // handle error
                return reject(error)
              })
        })
    }
    init(zip, date){
        return new Observable(subscriber => {
            this.watcher = setInterval(()=>{
                this.req(`${url}?pincode=${zip}&date=${date}` ).then(data=>{
                    subscriber.next(data);
                }).catch(err=>{
                    subscriber.error(err);
                });
            }, 1000)
          });
    }
    clearWatch(){
        console.log(this);
        clearInterval(this.watcher);
    }
}