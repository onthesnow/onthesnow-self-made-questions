(this["webpackJsonpself-made-questions"]=this["webpackJsonpself-made-questions"]||[]).push([[0],{35:function(e,t,n){e.exports=n(56)},40:function(e,t,n){},51:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),c=n(32),r=n.n(c),l=(n(40),n(6)),i=n(7),o=n(8),u=n(9),h=n(24),m=n(14),v=n(18),d=n.n(v),p=n(4),f=function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={flg:!1},a}return Object(i.a)(n,[{key:"render",value:function(){return s.a.createElement("div",{className:"contents content",id:this.props.index},this.question(this.props.contents,this.props.index),this.choices(this.props.contents.choices),this.answer(this.props.contents,this.props.index))}},{key:"question",value:function(e,t){var n=s.a.createElement("div",{className:"question"},s.a.createElement("p",null,s.a.createElement("strong",null,"\u554f\u984c",t+1," (",e.unit,")")),s.a.createElement("p",null,e.question));return n}},{key:"choices",value:function(e){var t=e.map((function(e,t){return s.a.createElement("li",{key:t},t+1,": ",e)})),n=s.a.createElement("div",{className:"choices"},s.a.createElement("ul",null,t));return n}},{key:"comment",value:function(e){var t=e.map((function(e,t){return s.a.createElement("span",{key:t},0!==t&&s.a.createElement("br",null),e)}));return s.a.createElement("span",null,t)}},{key:"answer",value:function(e,t){var n=this,a=this.state.flg,c=s.a.createElement("div",{className:"answer"},s.a.createElement("button",{className:"button is-info",onClick:function(){n.openAnswer()}},"\u56de\u7b54"),a&&s.a.createElement("div",{className:"commentary"},s.a.createElement("p",null,"\u7b54\u3048\uff1a ",e.answer),s.a.createElement("p",null,"\u89e3\u8aac\uff1a",s.a.createElement("br",null),this.comment(e.comment)),s.a.createElement("p",null,e.url)));return c}},{key:"openAnswer",value:function(){var e=this.state.flg;this.setState({flg:!e})}}]),n}(s.a.Component),E=function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).state={json:[]},e.getFireData(),e.handleJsonChange=e.handleJsonChange.bind(Object(p.a)(e)),e}return Object(i.a)(n,[{key:"getFireData",value:function(){var e=d.a.database().ref("contentslist"),t=this;e.orderByKey().on("value",(function(e){t.setState({json:e.val()})}))}},{key:"handleJsonChange",value:function(e){var t=this.state.json.slice();t.push(e),this.setState({json:t})}},{key:"contentsList",value:function(){var e=[],t=0;for(var n in this.state.json){var a=this.state.json[n];e.push(s.a.createElement(f,{key:n,contents:a,index:t++}))}return e}},{key:"render",value:function(){return 0===this.state.json.length&&this.getFireData(),s.a.createElement("div",{className:"contentsList"},0===this.state.json.length||null==this.state.json?s.a.createElement("p",null,"\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093"):this.contentsList())}}]),n}(s.a.Component),b=n(20),j=n(23),g=n.n(j),C=(n(50),function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).handleChange=function(e){a.setState({unit:e.target.unit,question:e.target.question,answer:e.target.answer,comment:e.target.answer})},a.choicesChengeHandler=a.choicesChengeHandler.bind(Object(p.a)(a)),a.deleteChoiceHandler=a.deleteChoiceHandler.bind(Object(p.a)(a)),a.handleChange=a.handleChange.bind(Object(p.a)(a)),a.addFireData=a.addFireData.bind(Object(p.a)(a)),a.state={id:-1,unit:"Java",question:"",choices:["","","","",""],answer:1,comment:[],url:"",json:[]},a}return Object(i.a)(n,[{key:"choicesChengeHandler",value:function(e,t){var n=this.state.choices.slice();n[e]=t,this.setState({choices:n})}},{key:"addChoices",value:function(){var e=this.state.choices.slice();e.push(""),this.setState({choices:e})}},{key:"deleteChoiceHandler",value:function(e){var t=this.state.choices.slice();t=[].concat(Object(b.a)(t.slice(0,e)),Object(b.a)(t.slice(e+1))),this.setState({choices:t})}},{key:"createAnswer",value:function(){var e=this,t=this.state.choices.map((function(e,t){return s.a.createElement("option",{key:t,value:t+1},t+1)}));return s.a.createElement("select",{name:"answer",value:this.state.answer,onChange:function(t){return e.setState({answer:t.target.value})}},t)}},{key:"clear",value:function(){this.setState({unit:"Java",question:"",choices:["","","","",""],answer:1,comment:[],url:"",json:[]})}},{key:"addFireData",value:function(){var e=(new Date).getTime(),t=g.a.database().ref("contentslist"),n=this.state.comment;t.push({id:e,unit:this.state.unit||"",question:this.state.question||"",choices:this.state.choices||"",answer:this.state.answer||"",comment:n.split("\n")||"",url:this.state.url||""}),this.clear()}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("div",{className:"addQuestion"},s.a.createElement("table",null,s.a.createElement("tbody",null,s.a.createElement("tr",null,s.a.createElement("th",null,"\u5358\u5143"),s.a.createElement("th",null,s.a.createElement("select",{name:"unit",value:this.state.unit,onChange:function(t){return e.setState({unit:t.target.value})}},s.a.createElement("option",{value:"Java"},"Java"),s.a.createElement("option",{value:"Oracle"},"Oracle"),s.a.createElement("option",{value:"HTML/CSS"},"HTML/CSS")))),s.a.createElement("tr",null,s.a.createElement("th",null,"\u554f\u984c\u6587"),s.a.createElement("th",null,s.a.createElement("textarea",{name:"question",value:this.state.question,onChange:function(t){return e.setState({question:t.target.value.replace(/\r?\n/g,"")})}}))),this.state.choices.map((function(t,n){return s.a.createElement(y,{key:n,index:n,choice:t,changeChoice:e.choicesChengeHandler,deleteChoice:e.deleteChoiceHandler})})),s.a.createElement("tr",null,s.a.createElement("th",null,"\u7b54\u3048"),s.a.createElement("th",null,this.createAnswer())),s.a.createElement("tr",null,s.a.createElement("th",null,"\u89e3\u8aac"),s.a.createElement("th",null,s.a.createElement("textarea",{name:"comment",value:this.state.comment,onChange:function(t){return e.setState({comment:t.target.value})}}))),s.a.createElement("tr",null,s.a.createElement("th",null,"URL"),s.a.createElement("th",null,s.a.createElement("input",{type:"text",name:"url",value:this.state.url,onChange:function(t){return e.setState({url:t.target.value})}}))))),s.a.createElement("button",{onClick:function(){e.addChoices()}},"\u9078\u629e\u80a2\u3092\u5897\u3084\u3059"),s.a.createElement("button",{onClick:function(){e.clear()}},"\u30af\u30ea\u30a2"),s.a.createElement("button",{onClick:this.addFireData},"\u8ffd\u52a0")),s.a.createElement(k,null))}}]),n}(s.a.Component)),y=function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).changeChoice=a.changeChoice.bind(Object(p.a)(a)),a.deleteChoice=a.deleteChoice.bind(Object(p.a)(a)),a}return Object(i.a)(n,[{key:"changeChoice",value:function(e){this.props.changeChoice(this.props.index,e.target.value)}},{key:"deleteChoice",value:function(e){this.props.deleteChoice(e)}},{key:"render",value:function(){var e=this;return s.a.createElement("tr",null,s.a.createElement("th",null,this.props.index+1),s.a.createElement("th",null,s.a.createElement("input",{type:"text",value:this.props.choice,onChange:this.changeChoice}),s.a.createElement("button",{onClick:function(){e.deleteChoice(e.props.index)}},"\u524a\u9664")))}}]),n}(s.a.Component),k=function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).outputJsonFile=e.outputJsonFile.bind(Object(p.a)(e)),e.outputListControler=e.outputListControler.bind(Object(p.a)(e)),e.searchControler=e.searchControler.bind(Object(p.a)(e)),e.state={json:[],outputList:[],unit:"All"},e.getFireData(),e}return Object(i.a)(n,[{key:"getFireData",value:function(){var e=g.a.database().ref("contentslist"),t=this;e.orderByKey().on("value",(function(e){t.setState({json:e.val()})}))}},{key:"contentsList",value:function(){var e=[];for(var t in this.state.json){var n=this.state.json[t];("All"===this.state.unit||n.unit===this.state.unit)&&e.push(s.a.createElement(O,{key:t,contents:n,index:t,outputListControl:this.outputListControler}))}return e}},{key:"outputJsonFile",value:function(){if(0!==this.state.outputList.length){var e={};for(var t in this.state.outputList.slice())e[t]=this.state.json[t];var n=new Blob([this.state.outputList.join(",")],{type:"text/csv"}),a=window.URL.createObjectURL(n),s=document.createElement("a");document.body.appendChild(s),s.href=a,s.setAttribute("download","finename.csv"),s.click(),document.body.removeChild(s)}else alert("\u9805\u76ee\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044")}},{key:"outputListControler",value:function(e,t){console.log(e+" : "+t);var n=this.state.outputList.slice();if(t)n.push(e);else{var a=n.indexOf(e);if(-1===a)return;n=[].concat(Object(b.a)(n.slice(0,a)),Object(b.a)(n.slice(a+1)))}this.setState({outputList:n})}},{key:"searchControler",value:function(){var e=this;return s.a.createElement("select",{name:"unit",value:this.state.unit,onChange:function(t){return e.setState({unit:t.target.value,outputList:[]})}},s.a.createElement("option",{value:"All"},"All"),s.a.createElement("option",{value:"Java"},"Java"),s.a.createElement("option",{value:"Oracle"},"Oracle"),s.a.createElement("option",{value:"HTML/CSS"},"HTML/CSS"))}},{key:"render",value:function(){var e=this;return 0===this.state.json.length&&this.getFireData(),s.a.createElement("div",null,s.a.createElement("button",{className:"button is-info",onClick:function(){e.outputJsonFile()}},"\u51fa\u529b"),this.searchControler(),s.a.createElement("div",{className:"contentsList"},0===this.state.json.length||null==this.state.json?s.a.createElement("p",null,"\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093"):this.contentsList()))}}]),n}(s.a.Component),O=function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).deleteQuestion=a.deleteQuestion.bind(Object(p.a)(a)),a.changeCheckbox=a.changeCheckbox.bind(Object(p.a)(a)),a.state={checked:!1},a}return Object(i.a)(n,[{key:"deleteQuestion",value:function(){var e=this.props.index;g.a.database().ref("contentslist/"+e).remove()}},{key:"changeCheckbox",value:function(){var e=!this.state.checked;this.props.outputListControl(this.props.index,e),this.setState({checked:e})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"contents content",id:this.props.index},s.a.createElement("input",{type:"checkbox",checked:this.state.checked,onChange:function(){return e.changeCheckbox()}}),this.question(this.props.contents,this.props.index),this.choices(this.props.contents.choices),this.answer(this.props.contents,this.props.index),s.a.createElement("button",{className:"button is-info",onClick:function(){e.deleteQuestion()}},"\u524a\u9664"))}},{key:"question",value:function(e,t){var n=s.a.createElement("div",{className:"question"},s.a.createElement("p",null,s.a.createElement("strong",null,"\u554f\u984cID:",t," (",e.unit,")")),s.a.createElement("p",null,e.question));return n}},{key:"choices",value:function(e){var t=e.map((function(e,t){return s.a.createElement("li",{key:t},t+1,": ",e)})),n=s.a.createElement("div",{className:"choices"},s.a.createElement("ul",null,t));return n}},{key:"comment",value:function(e){var t=e.map((function(e,t){return s.a.createElement("span",{key:t},0!==t&&s.a.createElement("br",null),e)}));return s.a.createElement("span",null,t)}},{key:"answer",value:function(e,t){var n=s.a.createElement("div",{className:"answer"},s.a.createElement("div",{className:"commentary"},s.a.createElement("p",null,"\u7b54\u3048\uff1a ",e.answer),s.a.createElement("p",null,"\u89e3\u8aac\uff1a",s.a.createElement("br",null),this.comment(e.comment)),s.a.createElement("p",null,e.url)));return n}}]),n}(s.a.Component),w=function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).getFile=e.getFile.bind(Object(p.a)(e)),e.state={json:[]},e}return Object(i.a)(n,[{key:"contentsList",value:function(){var e=[],t=0;for(var n in this.state.json){var a=this.state.json[n];e.push(s.a.createElement(f,{key:n,contents:a,index:t++}))}return e}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("div",{className:"inputFile"},s.a.createElement("form",{onSubmit:this.getJson},s.a.createElement("label",null,"Upload file:",s.a.createElement("input",{type:"file",name:"file",onChange:this.getFile})))),s.a.createElement("div",{className:"contentsList"},0===this.state.json.length||null==this.state.json?s.a.createElement("p",null):this.contentsList()))}},{key:"getFile",value:function(e){var t=this;if(0!==e.target.files.length){var n=new FileReader;n.readAsText(e.target.files[0]),n.addEventListener("load",(function(){var e=n.result.split(","),a=function(n){var a=e[n];d.a.database().ref("contentslist").orderByKey().equalTo(a).on("value",(function(e){var n=t.state.json.slice();n[a]=e.val()[a],t.setState({json:n})}))};for(var s in e)a(s)}))}}}]),n}(s.a.Component),x=(n(51),"/onthesnow-self-made-questions"),L=function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(h.a,null,s.a.createElement(S,null),s.a.createElement("div",null,s.a.createElement(m.c,null,s.a.createElement(m.a,{path:x,exact:!0,component:w}),s.a.createElement(m.a,{path:x+"/all",component:E}),s.a.createElement(m.a,{path:x+"/control",component:C}))),s.a.createElement(q,null)))}}]),n}(s.a.Component),S=function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return s.a.createElement("div",{className:"header hero is-info is-bold"},s.a.createElement("div",{className:"hero-body"},s.a.createElement("div",{className:"container"},s.a.createElement("h1",{className:"title"},"\u81ea\u4f5c\u554f\u984c\u96c6")),s.a.createElement(h.b,{to:x+"/control"},s.a.createElement("button",null,"control")),s.a.createElement(h.b,{to:x},s.a.createElement("button",null,"list"))))}}]),n}(s.a.Component),q=function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"content has-text-centered"},"2020 \xa9snow quartz"))}}]),n}(s.a.Component);d.a.initializeApp({apiKey:"AIzaSyDOvPrCTOH1q6xwhvQlQpDX4BCgNx6JHD4",authDomain:"self-made-questions.firebaseapp.com",databaseURL:"https://self-made-questions.firebaseio.com",projectId:"self-made-questions",storageBucket:"self-made-questions.appspot.com",messagingSenderId:"996121708938",appId:"1:996121708938:web:a75824951877640f6e6073",measurementId:"G-38GKMPYRY3"});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[35,1,2]]]);
//# sourceMappingURL=main.7f527b5e.chunk.js.map