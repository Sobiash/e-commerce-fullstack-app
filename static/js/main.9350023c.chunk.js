(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{205:function(e,a,t){},218:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(25),i=t.n(l),c=t(222),o=t(220),s=t(9),m=t(10),u=t(12),d=t(11),f=t(13),v=function(e){function a(){return Object(s.a)(this,a),Object(u.a)(this,Object(d.a)(a).apply(this,arguments))}return Object(f.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,"home")}}]),a}(r.a.Component),p=function(e){function a(){return Object(s.a)(this,a),Object(u.a)(this,Object(d.a)(a).apply(this,arguments))}return Object(f.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){return r.a.createElement("header",{className:"bck_b_light"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"left"},r.a.createElement("div",{className:"logo"},"Mobiles")),r.a.createElement("div",{className:"right"},r.a.createElement("div",{className:"top"},"Links"),r.a.createElement("div",{className:"bottom"},"Links"))))}}]),a}(r.a.Component),E=function(e){function a(){return Object(s.a)(this,a),Object(u.a)(this,Object(d.a)(a).apply(this,arguments))}return Object(f.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){return r.a.createElement("footer",{className:"bck_b_dark"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"logo"},"Mobile Shop"),r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{className:"left"},r.a.createElement("h2",null,"Contact Information"),r.a.createElement("div",{className:"business_nfo"},r.a.createElement("div",{className:"tag"},r.a.createElement("div",{className:"nfo"},r.a.createElement("div",null,"Address"),r.a.createElement("div",null,"Wiertnicza 91, apt 4"))),r.a.createElement("div",{className:"tag"},r.a.createElement("div",{className:"nfo"},r.a.createElement("div",null,"Phone"),r.a.createElement("div",null,"444 444 444"))),r.a.createElement("div",{className:"tag"},r.a.createElement("div",{className:"nfo"},r.a.createElement("div",null,"Working Hours"),r.a.createElement("div",null,"Mon-Sun / 9am-8pm"))),r.a.createElement("div",{className:"tag"},r.a.createElement("div",{className:"nfo"},r.a.createElement("div",null,"Email"),r.a.createElement("div",null,"se@waves.com"))))),r.a.createElement("div",{className:"left"},r.a.createElement("h2",null,"Be the first to know"),r.a.createElement("div",null,r.a.createElement("div",null,"Get all the information on events, sales and offers."))))))}}]),a}(r.a.Component),h=function(e){function a(){return Object(s.a)(this,a),Object(u.a)(this,Object(d.a)(a).apply(this,arguments))}return Object(f.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(p,null),r.a.createElement("div",{className:"page_container"},this.props.children),r.a.createElement(E,null))}}]),a}(r.a.Component),b=t(219),g=function(e){return r.a.createElement("div",{className:"my_link"},function(){var a="";switch(e.type){case"default":a=r.a.createElement(b.a,Object.assign({className:"link_default",to:e.linkTo},e.addStyles),e.title);break;default:a=""}return a}())},_=function(e){var a=e.data,t=e.change,n=e.id;return r.a.createElement("div",null,function(){var e=null;switch(a.element){case"input":e=r.a.createElement("div",{className:"formBlock"},r.a.createElement("input",Object.assign({},a.config,{value:a.value,onBlur:function(e){return t({event:e,id:n,blur:!0})},onChange:function(e){return t({event:e,id:n})}})),function(){var e=null;return a.validation&&!a.valid&&(e=r.a.createElement("div",{className:"error_label"},a.validationMessage)),e}());break;default:e=null}return e}())},N=t(27),y=function(e,a,t){var n=Object(N.a)({},a),r=Object(N.a)({},n[e.id]);if(r.value=e.event.target.value,e.blur){var l=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],t=[!0,""];if(e.validation.email){var n=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.value),r="".concat(n?"":"Must be a valid email");t=n?t:[n,r]}if(e.validation.confirm){var l=e.value.trim()===a[e.validation.confirm].value,i="".concat(l?"":"Password do not match");t=l?t:[l,i]}if(e.validation.required){var c=""!==e.value.trim(),o="".concat(c?"":"This field is required");t=c?t:[c,o]}return t}(r,a);r.valid=l[0],r.validationMessage=l[1]}return r.touched=e.blur,n[e.id]=r,n},w=function(e,a){var t={};for(var n in e)"confirmPassword"!==n&&(t[n]=e[n].value);return t},O=function(e,a){var t=!0;for(var n in e)t=e[n].value&&t;return t},j=t(223),k=t(26),D=t(50),S=t.n(D),C=function(e){return{type:"register_user",payload:S.a.post("".concat("/api/users","/register"),e).then(function(e){return e.data})}},M=function(e){return{type:"login_user",payload:S.a.post("".concat("/api/users","/login"),e).then(function(e){return e.data})}},q=function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(t=Object(u.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(r)))).state={formError:!1,formSuccess:"",formData:{email:{element:"input",value:"",config:{name:"email_input",type:"email",placeholder:"Enter your email"},validation:{required:!0,email:!0},valid:!1,touched:!1,validationMessage:""},password:{element:"input",value:"",config:{name:"password_input",type:"password",placeholder:"Enter your password"},validation:{required:!0},valid:!1,touched:!1,validationMessage:""}}},t.updateForm=function(e){var a=y(e,t.state.formData,"login");t.setState({formError:!1,formData:a})},t.submitForm=function(e){e.preventDefault();var a=w(t.state.formData,"login");O(t.state.formData,"login")?t.props.dispatch(M(a)).then(function(e){e.payload.loginSuccess?t.props.history.push("/user/dashboard"):t.setState({formError:!0})}):t.setState({formError:!0})},t}return Object(f.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"signin_wrapper"},r.a.createElement("form",{onSubmit:function(a){return e.submitForm(a)}},r.a.createElement(_,{id:"email",data:this.state.formData.email,change:function(a){return e.updateForm(a)}}),r.a.createElement(_,{id:"password",data:this.state.formData.password,change:function(a){return e.updateForm(a)}}),this.state.formError?r.a.createElement("div",{className:"error_label"},"Please check your data"):null,r.a.createElement("button",{onClick:function(a){return e.submitForm(a)}},"Log in")))}}]),a}(r.a.Component),F=Object(k.b)()(Object(j.a)(q)),T=function(){return r.a.createElement("div",{className:"page_wrapper"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"register_login_container"},r.a.createElement("div",{className:"left"},r.a.createElement("h1",null,"New Customers"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt non facilis perferendis, optio rerum cum dolorem in nemo atque accusantium sapiente obcaecati consequatur totam quaerat officiis quisquam cumque laboriosam perspiciatis!"),r.a.createElement(g,{type:"default",title:"Create an account",linkTo:"/register",addStyles:{margin:"10px 0 0 0"}})),r.a.createElement("div",{className:"right"},r.a.createElement("h2",null,"Registered Customers"),r.a.createElement("p",null,"If you have an account, please login."),r.a.createElement(F,null)))))},P=t(84),x=t.n(P),L=function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(t=Object(u.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(r)))).state={formError:!1,formSuccess:!1,formData:{name:{element:"input",value:"",config:{name:"name_input",type:"text",placeholder:"Enter your name"},validation:{required:!0},valid:!1,touched:!1,validationMessage:""},lastname:{element:"input",value:"",config:{name:"lastname_input",type:"text",placeholder:"Enter your lastname"},validation:{required:!0},valid:!1,touched:!1,validationMessage:""},email:{element:"input",value:"",config:{name:"email_input",type:"email",placeholder:"Enter your email"},validation:{required:!0,email:!0},valid:!1,touched:!1,validationMessage:""},password:{element:"input",value:"",config:{name:"password_input",type:"password",placeholder:"Enter your password"},validation:{required:!0},valid:!1,touched:!1,validationMessage:""},confirmPassword:{element:"input",value:"",config:{name:"confirm_password_input",type:"password",placeholder:"Confirm your password"},validation:{required:!0,confirm:"password"},valid:!1,touched:!1,validationMessage:""}}},t.updateForm=function(e){var a=y(e,t.state.formData,"register");t.setState({formError:!1,formData:a})},t.submitForm=function(e){e.preventDefault();var a=w(t.state.formData,"register");O(t.state.formData,"register")?t.props.dispatch(C(a)).then(function(e){e.payload.success?(t.setState({formError:!1,formSuccess:!0}),setTimeout(function(){t.props.history.push("/register_login")},3e3)):t.setState({formError:!0})}).catch(function(e){t.setState({formError:!0})}):t.setState({formError:!0})},t}return Object(f.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"page_wrapper"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"register_login_container"},r.a.createElement("div",{className:"left"},r.a.createElement("form",{onSubmit:function(a){return e.submitForm(a)}},r.a.createElement("h2",null,"Personal information"),r.a.createElement("div",{className:"form_block_two"},r.a.createElement("div",{className:"block"},r.a.createElement(_,{id:"name",data:this.state.formData.name,change:function(a){return e.updateForm(a)}})),r.a.createElement("div",{className:"block"},r.a.createElement(_,{id:"lastname",data:this.state.formData.lastname,change:function(a){return e.updateForm(a)}}))),r.a.createElement("div",null,r.a.createElement("div",{className:"block"},r.a.createElement(_,{id:"email",data:this.state.formData.email,change:function(a){return e.updateForm(a)}}))),r.a.createElement("h2",null,"Verify password"),r.a.createElement("div",{className:"form_block_two"},r.a.createElement("div",{className:"block"},r.a.createElement(_,{id:"password",data:this.state.formData.password,change:function(a){return e.updateForm(a)}})),r.a.createElement("div",{className:"block"},r.a.createElement(_,{id:"confirmPassword",data:this.state.formData.confirmPassword,change:function(a){return e.updateForm(a)}}))),r.a.createElement("div",null,this.state.formError?r.a.createElement("div",{className:"error_label"},"Please check your data"):null,r.a.createElement("button",{onClick:function(a){return e.submitForm(a)}},"Create an account")))))),r.a.createElement(x.a,{open:this.state.formSuccess},r.a.createElement("div",{className:"dialog_alert"},r.a.createElement("div",null,"Congratulations!!"),r.a.createElement("div",null,"You will be redirected to the LOGIN in a few seconds..."))))}}]),a}(n.Component),I=Object(k.b)()(L),B=[{name:"My account",linkTo:"/user/dashboard"},{name:"User information",linkTo:"/user/user_profile"},{name:"My Cart",linkTo:"/user/cart"}],U=function(e){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"user_container"},r.a.createElement("div",{className:"user_left_nav"},r.a.createElement("h2",null,"My account"),r.a.createElement("div",{className:"links"},B.map(function(e,a){return r.a.createElement(b.a,{to:e.linkTo,key:a},e.name)}))),r.a.createElement("div",{className:"user_right"},e.children)),"dashboard")},X=function(){return r.a.createElement(U,null,r.a.createElement("div",null,r.a.createElement("div",{className:"user_nfo_panel"},r.a.createElement("h1",null,"User information"),r.a.createElement("div",null,r.a.createElement("span",null,"name"),r.a.createElement("span",null,"lastname"),r.a.createElement("span",null,"email")),r.a.createElement(g,{type:"default",title:"Edit account info",linkTo:"/user/user_profile"})),r.a.createElement("div",{className:"user_nfo_panel"},r.a.createElement("h1",null,"History Purchases"),r.a.createElement("div",{className:"user_product_block_wrapper"},"history"))))},A=function(){return r.a.createElement(h,null,r.a.createElement(c.a,null,r.a.createElement(o.a,{path:"/user/dashboard",exact:!0,component:X}),r.a.createElement(o.a,{path:"/register",exact:!0,component:I}),r.a.createElement(o.a,{path:"/register_login",exact:!0,component:T}),r.a.createElement(o.a,{path:"/",exact:!0,component:v})))},R=(t(205),t(221)),V=t(18),G=t(85),H=t(86),J=t.n(H),W={},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"register_user":return Object(N.a)({},e,{register:a.payload});case"login_user":return Object(N.a)({},e,{loginSuccess:a.payload});default:return e}},Y=Object(V.c)({user:z}),$=Object(V.e)(Y,{},Object(V.d)(Object(V.a)(J.a,G.a),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()));i.a.render(r.a.createElement(k.a,{store:$},r.a.createElement(R.a,null,r.a.createElement(A,null))),document.getElementById("root"))},87:function(e,a,t){e.exports=t(218)}},[[87,2,1]]]);
//# sourceMappingURL=main.9350023c.chunk.js.map