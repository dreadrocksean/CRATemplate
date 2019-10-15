import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@material-ui/core';

// import '@material-ui/core/';
import { Grid } from '@material-ui/core';
import { Subscribe } from 'unstated';
import DateTime from 'react-datetime';
import moment from 'moment';

import MainStore from '../../stores/MainStore';
import { formattedTechnicianData } from '../../utils';
import AppCard from '../../core/AppCard';
import AppCardAddContent from '../../core/AppCard/AppCardAddContent';
import AutoComplete from '../../core/AutoComplete';

import styles from './Assign.module.scss';
import './cal.scss';

const fields = [
  { label: 'Batch ID', name: 'batchId' },
  { label: 'Serial Number', name: 'serialNumber' },
];

class Batch extends PureComponent {
  state = {
    formValues: {},
    edit: false,
    autoScroll: null,
    scrollShadow: false,
    selectedDate: null,
    currUserId: null,
  };

  startDateRef = React.createRef();
  endDateRef = React.createRef();

  componentDidMount() {
    this.props.getAllTechnicians();
  }

  onClear = () => {
    this.props.clearBatchList();
  };

  batchSearch = e => {
    e.preventDefault();
    this.props.batchSearch(this.state.formValues);
  };

  //============== Form Utilities ==============//
  onCancel = textFields => {
    const newFormValues = {};
    textFields.forEach(f => (newFormValues[f.name] = ''));
    this.setState({
      formValues: { ...this.state.formValues, ...newFormValues },
    });
  };

  handleChange = name => event =>
    this.setState({
      formValues: { ...this.state.formValues, [name]: event.target.value },
    });

  handleDateChange = name => value => {
    if (typeof value === 'string') {
      value = value.trim() ? moment(value) : '';
    }
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value ? value.format('YYYY-MM-DD') : '',
      },
    });
  };

  handleUserIDChange = value => {
    if (!value) {
      return;
    }
    this.setState({
      formValues: {
        ...this.state.formValues,
        currUserId: value.value,
      },
    });
  };
  //============ End Form Utilities ============//

  render() {
    const { selectedOption } = this.state;
    return (
      <div>
        <AppCard
          subStore="batch"
          appCardTitle="Batch result"
          appCardSubtitle="Find Batch"
          onClear={this.onClear}
        >
          [
          <AppCardAddContent
            className={styles.editContainer}
            formName="Find Batch"
            onChange={this.handleChange}
            onSubmit={this.batchSearch}
            onCancel={this.onCancel}
            values={this.state.formValues}
            textFields={fields}
          >
            {[
              <Grid container spacing={24} key={1}>
                <Grid item xs={12}>
                  <div className="dateWrapper">
                    <DateTime
                      ref={this.startDateRef}
                      minWidth={4}
                      className="date"
                      inputProps={{ placeholder: 'Start Date', disabled: false }}
                      timeFormat={false}
                      dateFormat="MM-DD-YYYY"
                      closeOnSelect
                      onChange={this.handleDateChange('startDate')}
                    />
                    <Icon
                      classes={{
                        root: 'dateIcon',
                      }}
                    >
                      date_range
                    </Icon>
                  </div>
                </Grid>
              </Grid>,
              <Grid container spacing={24} key={1}>
                <Grid item xs={12}>
                  <div className="dateWrapper">
                    <DateTime
                      ref={this.endDateRef}
                      minWidth={4}
                      className="date"
                      inputProps={{ placeholder: 'End Date', disabled: false }}
                      timeFormat={false}
                      dateFormat="MM-DD-YYYY"
                      closeOnSelect
                      onChange={this.handleDateChange('endDate')}
                    />
                    <Icon
                      classes={{
                        root: 'dateIcon',
                      }}
                    >
                      date_range
                    </Icon>
                  </div>
                </Grid>
              </Grid>,
              <Grid container spacing={24} key={1}>
                <Subscribe key={0} to={[MainStore]}>
                  {({
                    state: {
                      tech: { loading, technicians },
                    },
                  }) => (
                    <Grid item xs={12}>
                      <AutoComplete
                        selectedOption={selectedOption}
                        onChange={this.handleUserIDChange}
                        options={formattedTechnicianData(technicians)}
                        loading={loading}
                        loadingText="Loading list . . ."
                        placeholder="Choose technician"
                      />
                    </Grid>
                  )}
                </Subscribe>
              </Grid>,
            ]}
          </AppCardAddContent>
        </AppCard>
      </div>
    );
  }
}

Batch.propTypes = {
  loading: PropTypes.object,
  error: PropTypes.object,
  style: PropTypes.object,
  addBatchID: PropTypes.func,
  clearBatchList: PropTypes.func,
  createBatch: PropTypes.func,
  getBatch: PropTypes.func,
  batchSearch: PropTypes.func,
  getAllTechnicians: PropTypes.func,
};

export default Batch;
