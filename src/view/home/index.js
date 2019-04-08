import React, {Component} from 'react';
import './index.scss'

export default class Home extends Component {
    state = {
        noSelect: false,
        a: '',
        options: {
            a: {
                c: null,
                e: 'hello'
            },
            b: 2
        }
    }
    hover = ()=>{
        console.log(1222)
        this.setState({
            a: Math.random()* 5,
            noSelect: true,
        })
    }
    render() {
        const {options} = this.state;
        if(options?.a){
            console.log('good')
        }
        return (
            <div onMouseLeave={this.hover}>
                ...home {this.state.a}
            </div>
        );
    }
}
