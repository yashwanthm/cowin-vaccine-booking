import "./App.css";
// import { Notifications } from "react-push-notification";
import { Button, Col, Input, Row, Radio, Select, Checkbox, Tabs, Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import CowinApi from "./models";

import moment from "moment";

const { TabPane } = Tabs;
const cowinApi = new CowinApi();
const { Search } = Input;
const { Option } = Select;

let speech = new SpeechSynthesisUtterance();

speech.lang = "en-US";
speech.volume = 1;
speech.rate = 1;
speech.pitch = 1;                




class App extends React.Component{
  constructor(props) {
    super(props);
    let state = {}
    if(localStorage.appData){
      state = Object.assign({}, JSON.parse(localStorage.appData))
    } else {
      state = {
        isWatchingAvailability: false,
        bookingInProgress: false,
        isAuthenticated: localStorage.token ? true : false,
        minAge: 18,
        districtId: 264,
        stateId: 16,
        beneficiaries: [],
        selectedBeneficiaries: [],
        otpData: {
          txnId: null
        },
        vaccineCalendar: {},
        zip: null,
        enableOtp: false,
        otp: null,
        mobile: null,
        token: localStorage.token || null,
        selectedTab: "1",
        dates: [],
        states: [],
        districs: [],
        session: null,
        bookingCenter: null,
        showSuccessModal: false
      };
    }
    this.state = state;
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
  getBeneficiaries(){
    cowinApi.getBenefeciaries(this.state.token).then(data=>{
      this.setState({beneficiaries: data},()=>{this.setStorage()});
    }).catch(err=>{
      console.log(err);
      delete localStorage.token;
      this.setState({isAuthenticated: false, token: null})
    })
  }
  componentDidMount(){
    if(this.state.isAuthenticated){
      this.getBeneficiaries();
    }else if(this.state.mobile){
      // this.setState({enableOtp: true},()=>{this.generateOtp()})
      
    }

    cowinApi.getStates().then(data=>{
      this.setState({states: data.states},()=>{
        this.selectState(this.state.stateId);
        this.selectDistrict(this.state.districtId);
      })
    }).catch(err=>{
      console.log(err);
    })
    
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
    this.setStorage();
    if(this.watcher) this.watcher.unsubscribe();
  }
  handleNotification(){
    let centers = this.state.vaccineCalendar.centers;
    let requiredNums = 1;
    if(this.state.selectedBeneficiaries && Array.isArray(this.state.selectedBeneficiaries) && this.state.selectedBeneficiaries.length>0){
      requiredNums = this.state.selectedBeneficiaries.length;
    }
    let booking = false;
    centers.map(c=>{
      c.sessions.map(s=>{
        if (
          parseInt(s.min_age_limit) === this.state.minAge &&
          parseInt(s.available_capacity) >= requiredNums && 
          !this.state.bookingInProgress
        ) {
          this.setState({enableOtp: true})
          this.notifSound.play();

          let opts = {
            title: c.name,
            body: `${c.pincode} ${c.address} has ${s.available_capacity} on ${s.date}`,
            vibrate: [300, 100, 400],
            native: true
          }
          try {
            Notification.requestPermission(function(result) {
              if (result === 'granted') {
                navigator.serviceWorker.ready.then(function(registration) {
                  registration.showNotification(opts.message, opts);
                });
              }
            });
            new Notification(opts.title, opts);    
            speech.text = "Vaccines Available. Attempting to book.";
            window.speechSynthesis.speak(speech);
            this.setState({bookingInProgress: true},()=>{
              this.book(s, c);
            })
            
          } catch (error) {
            console.log(error);
          }
          
          
        }
      })
    })
  }
  async book(session, center){
    let benIds = [];
    await this.setState({bookingSession: session, bookingCenter: center});
    if(this.state.selectedBeneficiaries.length === 0){
      if(!this.state.isAuthenticated){
        this.setState({enableOtp: true},()=>{
          this.generateOtp()
        })
      }
      return;
    }else{
      this.state.selectedBeneficiaries.map(sb=>{
        benIds.push(sb.beneficiary_reference_id)
      })
    }
    
    
    let payload = {
      dose: this.state.dose,
      session_id: session.session_id,
      slot: session.slots[0],
      beneficiaries: benIds
    }
    cowinApi.book(payload, this.state.token).then(data=>{
      console.log('Booking success ', data.appointment_id);
      this.clearWatch();
      this.setState({bookingInProgress: false, appointment_id: data.appointment_id, showSuccessModal: true});
    }).catch(err=>{
      this.setState({bookingInProgress: false, session: null, bookingCenter: null});
      let msg = 'Booking did not get through, tracking for next slot';
      speech.text = msg;
      window.speechSynthesis.speak(speech);
      console.log(msg);
    })

  }

  initWatch(zip) {
    const self = this;

    this.setStorage();
    this.setState({isWatchingAvailability: true});
    if(this.state.selectedTab === "1"){
      this.watcher = cowinApi
      .initDist(this.state.districtId, moment().format("DD-MM-YYYY"))
      .subscribe({
        next(data) {
          self.setState({vaccineCalendar: data},()=>{
            self.handleNotification();
            // self.setStorage()
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
    }else{
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
    
  }
  trackAuth() {
    const self = this;
    
    this.watcher = cowinApi
      .trackAuth(this.state.token)
      .subscribe({
        next(data) {
          if(Array.isArray(data)){
            self.setState({beneficiaries: data})
          }else{
            this.setState({enableOtp: true},()=>{
              self.generateOtp()
            })
          }
          
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
            <h3>{vc.name}</h3>
            {vc.block_name}, {vc.address}, {vc.pincode} 
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
    speech.text = "OTP has been sent to your phone. Please enter OTP";
    window.speechSynthesis.speak(speech);
    this.setState({enableOtp: true}, ()=>{
      cowinApi.generateOtp(this.state.mobile).then(data=>{
        console.log(data);
        this.setState({otpData: data});
        // this.waitForOtp();
      }).catch(err=>{
        console.log(err);
        this.setState({enableOtp: false})
      })
    });
    
  }
  verifyOtp(){
    this.setState({enableOtp: false});
    cowinApi.verifyOtp(this.state.otp, this.state.otpData.txnId).then(data=>{
      // console.log('otp verify ', data);
      localStorage.token = data.token;
      this.setState({token: data.token, isAuthenticated: true}, ()=>{
        this.setStorage();
        this.getBeneficiaries();
        this.trackAuth();
      })
    }).catch(err=>{
      console.log(err);
      this.generateOtp();
    })
  }
  selectState(stateId){
    this.setState({stateId}, ()=>{
      cowinApi.getDistricts(stateId).then(data=>{
        this.setState({districs: data});
      }).catch(err=>{
        console.log(err)
      })
    })
  }
  selectDistrict(districtId){
    this.setState({districtId}, ()=>{
    })
  }
  render() {
    const vaccineCalendar = this.state.vaccineCalendar;
    const isAuthenticated = this.state.isAuthenticated;
    const {beneficiaries, selectedBeneficiaries} = this.state;
    return (
      <div className="App">
        {/* <Notifications /> */}
        <audio id="notif">
          <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
        </audio>
        <header className="App-header">
          <h2>Get notifications for Covid-19 vaccine availability.</h2>
          <p style={{ color: "#999" }}>
            This app continously tracks for availability of vaccine and can
            proceed with booking on your behalf. Login and select beneficiaries
            to enable automatic booking.
          </p>
        </header>

        {/* <Col style={{ marginBottom: 10 }}>
          {this.state.isWatchingAvailability ? null : (
            <title>Select age group for getting notifications</title>
          )}
        </Col> */}
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col>
            {isAuthenticated ? null : (
              <div>
                <h1>Login</h1>
                {this.state.enableOtp ? null : (
                  <Search
                    placeholder={
                      this.state.mobile ? this.state.mobile : "Mobile Number"
                    }
                    allowClear
                    type="number"
                    // value={this.state.mobile}
                    enterButton={"Generate OTP"}
                    size="large"
                    onSearch={(e) => {
                      this.setState({ mobile: e, enableOtp: true }, () => {
                        this.generateOtp();
                      });
                    }}
                  />
                )}
                {this.state.enableOtp ? (
                  <Search
                    placeholder="Enter OTP"
                    allowClear
                    type="number"
                    // value={this.state.zip}
                    enterButton={"Submit"}
                    size="large"
                    onSearch={(e) => {
                      this.setState({ otp: e }, () => {
                        this.verifyOtp();
                      });
                    }}
                  />
                ) : null}
              </div>
            )}

            {isAuthenticated ? (
              <div>
                <h2>Beneficiaries</h2>
                {this.state.beneficiaries.length === 0 ? (
                  <p>
                    You do not have any benificiares added yet. Please login to{" "}
                    <a href="https://www.cowin.gov.in/home" target="_blank">
                      Cowin
                    </a>{" "}
                    and add beneficiaries
                  </p>
                ) : (
                  <p>
                    Select beneficiaries to book a slot automatically when
                    there's availability. This app can continuously track
                    availability and make a booking.
                  </p>
                )}
                {this.state.beneficiaries.map((b) => {
                  return (
                    <Row>
                      <Checkbox
                        checked={
                          selectedBeneficiaries.findIndex((sb) => {
                            return (
                              sb.beneficiary_reference_id ===
                              b.beneficiary_reference_id
                            );
                          }) !== -1
                        }
                        onClick={(e) => {
                          let sbs = this.state.selectedBeneficiaries;
                          let idx = sbs.findIndex((sb) => {
                            return (
                              sb.beneficiary_reference_id ===
                              b.beneficiary_reference_id
                            );
                          });
                          if (idx === -1) {
                            sbs.push(b);
                          } else {
                            sbs.splice(idx, 1);
                          }
                          this.setState({ selectedBeneficiaries: sbs });
                        }}
                      >
                        {b.name}
                      </Checkbox>
                    </Row>
                  );
                })}
              </div>
            ) : null}

            <Row style={{ marginTop: 10 }}>
              <h2 style={{ marginTop: 10, marginBottom: 0 }}>Age Group</h2>
              <Radio.Group
                style={{ marginTop: 18, marginLeft: 10 }}
                onChange={this.setMinAge.bind(this)}
                value={this.state.minAge}
                disabled={this.state.isWatchingAvailability}
              >
                <Radio value={18}>18 to 45 Years</Radio>
                <Radio value={45}>45+ Years</Radio>
              </Radio.Group>
            </Row>

            <Row style={{ marginTop: 5 }}>
              <h2 style={{ marginTop: 10, marginBottom: 0 }}>Dose</h2>
              <Radio.Group
                style={{ marginTop: 18, marginLeft: 10 }}
                onChange={(dose) => {
                  this.setState({ dose: dose });
                }}
                defaultValue={1}
                value={this.state.dose}
                disabled={this.state.isWatchingAvailability}
              >
                <Radio value={1}>Dose 1</Radio>
                <Radio value={4}>Dose 2</Radio>
              </Radio.Group>
            </Row>

            <h2 style={{ marginTop: 15, marginBottom: 0 }}>Select Location</h2>
            <Tabs
              defaultActiveKey="1"
              onChange={(e) => {
                this.setState({ selectedTab: e });
              }}
            >
              <TabPane tab="Track By District" key={1}>
                <Select
                  style={{ width: 234 }}
                  size="large"
                  defaultValue={this.state.stateId}
                  onChange={this.selectState.bind(this)}
                  placeholder="Select State"
                >
                  {this.state.states.map((s) => {
                    return (
                      <Option key={s.state_id} value={s.state_id}>
                        {s.state_name}
                      </Option>
                    );
                  })}
                </Select>

                <Select
                  style={{ width: 234 }}
                  defaultValue={this.state.districtId}
                  size="large"
                  onChange={(val) => {
                    this.selectDistrict(val);
                  }}
                  placeholder="Select District"
                >
                  {this.state.districs.map((d) => {
                    return (
                      <Option key={d.district_id} value={d.district_id}>
                        {d.district_name}
                      </Option>
                    );
                  })}
                </Select>
                <Button
                  type="primary"
                  size="large"
                  onClick={(e) => this.initWatch()}
                >
                  Track Availability
                </Button>
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
              </TabPane>
              <TabPane tab="Track By Pincode" key={2}>
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
              </TabPane>
            </Tabs>

            {/* <Col>
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
            </Col> */}
          </Col>
        </Row>

        {vaccineCalendar && vaccineCalendar.centers
          ? this.renderTable(vaccineCalendar)
          : null}

        {this.state.session && this.state.bookingCenter ? (
          <Modal
            title="Congrats!"
            visible={this.state.showSuccessModal}
            onOk={(e) => {
              this.setState({ showSuccessModal: false });
            }}
            onCancel={(e) => {
              this.setState({ showSuccessModal: false });
            }}
          >
            <p>
              You vaccine slot is booked for selected beneficiaries at{" "}
              {this.state.bookingCenter.name},{" "}
              {this.state.bookingCenter.block_name},{" "}
              {this.state.bookingCenter.address},{" "}
              {this.state.bookingCenter.district_name},{" "}
              {this.state.bookingCenter.state_name},{" "}
              {this.state.bookingCenter.pincode}
            </p>
            <p>Your appointment id is {this.state.appointment_id}</p>
            <p>
              You can login into{" "}
              <a href="https://www.cowin.gov.in/home" target="_blank">
                Cowin
              </a>{" "}
              to see details of your Vaccine slot
            </p>
          </Modal>
        ) : null}
      </div>
    );
  }
}
export default App;
