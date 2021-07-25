import React from 'react';
import {render} from 'react-dom';

const startTimeValue = 1200;

class App extends React.Component {

  state = {
    status: 'off',
    time: startTimeValue,
    timer: null,
  }

  formatTime(time) {
    return new Date(time * 1000).toISOString().substr(14, 5);
  }

  step() {
    const thisStep = this;

    thisStep.setState({time: thisStep.state.time - 1})

    if (thisStep.state.time == 0 && thisStep.state.status === 'work') {
      thisStep.setState({status: 'rest', time: 20})
      thisStep.playBell();
    } else if (thisStep.state.time == 0 && thisStep.state.status === 'rest') {
      thisStep.setState({status: 'work', time: startTimeValue})
      thisStep.playBell();
    }
  }

  startTimer() {
    this.setState({
      status: 'work',
      time: startTimeValue,
      timer: setInterval(this.step.bind(this), 1000),
    })
  }

  stopTimer() {
    clearInterval(this.state.timer)
    this.setState({
      status: 'off',
      time: 0,
    })
  }

  playBell() {
    const bell = new Audio('./sounds/bell.wav');
    bell.play()
  };

  render() {
    const thisRender = this;
    const {status, time} = this.state;

    return (
        <div>
          <h1>Protect your eyes</h1>
          {status === 'off' && <Description />}
          {(status === 'work') && <img src="./images/Work.png" />}
          {(status === 'rest') && <img src="./images/Rest.png" />}
          {(status !== 'off') && <div className="timer">{thisRender.formatTime(time)}</div>}
          {(status === 'off') && <button className="btn" onClick={thisRender.startTimer.bind(this)}>Start</button>}
          {(status !== 'off') && <button className="btn" onClick={thisRender.stopTimer.bind(this)}>Stop</button>}
          <button className="btn btn-close" onClick={() => window.close()}>X</button>
        </div>
    )
  }
}

const Description = () => (
    <div>
      <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should
        to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
      <p>This app will help you track your time and inform you when it's time to rest.</p>
    </div>
)

render(<App />, document.querySelector('#app'));
