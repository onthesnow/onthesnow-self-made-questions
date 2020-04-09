import React from 'react';
import firebase from "firebase/app";
import "firebase/storage";
import Modal from 'react-modal';
import ClassNames from 'classnames';

import Edit from "./Edit.js";
import ControlList from "./ControlList.js";
import Help from "./Help.js";

Modal.setAppElement('#root')

export default class Control extends React.Component {
    render() {
        return (
            <div>
                <ControlQuestion />
            </div>
        )
    }
}

class ControlQuestion extends React.Component {
    constructor() {
        super();
        this.outputJsonFile = this.outputJsonFile.bind(this);
        this.outputListControler = this.outputListControler.bind(this);
        this.searchControler = this.searchControler.bind(this);
        this.editContentsHandler = this.editContentsHandler.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.searchedListCheck = this.searchedListCheck.bind(this);
        this.allCheckRemove = this.allCheckRemove.bind(this);
        this.state = {
            json: [],
            outputList: [],
            unit: "All",
            difficulty:"All",
            editId: "-1",
            editContents: {},
            modalIsOpen: false,
            helpIsOpen: false
        };
        this.getFireData();
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

    contentsList() {
        let contentsList = [];
        for (let i in this.state.json) {
            const contents = this.state.json[i]
            if (this.searchData(contents)) {
                contentsList.push(
                    <ControlList key={i}
                        contents={contents}
                        index={i}
                        isOutput={this.state.outputList.includes(i)}
                        outputListControl={this.outputListControler}
                        returnId={this.editContentsHandler} />
                )
            }
        }
        return contentsList;
    }

    editContentsHandler(id, contents) {
        this.setState({ editId: id, editContents: contents });
        this.openModal();
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    // json出力
    outputJsonFile() {
        if (this.state.outputList.length === 0) {
            alert("項目を選択してください");
            return;
        }
        let list = {};
        for (let id in this.state.outputList.slice()) {
            list[id] = this.state.json[id]
        }

        const fileName = 'finename.csv';
        const data = new Blob([this.state.outputList.join(",")], { type: 'text/csv' });
        const jsonURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = jsonURL;
        link.setAttribute('download', fileName);
        link.click();
        document.body.removeChild(link);
    }

    // 出力リスト制御
    outputListControler(id, checked) {
        let list = this.state.outputList.slice();
        if (checked) {
            list.push(id);
        } else {
            const index = list.indexOf(id)
            if (index !== -1) {
                list = [...list.slice(0, index), ...list.slice(index + 1)]
            } else {
                return;
            }
        }
        this.setState({
            outputList: list
        })
    }

    // 一括チェック
    searchedListCheck() {
        let list = this.state.outputList.slice();
        for (let id in this.state.json) {
            if (!list.includes(id)) {
                list.push(id)
            }
        }
        this.setState({
            outputList: list
        })
    }

    // 一括チェック外し
    allCheckRemove() {
        let list = this.state.outputList.slice();
        for (let id in this.state.json) {
            const index = list.indexOf(id)
            if (index !== -1) {
                list = [...list.slice(0, index), ...list.slice(index + 1)]
            } else {
                return;
            }
        }
        this.setState({
            outputList: list
        })
    }

    // 検索結果取得 in：contents 合致：true 不一致：false
    searchData(contents) {
        if(contents.delflg){
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
                    <div>
                        <button className="button is-info" onClick={() => { this.editContentsHandler("-1") }}>新しい問題</button>
                        <button className="button is-info" onClick={() => { this.outputJsonFile() }}>問題を出力する</button>
                    </div>
                </div>
                <div className="controlHeaderItems sideBySide">
                    <div>
                        <button className="button is-info" onClick={() => { this.searchedListCheck() }}>一括チェック</button>
                        <button className="button is-info" onClick={() => { this.allCheckRemove() }}>一括解除</button>
                    </div>
                    <div>
                        <button className="button is-info" onClick={() => {this.setState({helpIsOpen:true})}}>使い方</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.json.length === 0) {
            this.getFireData();
        }

        const modal = ClassNames({
            'modal': true,
            'is-active': this.state.modalIsOpen
        })

        const help = ClassNames({
            'modal': true,
            'is-active': this.state.helpIsOpen
        })

        return (
            <div>
                {this.controlHeader()}
                <div className="contentsList" >
                    {
                        this.state.json.length === 0 || this.state.json == null ?
                            <p> データがありません </p> : this.contentsList()
                    }
                </div>
                <div className={modal} id={this.state.editId}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <span className="delete is-large" onClick={this.closeModal}> </span>
                        <Edit id={this.state.editId}
                            contents={this.state.editContents} modalOpen={this.state.modalIsOpen} close={this.closeModal} />
                    </div>
                </div>
                <div className={help}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <span className="delete is-large" onClick={() => {this.setState({helpIsOpen:false})}}> </span>
                        <Help />
                    </div>
                </div>
            </div>
        )
    }
}