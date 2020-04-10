import React from 'react';

export default class ControlList extends React.Component {
    constructor(props) {
        super(props);
        this.changeCheckbox = this.changeCheckbox.bind(this);
        this.state = ({
            checked: this.props.isOutput,
            questionIsOpen: false
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
            <div className="contents controlContents content" id={this.props.index}>
                <div className="controlCOntents_2">
                    <div>
                        <input type="checkbox" checked={this.state.checked}
                            onChange={() => this.changeCheckbox()} />
                    </div>
                    <div>
                        {this.summery(this.props.contents, this.props.index)}
                        {this.state.questionIsOpen &&
                            <div>
                                {this.question(this.props.contents)}
                                {this.choices(this.props.contents.choices)}
                                {this.answer(this.props.contents, this.props.index)}
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <button className="button is-info" onClick={() => { this.editQuestion() }}>編集</button>
                </div>
            </div>
        )
    }

    summery(contents, index) {
        const style = {
            paddingTop : "3px"
        }
        const summery = (
            <div className="summary">
                <div className="questionOpenButton vcenter" onClick={() => { this.setState({ questionIsOpen: !this.state.questionIsOpen }) }}>
                    <span className="icon">
                        {this.state.questionIsOpen
                            ? <i className="fas fa-minus-square fa-lg"></i>
                            : <i className="fas fa-plus-square fa-lg"></i>
                        }
                    </span>
                </div>
                <div>
                    <p><strong>問題ID :{index} ({contents.unit}：{contents.difficulty})<br />
                        <span style={style}>概要： {contents.summary}</span></strong></p>
                </div>
            </div>
        )
        return summery;
    }

    question(contents) {
        const question = (
            <div className="question">
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
        const answer = (
            <div className="answer">
                <div className="commentary">
                    <p>答え： {contents.answer}</p>
                    {this.comment(contents.comment)}
                    {contents.url.indexOf('http') !== -1
                    ? <p>参考： <a href={contents.url} target="_blank" rel="noopener noreferrer">{contents.url}</a></p>
                    : <p>参考： {contents.url}</p>
                    }
                </div>
            </div>
        )
        return answer;
    }

    static getDerivedStateFromProps(props, state) {
        return ({
            checked: props.isOutput
        })
    }
}