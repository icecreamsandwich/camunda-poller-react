import React, { Component } from 'react';
import axios from 'axios';
import Cssloader from '../CssLoader';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default class TaskPolling extends Component {
  state = {
    polled_tasks: '',
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        polled_tasks: '',
      });
      var host = process.env.REACT_APP_HOST_URL + ':3535';
      axios
        .post(host + '/camunda/pollTasks')
        .then(res => {
          var polled_tasks = JSON.parse(JSON.stringify(res.data));
          this.setState({
            polled_tasks: polled_tasks,
          });
        })
        .catch(err => console.log(err));
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    if (!this.state.polled_tasks) {
      return <Cssloader />;
    } else {
      var task_ar = this.state.polled_tasks;
      var rows = [];
      task_ar.map(items => {
        rows.push({
          TaskId: items.id,
          TaskName: items.name,
          processInstanceId: items.processInstanceId,
          taskDefinitionKey: items.taskDefinitionKey,
        });
        return rows;
      });
      var data = {
        columns: [
          {
            label: 'TaskId',
            field: 'TaskId',
            sort: 'asc',
            width: 150,
          },
          {
            label: 'TaskName',
            field: 'TaskName',
            sort: 'asc',
            width: 150,
          },
          {
            label: 'processInstanceId',
            field: 'processInstanceId',
            sort: 'asc',
            width: 150,
          },
          {
            label: 'taskDefinitionKey',
            field: 'taskDefinitionKey',
            sort: 'asc',
            width: 150,
          },
        ],
        rows: rows,
      };
    }
    return (
      <div>
        <React.Fragment>
          <h2 style={{ textAlign: 'center' }}>Camunda Tasks</h2>
          {/* <table className="table_task">
            <tbody>
              <tr>
                <th>Task Id</th>
                <th>Task Name</th>
                <th>processInstanceId</th>
                <th>taskDefinitionKey</th>
              </tr>

              {this.state.polled_tasks && this.state.polled_tasks.length > 0
                ? this.state.polled_tasks.map(items => {
                    return (
                      <React.Fragment key={items.id}>
                        <tr>
                          <td>{items.id}</td>
                          <td>{items.name}</td>
                          <td>{items.processInstanceId}</td>
                          <td>{items.taskDefinitionKey}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })
                : ''}
            </tbody>
          </table> */}
          <MDBDataTable striped bordered small hover data={data} />
        </React.Fragment>
      </div>
    );
  }
}
