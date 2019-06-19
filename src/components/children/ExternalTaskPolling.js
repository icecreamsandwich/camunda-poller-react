import React, { Component } from 'react'
//import axios from 'axios';
import { connect } from './Socket';
import Cssloader from '../CssLoader';

export default class ExternalTaskPolling extends Component {
   state = {
       external_tasks : ""
   }
    componentDidMount() {
        this.timer = setInterval(
            () => {
                connect(message => {
                    console.log(message);
                    this.setState({
                        external_tasks : JSON.stringify(message)
                    })
                })
            },
            5000,
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        if(!this.state.external_tasks){
            return(<Cssloader />);
        }
        return (
            <div>
                <h2>External Tasks</h2>
                {this.state.external_tasks && this.state.external_tasks.length > 0 ?
                    this.state.external_tasks.map(items => {
                        return (
                            <React.Fragment>
                            <p>{items.activityId}</p>
                            <p>{items.activityInstanceId}</p>
                            </React.Fragment>
                        )
                    })
                    : ''}
            </div>
        )
    }
}
