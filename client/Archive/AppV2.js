import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var ReactBsTable =require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import '../public/css/react-bootstrap-table.css';
import wwtpdata from '../Data/wwtp_ca.json';
import InfoButton from './InfoButton';
import ReactModal from 'react-modal';
/*This is the main App of the datatable*/



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModal1: false

    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal1 = this.handleOpenModal1.bind(this);
    this.handleCloseModal1 = this.handleCloseModal1.bind(this);
  }

  handleOpenModal () {
  this.setState({ showModal: true });
  }

  handleCloseModal () {
  this.setState({ showModal: false });
  }

  handleOpenModal1 () {
  this.setState({ showModal1: true });
  }

  handleCloseModal1 () {
  this.setState({ showModal1: false });
  }


createCustomButtonGroup = props =>{
  return (
    <div className='btn-group' sizeClass='btn-group-md'>
      {props.exportCSVBtn}
        <button onClick={this.handleOpenModal} className={'btn btn-info' }>
          Info
        </button>
        <button onClick={this.handleOpenModal1} className={'btn btn-basic' }>
          Share
        </button>
        <button type='button'
          className={'btn btn-info' }>
          Leave Feedback
        </button>
        </div>
        );
    }

  render() {

    const mods = {
        page: 1,
        sizePerPageList: [{text: '10', value: 10 },{text: '20', value: 20},
        {text: '50', value: 50},{text: '100', value: 100},{text: 'All', value:wwtpdata.wwtp.length}],
        sizePerPage: 10,
        pageStartIndex: 1,
        paginationSize: 5,
      };

    const filterMod={
      type: 'TextFilter', delay: 10};
    const buttonMod={
      btnGroup: this.createCustomButtonGroup,

    };

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto%',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        border                : '5px solid #0080FF',
        borderRadius          : '4px',
        padding               : '20px'
      }
    };

    return(
      <div>
        <ReactModal
         isOpen={this.state.showModal}
         contentLabel="onRequestClose Example"
         onRequestClose={this.handleCloseModal}
         style={customStyles}>
          <h2>Info</h2>
          <p>This is a mapping of all wastewater treatment plans in California</p>
          <p>taken from State of California Open data. In an attempt to track where</p>
          <p>Wastewater goes in your city, town, and county. </p>
          <p>Designed by Joe Kurokawa </p>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>

        <ReactModal
         isOpen={this.state.showModal1}
         contentLabel="onRequestClose Example"
         onRequestClose={this.handleCloseModal1}
         style={customStyles}>
          <h2>Share</h2>
          <p>Please share this with friends!</p>
          <p>Designed by Joe Kurokawa </p>
          <button onClick={this.handleCloseModal1}>Close Modal</button>
        </ReactModal>

      <BootstrapTable ref='table' data={wwtpdata.wwtp} exportCSV pagination={true}  options={mods} height='600' scrollTop={'Top'}
       search={true} multicolumnSearch={true} searchPlaceholder='Search all Results' options={buttonMod} >
      <TableHeaderColumn width='200' dataField='name' isKey dataSort filter={filterMod}>Name</TableHeaderColumn>
      <TableHeaderColumn width='200' dataField='address' dataSort filter={filterMod} dataSort>Address</TableHeaderColumn>
      <TableHeaderColumn width='200' dataField='city'dataSort filter={filterMod} datasort>City</TableHeaderColumn>
      <TableHeaderColumn width='200' dataField='state' dataSort filter={filterMod} datasort>State</TableHeaderColumn>
      <TableHeaderColumn width='200' dataField='zip' dataSort filter={filterMod} datasort>Zipcode</TableHeaderColumn>
      <TableHeaderColumn width='200' dataField='outfall' dataSort filter={filterMod} datasort>Outfall</TableHeaderColumn>
      <TableHeaderColumn width='200' dataField='level' dataSort filter={filterMod} datasort>Level of Treatment</TableHeaderColumn>
      <TableHeaderColumn width='200' dataField='total' datasort>Total Volume Treated (MGAL)</TableHeaderColumn>
      <TableHeaderColumn width='200' dataField='discharge'datasort>Volume Discharged (MGAL)</TableHeaderColumn>
      <TableHeaderColumn width='200' dataField='total'datasort>Total Volume Treated (MGAL)</TableHeaderColumn>
      <TableHeaderColumn width='200' dataField='recycled_in_area'>Volume Recycled (MGAL)</TableHeaderColumn>
      </BootstrapTable>
      </div>
    );
  }
}

export default App;
