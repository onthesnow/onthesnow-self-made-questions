(this["webpackJsonpself-made-questions"]=this["webpackJsonpself-made-questions"]||[]).push([[0],{22:function(e,n,t){e.exports=t(35)},27:function(e,n,t){},28:function(e){e.exports=JSON.parse('[{"unit":"Java","question":"\u6b21\u306e\u3046\u3061\u30ea\u30c6\u30e9\u30eb\u3068\u3057\u3066\u6b63\u3057\u304f\u306a\u3044\u3082\u306e\u306f\u3069\u308c\u304b\u30021\u3064\u9078\u3079\u3002","choices":[{"no":1,"choice":"\u201cchar\u201d"},{"no":2,"choice":"3.14d"},{"no":3,"choice":"987.654f"},{"no":4,"choice":"0b11122222"},{"no":5,"choice":"1.23456789L"}],"answer":5,"comment":"long\u30ea\u30c6\u30e9\u30eb\u8868\u8a18\u306b\u4f7f\u3046L\u306f\u6574\u6570\u306b\u3057\u304b\u3064\u3051\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u305b\u3093\u3002<br>2\u306fdouble\u30ea\u30c6\u30e9\u30eb\u3067\u3042\u308b\u3053\u3068\u3092\u793a\u3059d\u304c\u4ed8\u3044\u3066\u3044\u307e\u3059\u3002<br>\u306f0b\u304c\u4ed8\u304f\u30682\u9032\u6570\u3068\u3057\u3066\u8a8d\u8b58\u3057\u3066\u304f\u308c\u307e\u3059\u3002","url":""},{"unit":"Java","question":"\u554f\u984c\uff12\u3001\u6b21\u306e\u3046\u3061\u30ea\u30c6\u30e9\u30eb\u3068\u3057\u3066\u6b63\u3057\u304f\u306a\u3044\u3082\u306e\u306f\u3069\u308c\u304b\u30021\u3064\u9078\u3079\u3002","choices":[{"no":1,"choice":"\uff12\u756a"},{"no":2,"choice":"3.14d"},{"no":3,"choice":"987.654f"},{"no":4,"choice":"0b11111111"},{"no":5,"choice":"1.23456789L"}],"answer":5,"comment":"long\u30ea\u30c6\u30e9\u30eb\u8868\u8a18\u306b\u4f7f\u3046L\u306f\u6574\u6570\u306b\u3057\u304b\u3064\u3051\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u305b\u3093\u3002<br>2\u306fdouble\u30ea\u30c6\u30e9\u30eb\u3067\u3042\u308b\u3053\u3068\u3092\u793a\u3059d\u304c\u4ed8\u3044\u3066\u3044\u307e\u3059\u3002<br>4\u306f0b\u304c\u4ed8\u304f\u30682\u9032\u6570\u3068\u3057\u3066\u8a8d\u8b58\u3057\u3066\u304f\u308c\u307e\u3059\u3002","url":""},{"unit":"Java","question":"\u554f\u984c\uff13\u6b21\u306e\u3046\u3061\u30ea\u30c6\u30e9\u30eb\u3068\u3057\u3066\u6b63\u3057\u304f\u306a\u3044\u3082\u306e\u306f\u3069\u308c\u304b\u30021\u3064\u9078\u3079\u3002","choices":[{"no":1,"choice":"\uff13\u756a"},{"no":2,"choice":"3.14d"},{"no":3,"choice":"987.654f"},{"no":4,"choice":"0b11111111"},{"no":5,"choice":"1.23456789L"}],"answer":5,"comment":"long\u30ea\u30c6\u30e9\u30eb\u8868\u8a18\u306b\u4f7f\u3046L\u306f\u6574\u6570\u306b\u3057\u304b\u3064\u3051\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u305b\u3093\u3002<br>2\u306fdouble\u30ea\u30c6\u30e9\u30eb\u3067\u3042\u308b\u3053\u3068\u3092\u793a\u3059d\u304c\u4ed8\u3044\u3066\u3044\u307e\u3059\u3002<br>4\u306f0b\u304c\u4ed8\u304f\u30682\u9032\u6570\u3068\u3057\u3066\u8a8d\u8b58\u3057\u3066\u304f\u308c\u307e\u3059\u3002","url":""}]')},29:function(e,n,t){},35:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t.n(a),o=t(18),r=t.n(o),i=(t(27),t(5)),s=t(6),l=t(7),u=t(8),m=t(19),h=t(9),d=t(12),v=function(e){Object(u.a)(a,e);var n=Object(l.a)(a);function a(){var e;return Object(i.a)(this,a),(e=n.call(this)).getJson=function(){var n=t(28);e.setState({json:n})},e.state={json:[]},e.handleJsonChange=e.handleJsonChange.bind(Object(d.a)(e)),e}return Object(s.a)(a,[{key:"handleJsonChange",value:function(e){var n=this.state.json.slice();n.push(e),this.setState({json:n})}},{key:"contentsList",value:function(){var e=this.state.json.map((function(e,n){return c.a.createElement(b,{key:e.question,contents:e,index:n})}));return e}},{key:"render",value:function(){return c.a.createElement("div",{className:"contentsList"},this.contentsList())}},{key:"componentWillMount",value:function(){this.getJson()}}]),a}(c.a.Component),b=function(e){Object(u.a)(t,e);var n=Object(l.a)(t);function t(e){var a;return Object(i.a)(this,t),(a=n.call(this,e)).state={flg:!1,contents:e.contents,index:e.index},a}return Object(s.a)(t,[{key:"render",value:function(){var e=this.state,n=e.contents,t=e.index;return c.a.createElement("div",{className:"contents content",id:t},this.question(n,t),this.choices(n.choices),this.answer(n,t))}},{key:"question",value:function(e,n){var t=c.a.createElement("div",{className:"question"},c.a.createElement("p",null,c.a.createElement("strong",null,"\u554f\u984c",n+1," (",e.unit,")")),c.a.createElement("p",null,e.question));return t}},{key:"choices",value:function(e){var n=e.map((function(e,n){return c.a.createElement("li",{key:n},e.no,": ",e.choice)})),t=c.a.createElement("div",{className:"choices"},c.a.createElement("ul",null,n));return t}},{key:"answer",value:function(e,n){var t=this,a=this.state.flg,o=c.a.createElement("div",{className:"answer"},c.a.createElement("button",{className:"button is-info",onClick:function(){t.openAnswer()}},"\u56de\u7b54"),a&&c.a.createElement("div",{className:"commentary"},c.a.createElement("p",null,"\u7b54\u3048\uff1a ",e.answer),c.a.createElement("p",null,"\u89e3\u8aac\uff1a",c.a.createElement("br",null),e.comment),c.a.createElement("p",null,e.url)));return o}},{key:"openAnswer",value:function(){var e=this.state.flg;this.setState({flg:!e})}}]),t}(c.a.Component),f=function(e){Object(u.a)(t,e);var n=Object(l.a)(t);function t(){return Object(i.a)(this,t),n.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement("div",null,"control")}}]),t}(c.a.Component),p=(t(29),function(e){Object(u.a)(t,e);var n=Object(l.a)(t);function t(){return Object(i.a)(this,t),n.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"App"},c.a.createElement(E,null),c.a.createElement(m.a,null,c.a.createElement("div",null,c.a.createElement(h.c,null,c.a.createElement(h.a,{path:"/onthesnow-self-made-questions",exact:!0,component:v}),c.a.createElement(h.a,{path:"/control",component:f})))),c.a.createElement(j,null))}}]),t}(c.a.Component)),E=function(e){Object(u.a)(t,e);var n=Object(l.a)(t);function t(){return Object(i.a)(this,t),n.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"header hero is-info is-bold"},c.a.createElement("div",{className:"hero-body"},c.a.createElement("div",{className:"container"},c.a.createElement("h1",{className:"title"},"\u81ea\u4f5c\u554f\u984c\u96c6"))))}}]),t}(c.a.Component),j=function(e){Object(u.a)(t,e);var n=Object(l.a)(t);function t(){return Object(i.a)(this,t),n.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"content has-text-centered"},"2020 \xa9snow quartz"))}}]),t}(c.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.dbfad5a1.chunk.js.map