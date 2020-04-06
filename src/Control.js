import React from 'react';
import firebase from "firebase/app";
import "firebase/storage";

export default class Control extends React.Component {
    constructor(props) {
        super(props)
        this.choicesChengeHandler = this.choicesChengeHandler.bind(this);
        this.deleteChoiceHandler = this.deleteChoiceHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addFireData = this.addFireData.bind(this);
        this.state = {
            id: -1,
            unit: "Java",
            question: "",
            choices: ["", "", "", "", ""],
            answer: 1,
            comment: [],
            url: "",
            json: []
        }
    }

    choicesChengeHandler(index, choice) {
        let choices = this.state.choices.slice();
        choices[index] = choice;
        this.setState({ choices })
    }

    handleChange = (event) => {
        this.setState({
            unit: event.target.unit,
            question: event.target.question,
            answer: event.target.answer,
            comment: event.target.answer
        })
    }

    addChoices() {
        let choices = this.state.choices.slice();
        choices.push("");
        this.setState({ choices })
    }

    deleteChoiceHandler(index) {
        let choices = this.state.choices.slice();
        choices = [...choices.slice(0, index), ...choices.slice(index + 1)]
        this.setState({ choices })
    }

    createAnswer() {
        const choiceList = this.state.choices;
        const answer = choiceList.map((choice, index) => {
            return (
                <option key={index} value={index + 1}>{index + 1}</option>
            )
        });
        return (
            <select name="answer" value={this.state.answer}
                onChange={(e) => this.setState({ answer: e.target.value })}>
                {answer}
            </select>
        );
    }

    clear() {
        this.setState({
            unit: "Java",
            question: "",
            choices: ["", "", "", "", ""],
            answer: 1,
            comment: [],
            url: "",
            json: []
        })
    }

    // データ追加処理
    addFireData() {
        let id = new Date().getTime();
        let db = firebase.database();
        let ref = db.ref("contentslist");
        let comment = this.state.comment;
        ref.push({
            id: id,
            unit: this.state.unit || '',
            question: this.state.question || '',
            choices: this.state.choices || '',
            answer: this.state.answer || '',
            comment: comment.split('\n') || '',
            url: this.state.url || ''
        })
        this.clear();
    }

    render() {
        return (
            <div>
                <div className="addQuestion">
                    <table>
                        <tbody>
                            <tr>
                                <th>単元</th>
                                <th>
                                    <select name="unit" value={this.state.unit}
                                        onChange={(e) => this.setState({ unit: e.target.value })}>
                                        <option value="Java">Java</option>
                                        <option value="Oracle">Oracle</option>
                                        <option value="HTML/CSS">HTML/CSS</option>
                                    </select>
                                </th>
                            </tr>
                            <tr>
                                <th>問題文</th>
                                <th>
                                    <textarea name="question" value={this.state.question}
                                        onChange={(e) => this.setState({ question: e.target.value.replace(/\r?\n/g, "") })} />
                                </th>
                            </tr>
                            {this.state.choices.map((choice, index) => (
                                <Choices key={index} index={index} choice={choice}
                                    changeChoice={this.choicesChengeHandler} deleteChoice={this.deleteChoiceHandler} />
                            ))}
                            <tr>
                                <th>答え</th>
                                <th>
                                    {this.createAnswer()}
                                </th>
                            </tr>
                            <tr>
                                <th>解説</th>
                                <th>
                                    <textarea name="comment" value={this.state.comment}
                                        onChange={(e) => this.setState({ comment: e.target.value })} />
                                </th>
                            </tr>
                            <tr>
                                <th>URL</th>
                                <th>
                                    <input type="text" name="url" value={this.state.url}
                                        onChange={(e) => this.setState({ url: e.target.value })} />
                                </th>
                            </tr>

                        </tbody>
                    </table>
                    <button onClick={() => { this.addChoices() }}>選択肢を増やす</button>
                    <button onClick={() => { this.clear() }}>クリア</button>
                    <button onClick={this.addFireData}>追加</button>
                </div>
                <ControlQuestion />
            </div>
        )
    }
}

