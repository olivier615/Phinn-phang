"use strict";(self["webpackChunkweek8"]=self["webpackChunkweek8"]||[]).push([[203],{7203:function(a,t,n){n.r(t),n.d(t,{default:function(){return U}});var s=n(6252),e=n(9963);const i={class:"navbar navbar-expand-lg navbar-light"},o={class:"container-fluid"},l=(0,s.Uk)("後台"),r=(0,s._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,s._)("span",{class:"navbar-toggler-icon"})],-1),c={class:"collapse navbar-collapse",id:"navbarSupportedContent"},u={class:"navbar-nav me-auto mb-2 mb-lg-0"},d={class:"nav-item"},p=(0,s.Uk)("訂單列表"),v={class:"nav-item"},h=(0,s.Uk)("產品列表"),k={class:"nav-item"},m=(0,s.Uk)("優惠券列表"),g={class:"nav-item"},b=(0,s.Uk)("文章列表"),_={class:"nav-item"},f=(0,s.Uk)("返回前台");function w(a,t,n,w,$,L){const C=(0,s.up)("router-link"),U=(0,s.up)("router-view");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("nav",i,[(0,s._)("div",o,[(0,s.Wm)(C,{class:"navbar-brand",to:"/admin"},{default:(0,s.w5)((()=>[l])),_:1}),r,(0,s._)("div",c,[(0,s._)("ul",u,[(0,s._)("li",d,[(0,s.Wm)(C,{class:"nav-link",to:"/admin/orders"},{default:(0,s.w5)((()=>[p])),_:1})]),(0,s._)("li",v,[(0,s.Wm)(C,{class:"nav-link",to:"/admin/products"},{default:(0,s.w5)((()=>[h])),_:1})]),(0,s._)("li",k,[(0,s.Wm)(C,{class:"nav-link",to:"/admin/coupons"},{default:(0,s.w5)((()=>[m])),_:1})]),(0,s._)("li",g,[(0,s.Wm)(C,{class:"nav-link",to:"/admin/articles"},{default:(0,s.w5)((()=>[b])),_:1})]),(0,s._)("li",_,[(0,s.Wm)(C,{class:"nav-link",to:"/index"},{default:(0,s.w5)((()=>[f])),_:1})]),(0,s._)("li",null,[(0,s._)("a",{class:"nav-link",onClick:t[0]||(t[0]=(0,e.iM)(((...a)=>L.signout&&L.signout(...a)),["prevent"]))},"登出")])])])])]),$.isLogin?((0,s.wg)(),(0,s.j4)(U,{key:0})):(0,s.kq)("",!0)],64)}var $={data(){return{url:"https://vue3-course-api.hexschool.io/v2",path:"otispath",isLogin:!1}},methods:{checkAdmin(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)otisToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common["Authorization"]=a,a?this.$http.post(`${this.url}/api/user/check`).then((a=>{this.isLogin=!0})).catch(this.isLogin=!1,this.$router.push("/Login")):(alert("尚未登入"),this.isLogin=!1,this.$router.push("/Login"))},signout(){document.cookie="otisToken=;expires=;",alert("已登出後台"),this.$router.push("/login")}},mounted(){this.checkAdmin()}},L=n(3744);const C=(0,L.Z)($,[["render",w]]);var U=C}}]);
//# sourceMappingURL=203.382d46a0.js.map