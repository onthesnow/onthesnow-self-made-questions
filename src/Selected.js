import React from 'react';
import firebase from "firebase";

import List from './List.js'

export default class Selected extends React.Component {
    constructor() {
        super();
        this.getFile = this.getFile.bind(this);
        this.state = {
            json: []
        };
    }

    contentsList() {
        let contentsList = [];
        let count = 0;
        for (let i in this.state.json) {
            const contents = this.state.json[i]
            contentsList.push(
                <List key={i} contents={contents} index={count++} />
            )
        }
        return contentsList;
    }

    render() {
        return (
            <div>
                <div className="inputFile">
                    <form onSubmit={this.getJson}>
                        <label>
                            Upload file:
                            <input type="file" name="file" onChange={this.getFile} />
                        </label>
                    </form>
                </div>
                <div className="contentsList">
                    {this.state.json.length === 0 || this.state.json == null
                        ? <p></p> : this.contentsList()}
                </div>
            </div>
        )
    }

    getFile(event) {
        if(event.target.files.length ===0){
            return;
        }
        var reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.addEventListener('load', () => {
            const selectedidList = reader.result.split(",");
            for (let index in selectedidList) {
                const id = selectedidList[index];
                let db = firebase.database();
                let ref = db.ref('contentslist');
                ref.orderByKey().equalTo(id).on('value', (snapshot) => {
                    let elm = this.state.json.slice();
                    elm[id] = snapshot.val()[id];
                    this.setState({
                        json:elm
                    })
                })
            }
        })
    }
}