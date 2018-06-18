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
    setInterval(this.tick, 1000);
  }

  tick(){
    this.setState({time : new Date()});
  }

  render(){
    const time = this.state.time;
    const hour = time.getHours() % 12;
    const minute = time.getMinutes()
    const seconds = time.getSeconds()
    return (
      <div>
        <h1>{`${hour} : ${minute} : ${seconds}`}</h1>
      </div>
    )
  }
}

export default Clock;
