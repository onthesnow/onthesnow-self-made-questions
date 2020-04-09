import React from 'react';

export default class Help extends React.Component {
    render(){
        return(
            <div className="contents content">
                <div className="is-small">
                    <h3>問題集について</h3>
                    <p>研修で使える問題の作成および、受講生への配布が行えるページです。自習等にご活用ください。</p>
                    <h3>使い方</h3>
                    <h5>・問題の検索</h5>
                    <p>左上のセレクトボックスから、単元及び難易度の選択ができます。</p>
                    <h5>・難易度</h5>
                    <p>各難易度は以下のレベルを想定しています。</p>
                    <ul>
                        <li>入門：講義で説明する内容と同等。</li>
                        <li>初級：教科書の補足になる内容。</li>
                        <li>中級：教科書を一通り理解する必要のある内容（JavaBronze相当）。</li>
                        <li>上級：それ以上（JavaSilver相当）。</li>
                    </ul>
                    <h5>・一括チェック</h5>
                    <p>表示している問題全てにチェックを入れることができます。</p>
                    <h5>・問題の出力</h5>
                    <p>選択した問題一覧を表示するためのファイルを出力できます。</p>
                    <h5>・問題の編集</h5>
                    <p>新しい問題から新規の問題追加を、編集から既存の問題の編集および削除を行えます。</p>
                </div>
            </div>
        )
    }
}