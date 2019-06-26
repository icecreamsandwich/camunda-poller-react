import React, { Component } from 'react';
import { connect } from './Socket';
import Cssloader from '../CssLoader';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
/* import axios from 'axios'; */

export default class ExternalTaskPolling extends Component {
  state = {
    external_tasks: '',
  };
  componentDidMount() {
    connect(message => {
      console.log(message);
      this.setState({
        external_tasks: message, //JSON.stringify(message)
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    if (!this.state.external_tasks) {
      return <Cssloader />;
    } else {
      var external_tasks_ar = JSON.parse(this.state.external_tasks);
      var rows = [];
      external_tasks_ar.map(items => {
        rows.push({
          activityId: items.activityId,
          executionId: items.executionId,
          processDefinitionId: items.processDefinitionId,
          processInstanceId: items.processInstanceId,
        });
        return rows;
      });
      var data = {
        columns: [
          {
            label: 'activityId',
            field: 'activityId',
            sort: 'asc',
            width: 150,
          },
          {
            label: 'executionId',
            field: 'executionId',
            sort: 'asc',
            width: 150,
          },
          {
            label: 'processDefinitionId',
            field: 'processDefinitionId',
            sort: 'asc',
            width: 150,
          },
          {
            label: 'processInstanceId',
            field: 'processInstanceId',
            sort: 'asc',
            width: 150,
          },
        ],
        rows: rows,
      };
    }
    return (
      <div>
        <h2>External Tasks</h2>
        {/* <table className="table">
          <tbody>
            <tr>
              <th>activityId</th>
              <th>executionId</th>
              <th>processDefinitionId</th>
              <th>processInstanceId</th>
              <th>lockExpirationTime</th>
            </tr>

            {external_tasks_ar && external_tasks_ar.length > 0
              ? external_tasks_ar.map(items => {
                return (
                  <React.Fragment key={items.id}>
                    <tr>
                      <td>{items.activityId}</td>
                      <td>{items.executionId}</td>
                      <td>{items.processDefinitionId}</td>
                      <td>{items.processInstanceId}</td>
                      <td>{items.lockExpirationTime}</td>
                    </tr>
                  </React.Fragment>
                );
              })
              : ''}
          </tbody>
        </table> */}
        <MDBDataTable striped bordered small hover data={data} />
      </div>
    );
  }
}
