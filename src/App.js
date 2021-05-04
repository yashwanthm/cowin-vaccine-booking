import "./App.css";
import { Notifications } from "react-push-notification";
import addNotification from 'react-push-notification';
import { Button, Col, Input, Row, Table, Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import CowinApi from "./models";
import VaccineCalendar from './models/vaccineCalendar';

import moment from "moment";

const cowinApi = new CowinApi();
const { Search } = Input;

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isWatchingAvailability: false,
      vaccineCalendar: {},
      zip: null,
      dates: []
    };
  }
  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    if(this.watcher) this.watcher.unsubscribe();
  }

  handleNotification(){
    let centers = this.state.vaccineCalendar.centers;

    centers.map(c=>{
      c.sessions.map(s=>{
        if( 
          parseInt(s.min_age_limit)==18 && 
          parseInt(s.available_capacity) > 0
        ) {
          addNotification({
            title: c.name,
            subtitle: `${c.address} has ${s.available_capacity} on ${s.date}`,
            message: `${c.name} has ${s.available_capacity} on ${s.date}`,
            theme: 'darkblue',
            native: true // when using native, your OS will handle theming.
        });
        }

      })
    })
  }

  initWatch(zip) {
    const self = this;
    this.watcher = cowinApi
      .init(this.state.zip, moment().format("DD-MM-YYYY"))
      .subscribe({
        next(data) {
          self.setState({vaccineCalendar: data},()=>{
            self.handleNotification()
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
  render() {
    const vaccineCalendar = this.state.vaccineCalendar;
    return (
      <div className="App">
        <Notifications />
        <header className="App-header">
          <h2>Get notifications for Covid-19 vaccine availability in your area</h2>
        </header>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col>
            <Search
              placeholder="Enter your area pincode"
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
   
        {vaccineCalendar && vaccineCalendar.centers ? this.renderTable(vaccineCalendar) : null}
        
      </div>
    );
  }
}

export default App;
