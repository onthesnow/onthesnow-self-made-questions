import React from 'react';
import firebase from "firebase";

export default class List extends React.Component {
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
                <ListContents key={i} contents={contents} index={count++} />
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

    componentWillMount() {
        // this.getJson();
    }

    getJson = () => {
        const json = require("./contents.json");
        this.setState({
            json: json
        });
    }
}

class ListContents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flg: false,
            contents: props.contents,
            index: props.index
        }
    }

    render() {
        const { contents, index } = this.state
        return (
            <div className="contents content" id={index}>
                {this.question(contents, index)}
                {this.choices(contents.choices)}
                {this.answer(contents, index)}
            </div>
        )
    }

    question(contents, index) {
        const question = (
            <div className="question">
                <p><strong>問題{index + 1} ({contents.unit})</strong></p>
                <p>{contents.question}</p>
            </div>
        )
        return question;
    }

    choices(list) {
        const choiceList = list.map((choice, index) => {
            return (
                <li key={index}>{index+1}: {choice}</li>
            );
        });
        const choices = (
            <div className="choices">
                <ul>{choiceList}</ul>
            </div>
        )

        return choices
    }

    comment(comments){
        const commentList = comments.map((comment, index) => {
            return(
            <span key={index}>{index !== 0 && <br/>}{comment}</span>
            )
        });
        return(
            <span>{commentList}</span>
        )
    }

    answer(contents, index) {
        const flg = this.state.flg;

        const answer = (
            <div className="answer">
                <button className="button is-info" onClick={() => { this.openAnswer() }}>回答</button>
                {flg &&
                    <div className="commentary">
                        <p>答え： {contents.answer}</p>
                        <p>解説：<br />{this.comment(contents.comment)}</p>
                        <p>{contents.url}</p>
                    </div>
                }
            </div>
        )
        return answer;
    }

    openAnswer() {
        const flg = this.state.flg;
        this.setState({
            flg: !flg
        })
    }
}