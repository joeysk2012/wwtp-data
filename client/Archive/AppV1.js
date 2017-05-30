import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var ReactBsTable =require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import '../public/css/react-bootstrap-table.css';
import wwtpdata from '../Data/wwtp_ca.json';
import Modal from './Modal';
import InfoButton from './InfoButton';

/*this version of App is old and it includes examples of how to a scratch made modal
and scratch made button*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isModalOpen: false,
        isInfoOpen: false
    }
  }

createCustomButtonGroup = props =>{
  return (
    <div className="btn-group" sizeClass='btn-group-md'>
      {props.exportCSVBtn}
        <button type='button'className={'btn btn-info'}>
          Info
        </button>
        <button type='button'
          className={'btn btn-basic' }>
          Share
        </button>
        <button type='button'
          className={'btn btn-info' }>
          Leave Feedback
        </button>
        </div>
        );
    }


    openModal() {
      this.setState({ isModalOpen: true })
    }

    closeModal() {
      this.setState({ isModalOpen: false })
    }

        this.setState(prevState => ({
          isInfoOpen: !prevState.isInfoOpen
        }));
        console.log(this.state.isInfoOpen)
    }

    closeInfo(){
      console.log("unclicked")
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
      btnGroup: this.createCustomButtonGroup
    };

    return(
      <div>
      <button onClick={() => this.openModal()}>Open modal</button>
      <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
      <h1>Modal title</h1>
      <p>hello</p>
      <p><button onClick={() => this.closeModal()}>Close</button></p>
      </Modal>

      <button onClick={() => this.openInfo()}>Info</button>
      <InfoButton isOpen={this.state.isInfoOpen} />


      <BootstrapTable ref='table' data={wwtpdata.wwtp} pagination={true}  options={mods} height='600' scrollTop={'Top'}
       search={true} multicolumnSearch={true} searchPlaceholder='Search all Results' exportCSV={true} options={buttonMod}>
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
