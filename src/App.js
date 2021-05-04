import "./App.css";
import { Notifications } from "react-push-notification";
import addNotification from 'react-push-notification';
import { Button, Col, Input, Row, Radio } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import CowinApi from "./models";

import moment from "moment";

const cowinApi = new CowinApi();
const { Search } = Input;

class App extends React.Component{
  constructor(props) {
    super(props);
    if(localStorage.appData){
      this.state = Object.assign({}, JSON.parse(localStorage.appData))
    }else{
      this.state = {
        isWatchingAvailability: false,
        minAge: 18,
        vaccineCalendar: {},
        zip: null,
        dates: []
      };
    }
  }
  componentDidMount(){
    addNotification({
      title: "Vaccine Notifications Enabled",
      subtitle: `You now have notifications active for Covid vaccine availability`,
      message: `You now have notifications active for Covid vaccine availability`,
      native: true,
      requireInteraction: true,
    });
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
          addNotification({
            title: c.name,
            subtitle: `${c.address} has ${s.available_capacity} on ${s.date}`,
            message: `${c.name} has ${s.available_capacity} on ${s.date}`,
            requireInteraction: true,
            native: true, // when using native, your OS will handle theming.
          });
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
  render() {
    const vaccineCalendar = this.state.vaccineCalendar;
    return (
      <div className="App">
        <Notifications />
        <header className="App-header">
          <h2>
            Get notifications for Covid-19 vaccine availability in your area
          </h2>
        </header>
        <a href="https://www.cowin.gov.in/home" target="_blank">Visit Cowin to book a Vaccination Slot</a>

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
          <Col>
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
