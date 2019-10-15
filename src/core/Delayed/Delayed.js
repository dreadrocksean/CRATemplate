import { Component } from 'react';
import PropTypes from 'prop-types';

class Delayed extends Component {
  state = { show: false };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, this.props.wait);
  }

  render() {
    return (this.state.show && this.props.children) || null;
  }
}

Delayed.propTypes = {
  wait: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
};

export default Delayed;
