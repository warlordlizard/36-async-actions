'use strict';

import React from 'react';
import { connect } from 'react-redux';
import ListForm from '../list-form';
import * as util from '../../lib/util.js';
import * as listActions from '../../actions/list-actions.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.listFetch();
  }

  render() {
    return(
      <div className='dashboard'>
        <h2>Game List</h2>
        <ListForm
          onComplete={this.props.listCreate}
          buttonText='Create List' />
        {this.props.lists.map(list => 
          <div key={list._id}>
            <p>{list.name}</p>  
            <button onClick={() => this.props.listDelete(list)}>X</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
  };
};

const mapDispatchToProps = (dispatch) => ({
  listCreate: (list) => dispatch(listActions.listCreateRequest(list)),
  listDelete: (list) => dispatch(listActions.listDeleteRequest(list)),
  listUpdate: (list) => dispatch(listActions.listUpdateRequest(list)),
  listFetch: (list) => dispatch(listActions.listsFetchRequest(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);