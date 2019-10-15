import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import MainStore from '../../stores/MainStore';

// import styles from './Returns.module.scss';

import AppCardAddContent from '../../core/AppCard/AppCardAddContent';

import { flattenItemList } from '../../utils';

import AppCard from '../../core/AppCard';

class Returns extends PureComponent {
  state = {
    formValues: { currSerialNumber: '' },
    showForm: false,
    autoScroll: null,
    scrollShadow: false,
    redirect: false,
    submitted: false,
  };
  submitted = false;

  componentDidMount() {
    this.setState({ submitted: false });
  }

  onClear = () => {
    this.props.clearEquipmentList();
    this.props.clearPendingList();
  };

  //======= MUST FOR DEPLOYMENT ========//
  // addSerial = addSerialNumber => e => {
  //   e.preventDefault();
  //   const sn = this.state.formValues.currSerialNumber;
  //   if (!sn.trim()) {
  //     // Safe as 00000... is invalid anyway
  //     return;
  //   }
  //   this.props.addSerialNumber(sn);
  //   this.submitted = true;
  // };

  //======= ONLY FOR PERSONAL TESTING ========//
  addSerial = addSerialNumber => e => {
    e.preventDefault();
    const { serialNumbers } = require('../../data');
    const testSerialNumber = serialNumbers[Math.floor(Math.random() * serialNumbers.length)];
    const sn = this.state.formValues.currSerialNumber;
    addSerialNumber(sn || testSerialNumber);
  };

  //============ Form Utilities ==============//
  onCancel = textFields => () => {
    const newFormValues = {};
    textFields.forEach(f => (newFormValues[f.name] = ''));
    this.setState({
      formValues: { ...this.state.formValues, ...newFormValues },
    });
  };

  handleChange = name => {
    return event => {
      if (this.submitted) {
        const lastChar = event.target.value.slice(-1);
        this.setState({
          formValues: { ...this.state.formValues, [name]: lastChar },
        });
        this.submitted = false;
        return;
      }
      this.setState({
        formValues: { ...this.state.formValues, [name]: event.target.value },
      });
    };
  };
  //============ End Form Utilities ============//

  onSubmit = itemList => async () => {
    if (this.state.submitted) {
      console.log('Already submitted!');
      return;
    }
    this.setState({ submitted: true });
    const flat = flattenItemList(itemList);
    const serialNumbers = flat.filter(v => v.currentStatus === '3').map(v => v.serialNumber);
    const batchItem = await this.props.createBatch(serialNumbers);
    if (batchItem) {
      this.onClear();
    }
  };
  //================= End ===================

  render() {
    return (
      <Subscribe to={[MainStore]}>
        {main => (
          <AppCard
            subStore="equipment"
            addPanelItem={this.addSerial(main.equipment.addSerialNumber)}
            appCardTitle="Equipment Returns"
            appCardSubtitle="Scan in serial numbers"
            onClear={this.onClear}
          >
            [
            <AppCardAddContent
              formName="Return Equipment By Serial Number"
              onChange={this.handleChange}
              submitText={'Return'}
              onSubmit={this.addSerial(main.equipment.addSerialNumber)}
              onCancel={this.onCancel}
              values={this.state.formValues}
              textFields={[{ label: 'Serial Number', name: 'currSerialNumber' }]}
            />
            ]
          </AppCard>
        )}
      </Subscribe>
    );
  }
}

Returns.propTypes = {
  loading: PropTypes.object,
  style: PropTypes.object,
  error: PropTypes.object,
  clearEquipmentList: PropTypes.func,
  clearPendingList: PropTypes.func,
  createBatch: PropTypes.func,
};

export default Returns;
