import logo from "./logo.svg";
import "./App.css";
import { Notifications } from "react-push-notification";
import { Button, Col, Input, Row } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import CowinApi from "./models";
import moment from "moment";
import Grid from "antd/lib/card/Grid";
const cowinApi = new CowinApi();

const { Search } = Input;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWatchingAvailability: false,
      zip: 560076,
    };
  }
  initWatch(zip) {
    this.watcher = cowinApi
      .init(this.state.zip, moment().format("DD-MM-YYYY"))
      .subscribe({
        next(data) {
          console.log(data);
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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Set alerts for Covid vaccine availability on a Zipcode</p>

          <Row >
            <Col>
              <Search
                placeholder="Enter your zipcode"
                allowClear
                type="number"
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
                <Button type="primary" icon={<CloseCircleOutlined />} size={"large"} danger onClick={this.clearWatch.bind(this)}>
                Stop
              </Button>
              ) : null}
            </Col>
          </Row>
        </header>
      </div>
    );
  }
}

export default App;
