(this["webpackJsonpnew-astro-spec"]=this["webpackJsonpnew-astro-spec"]||[]).push([[0],{112:function(e,t,a){e.exports=a(199)},117:function(e,t,a){},118:function(e,t,a){},197:function(e,t,a){},199:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(73),o=a.n(c),i=(a(117),a(118),a(20)),r=a(21),s=a(23),m=a(22),u=a(24),d=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.sectionName;return l.a.createElement("li",{className:"nav-item p-1"},l.a.createElement("a",{href:"../public/index.html"},l.a.createElement("span",{className:"title"},e)))}}]),t}(l.a.Component),h=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return l.a.createElement("nav",{className:"col-lg-2 col-md-2 col-sm-2 col-xs-2",role:"navagation"},l.a.createElement("div",{className:"sidebar-sticky"},l.a.createElement("div",{className:"sidebar-inner"},l.a.createElement("ul",{className:"nav flex-column nav-pills nav-stacked","data-spy":"affix","data-offset-top":"205"},l.a.createElement("li",{className:"text-center"},l.a.createElement("a",{href:"../publicindex.html"},l.a.createElement("h1",null,"AstroSpec2"))),l.a.createElement(d,{sectionName:"Dashboard"}),l.a.createElement(d,{sectionName:"Images"}),l.a.createElement(d,{sectionName:"Documents"})))))}}]),t}(l.a.Component),p=a(201),E=(a(119),a(120),a(55)),b=a.n(E),f=a(107),v=a.n(f),g=(a(197),function(e){var t=e.dataUri,a=e.isFullscreen?"demo-image-preview-fullscreen":"";return l.a.createElement("div",{className:"demo-image-preview "+a},l.a.createElement("img",{src:t}))}),N=a(108),k=a.n(N),y=(a(198),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).handleButtonClick=function(e){a.setState({isActionSheetVisible:!0,actionSheetTarget:e.itemElement})},a.onActionSheetItemClick=function(e){a.setState({isActionSheetVisible:!1}),"Photo Library"==e.itemData.text?(console.log("File!"),a.refs.fileUploader.click()):"Take Photo"==e.itemData.text&&(console.log("Photo!"),a.setState({photoMode:!0}))},a.handleTakePhoto=function(e){console.log("takePhoto"),a.setState({dataUri:e})},a.handleCancelClick=function(){a.setState({isActionSheetVisible:!1}),console.log("Quit")},a.handleFileUpload=function(e){a.setState({file:URL.createObjectURL(e.target.files[0])})},a.handleRestore=function(e){a.setState({file:null,photoMode:!1})},a.state={isActionSheetVisible:!1,actionSheetTarget:"",file:null,photoMode:!1,dataUri:""},a}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return l.a.createElement(p.a,null,l.a.createElement("div",{className:"col-md-12 col-lg-12"},l.a.createElement("div",{className:"panel panel-default"},l.a.createElement("div",{className:"panel-heading"},"Image"),l.a.createElement("div",{className:"panel-body"},l.a.createElement("h3",null,"Select image"),l.a.createElement("button",{type:"button",className:"btn-lg btn-default",onClick:this.handleButtonClick},"File..."),l.a.createElement(b.a,{title:"Choose action",usePopover:!0,visible:this.state.isActionSheetVisible,target:this.state.actionSheetTarget,onItemClick:this.onActionSheetItemClick,onCancelClick:this.handleCancelClick},l.a.createElement(E.Item,{text:"Take Photo"}),l.a.createElement(E.Item,{text:"Photo Library"})),l.a.createElement("input",{type:"file",id:"file",ref:"fileUploader",onChange:this.handleFileUpload,style:{display:"none"}}),l.a.createElement("div",null,this.state.photoMode&&(this.state.dataUri?l.a.createElement(g,{dataUri:this.state.dataUri,isFullscreen:!1}):l.a.createElement(v.a,{onTakePhoto:this.handleTakePhoto,isFullscreen:!1}))),!this.state.photoMode&&l.a.createElement("div",null,l.a.createElement("img",{src:this.state.file})),l.a.createElement(k.a,{src:this.state.file}),l.a.createElement("p",{className:"help-block"},"Take photo with lens attachment"),l.a.createElement("form",{className:"form-inline"},l.a.createElement("div",{className:"btn-toolbar"},l.a.createElement("button",{type:"button",className:"btn btn-primary btn-lg"},"Crop"),l.a.createElement("button",{type:"button",className:"btn btn-info btn-lg"},"Spectrum"),l.a.createElement("button",{type:"button",className:"btn btn-danger btn-lg",onClick:this.handleRestore},"Restore")))))))}}]),t}(l.a.Component)),j=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"col-md-8"},l.a.createElement("div",{className:"panel panel-primary"},l.a.createElement("div",{className:"panel-heading"},"Spectrum"),l.a.createElement("div",{className:"panel-body"},l.a.createElement("img",{id:"SpecImage",src:"",className:"img-responsive"}),l.a.createElement("canvas",{id:"CanInvis",className:"hidden"}))))}}]),t}(l.a.Component),O=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{class:"col-md-4"},l.a.createElement("div",{class:"panel panel-warning"},l.a.createElement("div",{class:"panel-heading"},"Tag"),l.a.createElement("div",{class:"panel-body"},l.a.createElement("form",{role:"form"},l.a.createElement("div",{class:"form-group"},l.a.createElement("select",{id:"lampselect",class:"form-control"},l.a.createElement("option",null,"1"),l.a.createElement("option",null,"2"),l.a.createElement("option",null,"3"),l.a.createElement("option",null,"4"),l.a.createElement("option",null,"5"),l.a.createElement("option",null,"6"),l.a.createElement("option",null,"7"),l.a.createElement("option",null,"Incandescent"),l.a.createElement("option",null,"Flourescent"),l.a.createElement("option",null,"Halogen"),l.a.createElement("option",null,"Sun")))))))}}]),t}(l.a.Component);var S=function(){return l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"container-fluid"},l.a.createElement(h,null),l.a.createElement("div",{className:"col-lg-10 col-md-10 col-sm-10 col-xs-10"},l.a.createElement("main",null,l.a.createElement("div",null,l.a.createElement("h1",null,"AST 1001: AstroSpec"),l.a.createElement("p",{className:"text-center"},"Compute one-dimensional cut across images and display spectrum.")),l.a.createElement(y,null),l.a.createElement("div",{className:"row"},l.a.createElement(j,null),l.a.createElement(O,null))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[112,1,2]]]);
//# sourceMappingURL=main.ed6062ae.chunk.js.map