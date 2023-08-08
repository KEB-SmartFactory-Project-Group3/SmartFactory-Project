import React from "react";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: this.props.src,
      info: '',
    };

    this.player = null;
    this.changeSource = this.changeSource.bind(this);
    this.restartPlayer = this.restartPlayer.bind(this);
    this.changeBufferDuration = this.changeBufferDuration.bind(this);
  }

  componentDidMount() {
    this.player = window.Streamedian.player(this.props.id, this.props.options);
  }

  changeSource(src) {
    this.setState({source: src}, () => {
      this.restartPlayer();
    });
  }

  changeBufferDuration(duration) {
    this.player.bufferDuration = duration;
    this.setState({bufferDuration: duration});
  }

  restart() {
    this.player.player.src = this.state.source;
    this.player.destroy();
    this.player = null;
    this.player = window.Streamedian.player(this.props.id, this.props.options);
    this.changeBufferDuration(this.player.bufferDuration);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
