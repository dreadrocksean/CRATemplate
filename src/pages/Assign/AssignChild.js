import React from 'react';
import PropTypes from 'prop-types';

const AssignChild = props => {
  const assignChildIndex = parseInt(props.match.params.number, 10);
  // const assignChild = AssignChildAPI.get(assignChildIndex);
  if (!assignChildIndex) {
    return <div>Sorry, but the assignChild was not found</div>;
  }
  return (
    <div>
      <h2>
        AssignChild (#
        {assignChildIndex})
      </h2>
    </div>
  );
};

AssignChild.propTypes = {
  match: PropTypes.object,
};

export default AssignChild;
