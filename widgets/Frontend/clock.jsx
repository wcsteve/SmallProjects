import React from 'react';

class Clock extends React.Component {
  constructor(props){
    super(props);

    this.tick = this.tick.bind(this);

    this.state = {
      time: new Date(),
    }
  }

  componentDidMount(){
    this.intervalID = setInterval(this.tick, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  tick(){
    this.setState({time : new Date()});
  }

  render(){
    let time = this.state.time;
    let date = this.state.time.toDateString();
    let hours = time.getHours() % 12;
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return (
      <div className="clock">
        <h1>Clock</h1>
        <br></br>
        <div className="clock-widget">
          <h1>Time: {`${hours}:${minutes}:${seconds}`} PDT</h1>
          <h1>Date: {date}</h1>
        </div>
      </div>
    )
  }
}

export default Clock;
