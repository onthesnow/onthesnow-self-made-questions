import React from 'react';
import firebase from "firebase/app";
import "firebase/storage";

export default class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.choicesChengeHandler = this.choicesChengeHandler.bind(this);
        this.deleteChoiceHandler = this.deleteChoiceHandler.bind(this);
        this.addFireData = this.addFireData.bind(this);
        this.editFireData = this.editFireData.bind(this);
        this.state = {
            unit: "Java",
            difficulty: "入門",
            question: "",
            code: [],
            choices: ["", "", "", "", ""],
            answer: 1,
            comment: [],
            url: "",
            json: [],
            editFlg: "false"
        }
    }

    choicesChengeHandler(index, choice) {
        let choices = this.state.choices.slice();
        choices[index] = choice;
        this.setState({ choices })
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

    codehandleChange(e) {
        const rawText = e.target.value;
        const rawTextList = rawText.split('\n');
        let inputTextList = rawTextList.map((text) => {
            return (
                text.replace(/[\d]+\s\|\t/, "")
            )
        })
        let code = "";
        for (let i = 0; i < inputTextList.length; i++) {
            code += ('000' + (i + 1)).slice(-3) + ' |\t' + inputTextList[i];
            if (i !== inputTextList.length - 1) {
                code += '\n';
            }
        }
        this.setState({ code })
    }

    clear() {
        this.setState({
            unit: "Java",
            question: "",
            code: [],
            choices: ["", "", "", "", ""],
            answer: 1,
            comment: [],
            url: "",
            json: []
        })
    }

    // 項目の入力チェックを行う。不可の場合アラートを出してfalseを返す
    inputCheck() {
        if (this.state.unit === "") {
            alert("単元を選択してください");
            return false;
        }
        if (this.state.question === "") {
            alert("問題文を入力してください");
            return false;
        }
        if (this.state.choices.length <= 1) {
            alert("二つ以上の選択肢を使用してください");
            return false;
        }
        for (let i = 0; i < this.state.choices.length; i++) {
            if (this.state.choices[i] === "") {
                alert("未入力の選択肢があります")
                return false;
            }
        }
        if (this.state.answer === "") {
            alert("答えを選択してください");
            return false;
        }
        if (this.state.comment === "") {
            alert("解説を入力して下さい");
            return false;
        }

        return true
    }

    // データ追加処理
    addFireData() {
        if (!this.inputCheck()) { return; }
        let db = firebase.database();
        let ref = db.ref("contentslist");
        let comment = this.state.comment;
        ref.push({
            unit: this.state.unit || '',
            difficulty: this.state.difficulty || '',
            question: this.state.question || '',
            code: this.state.code || '',
            choices: this.state.choices || '',
            answer: this.state.answer || '',
            comment: comment || '',
            url: this.state.url || ''
        })
        this.clear();
        this.props.close();
        alert("問題を追加しました")
    }

    // データ編集処理
    editFireData() {
        if (!this.inputCheck()) { return; }
        const id = this.props.id;
        if (!window.confirm("問題ID：" + id + "を編集しますか？")) {
            return;
        }
        let db = firebase.database();
        let ref = db.ref("contentslist/" + id);
        let comment = this.state.comment;
        ref.set({
            unit: this.state.unit || '',
            difficulty: this.state.difficulty || '',
            question: this.state.question || '',
            code: this.state.code || '',
            choices: this.state.choices || '',
            answer: this.state.answer || '',
            comment: comment || '',
            url: this.state.url || ''
        })
        this.props.close();
        alert("問題を編集しました")
    }

    // データ削除
    deleteQuestion() {
        const id = this.props.id;
        if (!window.confirm("問題ID：" + id + "を削除しますか？")) {
            return;
        }
        let db = firebase.database();
        let ref = db.ref("contentslist/" + id);
        ref.set({
            unit: this.props.contents.unit || '',
            difficulty: this.props.contents.difficulty || '',
            question: this.props.contents.question || '',
            code: this.props.contents.code || '',
            choices: this.props.contents.choices || '',
            answer: this.props.contents.answer || '',
            comment:  this.props.contents.comment || '',
            url: this.props.contents.url || '',
            delflg: true
        });
        this.props.close();
        alert("問題を削除しました")
    }

    editCansel() {
        this.props.close();
    }

    // ヘッダー
    editHeader() {
        return (
            <div className="contentsHeader sideBySide">
                <div className="editButton">
                    <button className="button is-info" onClick={() => { this.addChoices() }}>選択肢を増やす</button>
                    <button className="button is-info" onClick={() => { this.clear() }}>クリア</button>
                </div>
                <div>
                    {
                        this.props.id === "-1"
                            ? <button className="button is-info" onClick={this.addFireData}>問題を追加する</button>
                            :
                            <div>
                                <button className="button is-info" onClick={this.editFireData}>問題を編集する</button>
                                <button className="button is-info" onClick={() => { this.deleteQuestion() }}>問題を削除する</button>
                            </div>
                    }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.editHeader()}
                <div className="addQuestion">
                    <table>
                        <tbody>
                            <tr>
                                <th className="questionLabel">単元</th>
                                <th>
                                    <div className="select">
                                        <select name="unit" value={this.state.unit}
                                            onChange={(e) => this.setState({ unit: e.target.value })}>
                                            <option value="Java">Java</option>
                                            <option value="Oracle">Oracle</option>
                                            <option value="HTML/CSS">HTML/CSS</option>
                                            <option value="IT基礎" > IT基礎 </option>
                                        </select>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="questionLabel">難易度</th>
                                <th>
                                    <div className="select">
                                        <select name="difficulty" value={this.state.difficulty} onChange={(e) => this.setState({ difficulty: e.target.value })} >
                                            <option value="入門" > 入門 </option>
                                            <option value="初級" > 初級 </option>
                                            <option value="中級" > 中級 </option>
                                            <option value="上級" > 上級 </option>
                                        </select>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="questionLabel">問題文<br /><small>(改行不可)</small></th>
                                <th>
                                    <textarea className="textarea" name="question" value={this.state.question}
                                        onChange={(e) => this.setState({ question: e.target.value.replace(/\r?\n/g, "") })} />
                                </th>
                            </tr>
                            <tr>
                                <th className="questionLabel">コード<br /><small>(*1)</small></th>
                                <th>
                                    <textarea className="textarea" name="code" value={this.state.code}
                                        onChange={(e) => this.codehandleChange(e)} />
                                </th>
                            </tr>
                            {this.state.choices.map((choice, index) => (
                                <Choices key={index} index={index} choice={choice}
                                    changeChoice={this.choicesChengeHandler} deleteChoice={this.deleteChoiceHandler} />
                            ))}
                            <tr>
                                <th className="questionLabel">答え</th>
                                <th>
                                    <div className="select">
                                        {this.createAnswer()}
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="questionLabel">解説</th>
                                <th>
                                    <textarea className="textarea" name="comment" value={this.state.comment}
                                        onChange={(e) => this.setState({ comment: e.target.value })} />
                                </th>
                            </tr>
                            <tr>
                                <th className="questionLabel">参考</th>
                                <th>
                                    <input className="input" type="text" name="url" value={this.state.url}
                                        onChange={(e) => this.setState({ url: e.target.value })} />
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <p><small>(*1) 可能な限りテキストエディタ等で書いたものを貼り付けてください</small></p>
                </div>
            </div>
        )
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.modalOpen) {
            return ({
                id: "-1",
                unit: "Java",
                difficulty: "入門",
                question: "",
                code: [],
                choices: ["", "", "", "", ""],
                answer: 1,
                comment: [],
                url: "",
                editFlg: false
            })
        } else if (props.modalOpen && state.editFlg) {
            return (null)
        }

        if (props.id === "-1") {
            return ({
                id: "-1",
                unit: "Java",
                difficulty: "入門",
                question: "",
                code: [],
                choices: ["", "", "", "", ""],
                answer: 1,
                comment: [],
                url: "",
                editFlg: true
            })
        } else {
            return ({
                id: props.contents.id,
                unit: props.contents.unit,
                difficulty: props.contents.difficulty,
                question: props.contents.question,
                code: props.contents.code,
                choices: props.contents.choices,
                answer: props.contents.answer,
                comment: props.contents.comment,
                url: props.contents.url,
                editFlg: true
            })
        }
    }
}

Edit.defaultProps = {
    id: "-1",
    contents: '',
    editFlg: false
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
                <th className="questionLabel">{this.props.index + 1}</th>
                <th>
                    <input className="input" type="text" value={this.props.choice} onChange={this.changeChoice} />
                    <button className="button" onClick={() => { this.deleteChoice(this.props.index) }}>削除</button>
                </th>
            </tr>
        )
    }
}
