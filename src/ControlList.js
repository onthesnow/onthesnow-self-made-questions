import React from 'react';

export default class ControlList extends React.Component {
    constructor(props) {
        super(props);
        this.changeCheckbox = this.changeCheckbox.bind(this);
        this.state = ({
            checked: false
        })
    }

    editQuestion() {
        this.props.returnId(this.props.index, this.props.contents);
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
                <button className="button is-info" onClick={() => { this.editQuestion() }}>編集</button>
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