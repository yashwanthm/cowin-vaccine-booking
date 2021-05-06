import "./App.css";
// import { Notifications } from "react-push-notification";
import { Button, Col, Input, Row, Radio } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import CowinApi from "./models";

import moment from "moment";

console.log('asdad');
const cowinApi = new CowinApi();
const { Search } = Input;

class App extends React.Component{
  constructor(props) {
    super(props);
    // if(localStorage.appData){
    //   this.state = Object.assign({}, JSON.parse(localStorage.appData))
    // }else{
      this.state = {
        isWatchingAvailability: false,
        isAuthenticated: false,
        minAge: 18,
        beneficiaries: [],
        vaccineCalendar: {},
        zip: null,
        enableOtp: false,
        mobile: null,
        dates: []
      };
    // }
  }
  async waitForOtp(){

    console.log('waiting for otp');
    if(this.ac){
      this.ac.abort();
    }
    if ('OTPCredential' in window) {
      
      console.log('Waiting for SMS. Try sending yourself a following message:\n\n' +
          'Your verification code is: 123ABC\n\n' +
          '@whatwebcando.today #123ABC');

          try {
            this.ac = new AbortController();
            const theotp = await navigator.credentials.get({
              otp: { transport:['sms'] },
              signal: this.ac.signal
            }).then(otp => {
              console.log('otp is ', otp);
              console.log(`otp, ${otp}`);
              this.setState({otp});
            }).catch(err => {
              console.log(`ssss ${err}`);
            });  
            console.log(theotp);
          } catch (error) {
            console.log(error);
          }
          
    } else {
      console.log('Web OTP API not supported');
    }
      
  }
  componentDidMount(){
    // const self = this;    
    Notification.requestPermission((status) => {
      console.log("Notification permission status:", status);
    });

    this.notifSound = document.getElementById("notif");
    this.notifSound.play();

      let opts = {
        title: "Vaccine Notifications Enabled",
        body: `You now have notifications active for Covid vaccine availability`,
        native: true,
        vibrate: [300, 100, 400]
      };
      try {
        Notification.requestPermission(function(result) {
          if (result === 'granted') {
            navigator.serviceWorker.ready.then(function(registration) {
              registration.showNotification(opts.title, opts);
            });
          }
        });
        new Notification(opts.title, opts);  
      } catch (error) {
        console.log(error);
      }
  }
  setStorage(){
    let state = Object.assign({}, this.state)
    delete state.vaccineCalendar;
    delete state.isWatchingAvailability;
    localStorage.appData = JSON.stringify(state);
  }
  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    if(this.watcher) this.watcher.unsubscribe();
  }
  handleNotification(){
    let centers = this.state.vaccineCalendar.centers;
    centers.map(c=>{
      c.sessions.map(s=>{
        if (
          parseInt(s.min_age_limit) == this.state.minAge &&
          parseInt(s.available_capacity) > 0
        ) {
          this.setState({enableOtp: true})
          this.notifSound.play();

          let opts = {
            title: c.name,
            body: `${c.pincode} ${c.address} has ${s.available_capacity} on ${s.date}`,
            vibrate: [300, 100, 400],
            native: true
          }
          Notification.requestPermission(function(result) {
            if (result === 'granted') {
              navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification(opts.message, opts);
              });
            }
          });
          new Notification(opts.title, opts);  
          
        }
      })
    })
  }

  initWatch(zip) {
    const self = this;
    console.log('zip', self.zip);
    this.watcher = cowinApi
      .init(this.state.zip, moment().format("DD-MM-YYYY"))
      .subscribe({
        next(data) {
          self.setState({vaccineCalendar: data},()=>{
            self.handleNotification();
            self.setStorage()
          })
        },
        error(err) {
          console.error("something wrong occurred: " + err);
        },
        complete() {
          console.log("done");
          this.setState({ isWatchingAvailability: false });
        },
      });
  }
  trackAuth() {
    const self = this;
    
    this.watcher = cowinApi
      .trackAuth(this.state.token)
      .subscribe({
        next(data) {
          self.setState({beneficiaries: data})
        },
        error(err) {
          console.error("something wrong occurred: " + err);
          this.setState({isAuthenticated: false})
        },
        complete() {
          console.log("done");
          this.setState({ isWatchingAvailability: false });
        },
      });
  }
  clearWatch() {
    cowinApi.clearWatch();
    this.setState({ isWatchingAvailability: false });
  }
  renderTable(vaccineCalendar){
    return <table style={{marginTop: 10}}>
    {vaccineCalendar.centers.map((vc) => {
      let noAvailability = true
      vc.sessions.map(ss=>{
        if(ss.available_capacity>0) noAvailability = false;
      })
      
      return (
        <tr key={vc.center_id}>
          <td>
            <h3>{vc.pincode} {vc.name}</h3>
            {vc.block_name}
            {vc.address}
          </td>
          
            
            {noAvailability ? <td>No Availability</td> : vc.sessions.map((s) => {
              return (
                <td key={s.session_id}>
                  <h4>{s.date}</h4>
                  <p>{s.vaccine}</p>
                  <div>
                    {parseInt(s.available_capacity) > 0
                      ? `${s.available_capacity} shots available for ${s.min_age_limit}+`
                      : "No Availability"}
                  </div>
                  {parseInt(s.available_capacity > 0) ? (
                    <div>
                      <b>Available Slots</b>
                      {s.slots.map((sl) => {
                        return <Row>{sl}</Row>;
                      })}
                    </div>
                  ) : null}
                </td>
              );
            })}
          

          {/* </th> */}
        </tr>
      );
    })}
  </table>
  }
  setMinAge(e){
    this.setState({minAge: e.target.value});
  }
  generateOtp(){
    this.setState({enableOtp: true});
    return;
    cowinApi.generateOtp(this.state.mobile).then(data=>{
      console.log(data);
      this.setState({otpData: data});
      this.waitForOtp();
      console.log(13);
    }).catch(err=>{
      console.log(err);
    })
  }
  verifyOtp(){
    this.setState({enableOtp: false});
    cowinApi.verifyOtp(this.state.otp, this.state.otpData.txnId).then(data=>{
      this.setState({token: data.token, isAuthenticated: true}, ()=>{
        this.trackAuth();
      })
    }).catch(err=>{
      console.log(err);
      this.generateOtp();
    })
  }
  render() {
    const vaccineCalendar = this.state.vaccineCalendar;
    return (
      <div className="App">
        {/* <Notifications /> */}
        <audio id="notif">
          <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
        </audio>
        <header className="App-header">
          <h2>
            Get notifications for Covid-19 vaccine availability in your area
          </h2>
        </header>
        <a href="https://www.cowin.gov.in/home" target="_blank">
          Visit Cowin to book a Vaccination Slot
        </a>

        <Col style={{ marginBottom: 10 }}>
          {this.state.isWatchingAvailability ? null : (
            <h3>Select age group for getting notifications</h3>
          )}
          <Radio.Group
            onChange={this.setMinAge.bind(this)}
            value={this.state.minAge}
            disabled={this.state.isWatchingAvailability}
          >
            <Radio value={18}>18 to 45 Years</Radio>
            <Radio value={45}>45+ Years</Radio>
          </Radio.Group>
        </Col>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {this.state.isAuthenticated ? null : (
            <Col>
              {this.state.enableOtp ? (
                <Search
                  placeholder="Enter OTP"
                  allowClear
                  type="number"
                  // value={this.state.zip}
                  enterButton={"Submit"}
                  size="large"
                  onSearch={(e) => {
                    console.log(e);
                    this.setState({ otp: e },()=>{
                      this.verifyOtp()
                    });
                  }}
                />
              ) : (
                <Search
                  placeholder="Mobile Number"
                  allowClear
                  type="number"
                  value={this.state.mobile}
                  enterButton={"Generate OTP"}
                  size="large"
                  onSearch={(e) => {
                    this.setState({ mobile: e, enableOtp: true });
                  }}
                />
              )}

              <Search
                disabled={this.state.isWatchingAvailability}
                placeholder={
                  this.state.zip ? this.state.zip : "Enter your area pincode"
                }
                allowClear
                type="number"
                // value={this.state.zip}
                enterButton={
                  this.state.isWatchingAvailability
                    ? `Tracking`
                    : `Track Availability`
                }
                size="large"
                loading={this.state.isWatchingAvailability}
                onSearch={(txt) => {
                  this.setState(
                    { zip: txt, isWatchingAvailability: true },
                    () => {
                      this.initWatch();
                    }
                  );
                }}
              />
            </Col>
          )}

          <Col>
            {this.state.isWatchingAvailability ? (
              <Button
                type="primary"
                icon={<CloseCircleOutlined />}
                size={"large"}
                danger
                onClick={this.clearWatch.bind(this)}
              >
                Stop
              </Button>
            ) : null}
          </Col>
        </Row>

        {vaccineCalendar && vaccineCalendar.centers
          ? this.renderTable(vaccineCalendar)
          : null}
      </div>
    );
  }
}
export default App;
