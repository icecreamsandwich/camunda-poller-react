import React, { Component } from 'react';
import axios from 'axios';
import Cssloader from '../CssLoader';

export default class TaskPolling extends Component {
  state = {
    polled_tasks: '',
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        polled_tasks: '',
      });
      var host = 'http://192.168.1.107:3535';
      axios
        .post(host + '/camunda/pollTasks')
        .then(res => {
          var polled_tasks = JSON.parse(JSON.stringify(res.data));
          //console.log(polled_tasks)
          this.setState({
            polled_tasks: polled_tasks,
          });
        })
        .catch(err => console.log(err));
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    if (!this.state.polled_tasks) {
      return <Cssloader />;
    }
    return (
      <div>
        <React.Fragment>
          <h2 style={{ textAlign: 'center' }}>Camunda Tasks</h2>
          <table className="table_task">
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
          </table>
        </React.Fragment>
      </div>
    );
  }
}
