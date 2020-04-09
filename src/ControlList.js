import React from 'react';

export default class ControlList extends React.Component {
    constructor(props) {
        super(props);
        this.changeCheckbox = this.changeCheckbox.bind(this);
        this.state = ({
            checked: this.props.isOutput
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
            <div className="contents controlContents" id={this.props.index}>
                <div className="controlCOntents_2">
                    <div>
                        <input type="checkbox" checked={this.state.checked}
                            onChange={() => this.changeCheckbox()} />
                    </div>
                    <div>
                        {this.question(this.props.contents, this.props.index)}
                        {this.choices(this.props.contents.choices)}
                        {this.answer(this.props.contents, this.props.index)}
                    </div>
                </div>
                <div>
                    <button className="button is-info" onClick={() => { this.editQuestion() }}>編集</button>
                </div>
            </div>
        )
    }

    question(contents, index) {
        const question = (
            <div className="question">
                <p><strong>問題ID:{index} ({contents.unit})</strong></p>
                <p>{contents.question}</p>
                {contents.code === "" || contents.code === undefined || contents.code === null ? <span></span>:
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
        const commentList = comments.map((comment, index) => {
            return (
                <span key={index}>{index !== 0 && <br />}{comment}</span>
            )
        });
        return (
            <div className="commentList">{commentList}</div>
        )
    }

    answer(contents, index) {
        const answer = (
            <div className="answer">
                <div className="commentary">
                    <p>答え： {contents.answer}</p>
                    <p>解説：<br />{this.comment(contents.comment)}</p>
                    <p>参考： {contents.url}</p>
                </div>
            </div>
        )
        return answer;
    }

    static getDerivedStateFromProps(props, state) {
        return({
            checked: props.isOutput
        })
    }
}