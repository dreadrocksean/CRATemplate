import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ClassWrapper extends PureComponent {
  render() {
    return this.props.children;
  }
}
ClassWrapper.propTypes = {
  children: PropTypes.object,
};

export default ClassWrapper;
