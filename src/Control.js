import React from 'react';
import firebase from "firebase/app";
import "firebase/storage";
import Modal from 'react-modal';

import Edit from "./Edit.js";
import ControlList from "./ControlList.js";

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
        this.state = {
            json: [],
            outputList: [],
            unit: "All",
            editId: "-1",
            editContents: {},
            modalIsOpen: false
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
            if (this.state.unit === "All" || contents.unit === this.state.unit) {
                contentsList.push(
                    <ControlList key={i}
                        contents={contents}
                        index={i}
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
        console.log(id + " : " + checked)
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

    // 検索機能
    searchControler() {
        return (
            <div>
                <div className="select">
                    <select name="unit" value={this.state.unit} onChange={(e) => this.setState({ unit: e.target.value, outputList: [] })} >
                        <option value="All" > All </option>
                        <option value="Java" > Java </option>
                        <option value="Oracle" > Oracle </option>
                        <option value="HTML/CSS" > HTML / CSS </option>
                    </select>
                </div>
            </div>
        )
    }

    // ヘッダー
    controlHeader() {
        return (
            <div className="contentsHeader">
                <div>
                    {this.searchControler()}
                </div>
                <div>
                    <button className="button is-info" onClick={() => { this.editContentsHandler("-1") }}>新しい問題</button>
                    <button className="button is-info" onClick={() => { this.outputJsonFile() }}>問題を出力する</button>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.json.length === 0) {
            this.getFireData();
        }

        return (
            <div> {this.controlHeader()}
                <div className="contentsList" >
                    {
                        this.state.json.length === 0 || this.state.json == null ?
                            <p> データがありません </p> : this.contentsList()
                    }
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal.bind(this)}
                    style={modalStyles}
                    contentLabel="edit question" >
                    <span className="delete" onClick={this.closeModal}> </span>
                    <Edit id={this.state.editId}
                        contents={this.state.editContents} />
                </Modal>
            </div>
        )
    }
}

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        position: 'absolute',
        height: '900px',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#c1e4e9',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        zIndex: '-1'
    }
};