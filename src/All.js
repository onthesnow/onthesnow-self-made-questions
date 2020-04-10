import React from 'react';
import firebase from "firebase";

import List from './List.js'

export default class All extends React.Component {
    constructor() {
        super();
        this.state = {
            json: [],
            unit: "All",
            difficulty: "All"
        };
        this.getFireData();
        this.handleJsonChange = this.handleJsonChange.bind(this);
    }

    getFireData() {
        let db = firebase.database();
        let ref = db.ref('contentslist');
        let self = this;
        ref.orderByKey().on('value', (snapshot) => {
            self.setState({
                json: snapshot.val()
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
        for (let i in this.state.json) {
            const contents = this.state.json[i]
            if (this.searchData(contents)) {
                contentsList.push(
                    <List key={i} contents={contents} index={count++} />
                )
            }
        }
        return contentsList;
    }

    // 検索結果取得 in：contents 合致：true 不一致：false
    searchData(contents) {
        if (contents.delflg) {
            return false
        }
        if (this.state.unit !== "All") {
            if (contents.unit !== this.state.unit) {
                return false
            }
        }
        if (this.state.difficulty !== "All") {
            if (contents.difficulty !== this.state.difficulty) {
                return false
            }
        }

        return true
    }

    // 検索機能表示
    searchControler() {
        return (
            <div className="sideBySide searchItems">
                <div className="vcenter">
                    <p>単元：</p>
                </div>
                <div className="select">
                    <select name="unit" value={this.state.unit} onChange={(e) => this.setState({ unit: e.target.value })} >
                        <option value="All" > All </option>
                        <option value="Java" > Java </option>
                        <option value="Oracle" > Oracle </option>
                        <option value="HTML/CSS" > HTML / CSS </option>
                        <option value="IT基礎" > IT基礎 </option>
                    </select>
                </div>
                <div className="vcenter">
                    <p>難易度：</p>
                </div>
                <div className="select">
                    <select name="difficulty" value={this.state.difficulty} onChange={(e) => this.setState({ difficulty: e.target.value })} >
                        <option value="All" > All </option>
                        <option value="入門" > 入門 </option>
                        <option value="初級" > 初級 </option>
                        <option value="中級" > 中級 </option>
                        <option value="上級" > 上級 </option>
                    </select>
                </div>
            </div>
        )
    }

    // ヘッダー
    controlHeader() {
        return (
            <div className="contentsHeader">
                <div className="controlHeaderItems sideBySide">
                    <div>
                        {this.searchControler()}
                    </div>
                </div>
            </div>
        )
    }


    render() {
        if (this.state.json.length === 0) {
            this.getFireData();
        }

        return (
            <div>
                {this.controlHeader()}

                <div className="contentsList">
                    {this.state.json.length === 0 || this.state.json == null
                        ? <p>データがありません</p> : this.contentsList()}
                </div>
            </div>
        )
    }
}