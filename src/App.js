import "./App.css";
import { Notifications } from "react-push-notification";
import addNotification from 'react-push-notification';
import { Button, Col, Input, Row, Table } from "antd";
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
      vaccineCalendar: {"centers":[{"center_id":566035,"name":"APOLLO HOSPITAL 1","address":"Imperial Hospital Research Centre Limited","state_name":"Karnataka","district_name":"BBMP","block_name":"Bommanahalli","pincode":560076,"lat":12,"long":77,"from":"09:00:00","to":"16:00:00","fee_type":"Paid","sessions":[{"session_id":"8e36c9c2-1a4a-4d4c-b283-fe3c9b71d16d","date":"04-05-2021","available_capacity":0,"min_age_limit":18,"vaccine":"COVISHIELD","slots":["09:00AM-11:00AM","11:00AM-01:00PM","01:00PM-03:00PM","03:00PM-04:00PM"]},{"session_id":"cce55c05-a6d2-4531-90db-765afed8deb1","date":"05-05-2021","available_capacity":0,"min_age_limit":18,"vaccine":"COVISHIELD","slots":["09:00AM-11:00AM","11:00AM-01:00PM","01:00PM-03:00PM","03:00PM-04:00PM"]},{"session_id":"e2d4945a-a179-49b5-9ca4-5f5b83a292c3","date":"06-05-2021","available_capacity":0,"min_age_limit":18,"vaccine":"COVISHIELD","slots":["09:00AM-11:00AM","11:00AM-01:00PM","01:00PM-03:00PM","03:00PM-04:00PM"]},{"session_id":"0ee65cd7-39de-463a-b86b-6e25c62f1a8e","date":"07-05-2021","available_capacity":0,"min_age_limit":18,"vaccine":"COVISHIELD","slots":["09:00AM-11:00AM","11:00AM-01:00PM","01:00PM-03:00PM","03:00PM-04:00PM"]},{"session_id":"fa2509f2-11d3-4121-8631-8cdb7494b194","date":"08-05-2021","available_capacity":0,"min_age_limit":18,"vaccine":"COVISHIELD","slots":["09:00AM-11:00AM","11:00AM-01:00PM","01:00PM-03:00PM","03:00PM-04:00PM"]}],"vaccine_fees":[{"vaccine":"COVISHIELD","fee":"850"}]},{"center_id":677577,"name":"Narayanappa Settypalya Covaxin","address":"1st Main,12 Cross,BTM 2ND STAGE NS PALYA","state_name":"Karnataka","district_name":"BBMP","block_name":"South","pincode":560076,"lat":0,"long":1,"from":"09:00:00","to":"16:00:00","fee_type":"Free","sessions":[{"session_id":"9be393d1-cee7-484a-ab71-aaac899b301b","date":"09-05-2021","available_capacity":0,"min_age_limit":45,"vaccine":"COVAXIN","slots":["09:00AM-11:00AM","11:00AM-01:00PM","01:00PM-03:00PM","03:00PM-04:00PM"]}]}]},
      zip: 560076,
      dates: []
    };
  }
  componentDidMount(){
    this.handleNotification()
  }
  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    // this.watcher.unsubscribe();
  }

  handleNotification(){
    let centers = this.state.vaccineCalendar.centers;
    // console.log(vaccineCalendar);
    // return
    centers.map(c=>{
      c.sessions.map(s=>{
        if( 
          parseInt(s.min_age_limit)==18 && 
          s.available_capacity > 0
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
  render() {
    // let vaccineCalendar = new VaccineCalendar(this.state.vaccineCalendar);
    // let dates = [];
    // try {
    //   dates = vaccineCalendar.dates();  
    // } catch (error) {
    //   console.log(dates);
    // }
    
    // let columns = [
    //   {
    //     title: 'Hospital',
    //     dataIndex: 'name',
    //     key: 'name'
    //   }
    // ]
    
    // dates.map(d=>{
    //   let obj = {
    //     ttle: d,
    //     dataIndex: 'date',
    //     key: 'sessions'
    //   };
    //   console.log(obj);
    //   columns.push();
    // })
    
    return (
      <div className="App">
        <Notifications />
        <header className="App-header">
          <h2>Get notifications for Covid vaccine availability in your area</h2>
        </header>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col>
            <Search
              placeholder="Enter your zipcode"
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
        
        
        {/* <Table 
          columns={columns} 
          dataSource={this.state.vaccineCalendar.centers} 
          expandable={{
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
            // rowExpandable: record => record.name !== 'Not Expandable',
          }}
          /> */}
        <Col>
          {this.state.vaccineCalendar.centers.map((vc) => {
            return (
              <Row key={vc.center_id}>
                <Col>
                  {vc.name}
                  {vc.block_name}{vc.address}
                  Timings: {vc.from}-{vc.to}
                </Col>
                <Col>
                  {vc.sessions.map(s=>{
                    return <Row>
                      {s.date}
                      {s.available_capacity}
                      {s.min_age_limit}
                      {s.vaccine}
                      {s.slots.map(sl=>{
                        return <Row>{sl}</Row>
                      })}
                    </Row>
                  })}
                </Col>
              </Row>
            );
          })}
        </Col>
      </div>
    );
  }
}

export default App;
