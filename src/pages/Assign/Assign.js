import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import SubmitForm from '../../core/SubmitForm';
import AppCardAddContent from '../../core/AppCard/AppCardAddContent';

import { flattenItemList } from '../../utils';
import { SUBDIRECTORY } from '../../utils/config';

import AppCard from '../../core/AppCard';

class Assign extends PureComponent {
  state = {
    selectedTechOption: null,
    formValues: { currSerialNumber: '' },
    showForm: false,
    autoScroll: null,
    scrollShadow: false,
    redirect: false,
    submitted: false,
  };
  submitted = false;

  componentDidMount() {
    this.props.getAllTechnicians();
    this.setState({ submitted: false });
  }

  onClear = () => {
    this.props.clearEquipmentList();
    this.props.clearPendingList();
  };

  addSerial = e => {
    e.preventDefault();
    const sn = this.state.formValues.currSerialNumber;
    if (!sn.trim()) {
      // Safe as 00000... is invalid anyway
      return;
    }
    this.props.addSerialNumber(sn);
    this.submitted = true;
  };

  //======= ONLY FOR PERSONAL TESTING ========//
  // addSerial = e => {
  //   e.preventDefault();
  //   const { serialNumbers } = require('../../data');
  //   const testSerialNumber = serialNumbers[Math.floor(Math.random() * serialNumbers.length)];
  //   const sn = this.state.formValues.currSerialNumber;
  //   this.props.addSerialNumber(sn || testSerialNumber);
  // };

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

  //======== For Technician Submit Form ========
  onTechChange = selectedOption => {
    this.submitted = false;
    return this.setState({ selectedTechOption: selectedOption });
  };

  onSubmit = itemList => async () => {
    if (this.state.submitted) {
      console.log('Already submitted!');
      return;
    }
    this.setState({ submitted: true });
    const userId = this.state.selectedTechOption.value;
    const flat = flattenItemList(itemList);
    const serialNumbers = flat.filter(v => v.currentStatus === '3').map(v => v.serialNumber);
    const batchItem = await this.props.createBatch(userId, serialNumbers);
    if (batchItem) {
      this.setState({ redirect: true });
      this.onClear();
    } else {
      this.setState({ redirect: false });
    }
  };
  //================= End ===================

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`${SUBDIRECTORY}/assign/batch`} />;
    }

    return (
      <AppCard
        subStore="equipment"
        addPanelItem={this.addSerial}
        appCardTitle="Assign Technician"
        appCardSubtitle="Scan in serial numbers"
        onClear={this.onClear}
      >
        [
        <AppCardAddContent
          formName="Find Equipment By Serial Number"
          onChange={this.handleChange}
          onSubmit={this.addSerial}
          onCancel={this.onCancel}
          values={this.state.formValues}
          textFields={[{ label: 'Serial Number', name: 'currSerialNumber' }]}
        />
        <SubmitForm
          getAllOptions={this.props.getAllTechnicians}
          onChange={this.onTechChange}
          submitted={this.state.submitted}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          selectedOption={
            this.state.selectedTechOption || { value: '', label: 'Choose A Technician' }
          }
        />
        ]
      </AppCard>
    );
  }
}

Assign.propTypes = {
  loading: PropTypes.object,
  style: PropTypes.object,
  error: PropTypes.object,
  addSerialNumber: PropTypes.func,
  clearEquipmentList: PropTypes.func,
  clearPendingList: PropTypes.func,
  getAllTechnicians: PropTypes.func,
  createBatch: PropTypes.func,
};

export default Assign;
