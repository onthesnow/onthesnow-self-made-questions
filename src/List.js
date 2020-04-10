import React from 'react';

export default class ListContents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flg: false
        }
    }

    render() {
        return (
            <div className="contents content" id={this.props.index}>
                {this.question(this.props.contents, this.props.index)}
                {this.choices(this.props.contents.choices)}
                {this.answer(this.props.contents, this.props.index)}
            </div>
        )
    }

    question(contents, index) {
        const question = (
            <div className="question">
                <p><strong>問題{index + 1} ({contents.unit}：{contents.difficulty})</strong></p>
                <p>{contents.question}</p>
                {contents.code === "" || contents.code === undefined || contents.code === null ? <span></span> :
                    <div className="codebox">
                        <p>{contents.code}</p>
                    </div>
                }
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
        return (
            <div>解説：<br />
                <p className="commentList">{comments}</p>
            </div>
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
                        {this.comment(contents.comment)}
                        {contents.url.indexOf('http') !== -1
                            ? <p>参考： <a href={contents.url} target="_blank" rel="noopener noreferrer">{contents.url}</a></p>
                            : <p>参考： {contents.url}</p>
                        }
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