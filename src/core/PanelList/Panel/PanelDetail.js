import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import DetailHeader from './DetailHeader';
import DetailItem from './DetailItem';

const PanelDetail = ({ items, itemFields, removeItem }) => (
  <Fragment>
    <DetailHeader
      subHeadings={Object.keys(items[0]).filter(key => {
        return (itemFields || []).find(field => key === field.name && field.display);
      })}
    />

    {items.map((item, i) => {
      const clone = { ...item };
      (itemFields || []).forEach(field => {
        if (!field.display) {
          delete clone[field.name];
        }
      });
      return (
        <DetailItem
          key={i}
          isAvailable={item.isAvailable}
          item={clone}
          removeItem={removeItem && removeItem(clone)}
        />
      );
    })}
  </Fragment>
);

PanelDetail.propTypes = {
  items: PropTypes.array,
  itemFields: PropTypes.array,
  removeItem: PropTypes.func,
};

export default PanelDetail;