class Choices extends React.Component {
    constructor(props) {
        super(props);
        this.changeChoice = this.changeChoice.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
    }

    changeChoice(e) {
        this.props.changeChoice(this.props.index, e.target.value);
    }

    deleteChoice(index) {
        this.props.deleteChoice(index);
    }

    render() {
        return (
            <tr>
                <th>{this.props.index + 1}</th>
                <th>
                    <input type="text" value={this.props.choice} onChange={this.changeChoice} />
                    <button onClick={() => { this.deleteChoice(this.props.index) }}>削除</button>
                </th>
            </tr>
        )
    }
}

class ControlQuestion extends React.Component {
    constructor() {
        super();
        this.outputJsonFile = this.outputJsonFile.bind(this);
        this.outputListControler = this.outputListControler.bind(this);
        this.searchControler = this.searchControler.bind(this);
        this.state = {
            json: [],
            outputList: [],
            unit: "All"
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
            if(this.state.unit === "All"){
                contentsList.push(
                    <ListContents key={i} contents={contents} index={i} outputListControl={this.outputListControler} />
                )
            }else if(contents.unit === this.state.unit){
                contentsList.push(
                    <ListContents key={i} contents={contents} index={i} outputListControl={this.outputListControler} />
                )
            }
        }
        return contentsList;
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
        // const data = new Blob([JSON.stringify(this.state.outputList.join(','))], { type: 'text/csv' });
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
            <select name="unit" value={this.state.unit}
                onChange={(e) => this.setState({ unit: e.target.value, outputList: [] })}>
                <option value="All">All</option>
                <option value="Java">Java</option>
                <option value="Oracle">Oracle</option>
                <option value="HTML/CSS">HTML/CSS</option>
            </select>
        )
    }

    render() {
        if (this.state.json.length === 0) {
            this.getFireData();
        }

        return (
            <div>
                <button className="button is-info" onClick={() => { this.outputJsonFile() }}>出力</button>
                {this.searchControler()}
                <div className="contentsList">
                    {this.state.json.length === 0 || this.state.json == null
                        ? <p>データがありません</p> : this.contentsList()}
                </div>
            </div>
        )
    }
}

class ListContents extends React.Component {
    constructor(props) {
        super(props);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.changeCheckbox = this.changeCheckbox.bind(this);
        this.state = ({
            checked: false
        })
    }

    deleteQuestion() {
        let id = this.props.index;
        let db = firebase.database();
        let ref = db.ref("contentslist/" + id);
        ref.remove();
    }

    changeCheckbox() {
        const checked = !this.state.checked;
        this.props.outputListControl(this.props.index, checked);

        this.setState({
            checked: checked
        })
    }

    render() {
        return (
            <div className="contents content" id={this.props.index}>
                <input type="checkbox" checked={this.state.checked}
                    onChange={() => this.changeCheckbox()} />
                {this.question(this.props.contents, this.props.index)}
                {this.choices(this.props.contents.choices)}
                {this.answer(this.props.contents, this.props.index)}
                <button className="button is-info" onClick={() => { this.deleteQuestion() }}>削除</button>
            </div>
        )
    }

    question(contents, index) {
        const question = (
            <div className="question">
                <p><strong>問題ID:{index} ({contents.unit})</strong></p>
                <p>{contents.question}</p>
            </div>
        )
        return question;
    }

    choices(list) {
        const choiceList = list.map((choice, index) => {
            return (
                <li key={index}>{index + 1}: {choice}</li>
            );
        });
        const choices = (
            <div className="choices">
                <ul>{choiceList}</ul>
            </div>
        )

        return choices
    }

    comment(comments) {
        const commentList = comments.map((comment, index) => {
            return (
                <span key={index}>{index !== 0 && <br />}{comment}</span>
            )
        });
        return (
            <span>{commentList}</span>
        )
    }

    answer(contents, index) {
        const answer = (
            <div className="answer">
                <div className="commentary">
                    <p>答え： {contents.answer}</p>
                    <p>解説：<br />{this.comment(contents.comment)}</p>
                    <p>{contents.url}</p>
                </div>
            </div>
        )
        return answer;
    }
}