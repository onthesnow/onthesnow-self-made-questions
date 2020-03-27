import React from 'react';

export default class List extends React.Component {
    contentsList() {
        const contentsList = this.props.json.map((contents, index) => {
            return (
                <ListContents key={contents.question} contents={contents} index={index} />
            );
        });
        return contentsList;
    }

    render() {
        return (
            <div className="contentsList">
                {this.contentsList()}
            </div>
        )
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
                <li key={index}>{choice.no}: {choice.choice}</li>
            );
        });
        const choices = (
            <div className="choices">
                <ul>{choiceList}</ul>
            </div>
        )

        return choices
    }

    answer(contents, index) {
        const flg = this.state.flg;

        const answer = (
            <div className="answer">
                <button className="button is-info" onClick={() => { this.openAnswer() }}>回答</button>
                {flg &&
                    <div className="commentary">
                        <p>答え： {contents.answer}</p>
                        <p>解説：<br />{contents.comment}</p>
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