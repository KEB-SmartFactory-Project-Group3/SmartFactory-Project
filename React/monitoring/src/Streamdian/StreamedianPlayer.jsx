import React from "react";
// import ViewInfo from "./ViewInfo";
// import InputSource from "./InputSource";
// import InputBufferDuration from "./InputBufferDuration"
// import VideoRateControl from "./VideoRateControl";

export default class StreamedianPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bufferDuration: 30,
      socket: "ws://localhost:8080/ws/",            
      redirectNativeMediaErrors: true,
      errorHandler: this.errHandler.bind(this),
      infoHandler: this.infHandler.bind(this),
    };

    this.player = null;
    this.restart = this.restart.bind(this);
    this.changeSource = this.changeSource.bind(this);
    this.changeBufferDuration = this.changeBufferDuration.bind(this);
  }

  componentDidMount() {
    this.player = window.Streamedian.player(this.props.id, this.state);
  }

  componentWillUnmount() {
    this.player.destroy();
    this.player = null;
  }

  restart() {
    this.player.player.src = this.state.source;
    this.player.destroy();
    this.player = null;
    this.player = window.Streamedian.player(this.props.id, this.state);
  }

  changeSource(src) {
    this.setState({source: src}, () => {
      this.restart();
    });
  }

  changeBufferDuration(duration) {
    this.setState({bufferDuration: duration});
  }

  errHandler(err) {
    console.error(err.message);
  }

  infHandler(inf) {
    this.setState({info: inf});
  }

  render() {
    return (
      <div>
        {/* <ViewInfo info={this.state.info || []} onClick={this.changeSource} />
        <InputSource onClick={this.changeSource} />
        <InputBufferDuration duration={this.state.bufferDuration} onChange={this.changeBufferDuration}/> */}
        <video id={this.props.id} controls autoPlay>
          {this.props.children}
        </video>
        {/* <VideoRateControl video={this.props.id} /> */}
      </div>
    );
  }
}
