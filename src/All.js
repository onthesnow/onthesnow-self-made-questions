import React from 'react';
import firebase from "firebase";

import List from './List.js'

export default class All extends React.Component {
    constructor() {
        super();
        this.state = {
            json: []
        };
        this.getFireData();
        this.handleJsonChange = this.handleJsonChange.bind(this);
    }

    getFireData(){
        let db = firebase.database();
        let ref = db.ref('contentslist');
        let self = this;
        ref.orderByKey().on('value',(snapshot)=>{
            self.setState({
                json:snapshot.val()
            })
        })
    }

    handleJsonChange(json) {
        let li = this.state.json.slice();
        li.push(json);
        this.setState({ json: li })
    }

    contentsList() {
        let contentsList = [];
        let count = 0;
        for(let i in this.state.json){
            const contents = this.state.json[i]
            contentsList.push(
                <List key={i} contents={contents} index={count++} />
            )
        }
        return contentsList;
    }

    render() {
        if(this.state.json.length === 0){
            this.getFireData();
        }

        return (
            <div className="contentsList">
                {this.state.json.length === 0 || this.state.json == null
                    ? <p>データがありません</p> : this.contentsList()}
            </div>
        )
    }
}