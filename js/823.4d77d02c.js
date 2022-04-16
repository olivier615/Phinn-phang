"use strict";(self["webpackChunkweek8"]=self["webpackChunkweek8"]||[]).push([[823],{9280:function(t,e,a){a.d(e,{Z:function(){return g}});var i=a(6252),l=a(3577),n=a(9963);const s={"aria-label":"Page navigation example"},d={class:"pagination"},o=["onClick"];function r(t,e,a,r,c,p){return(0,i.wg)(),(0,i.iD)("nav",s,[(0,i._)("ul",d,[(0,i._)("li",{class:(0,l.C_)(["page-item",{disabled:!a.pages.has_pre}])},[(0,i._)("a",{class:"page-link",href:"#",onClick:e[0]||(e[0]=(0,n.iM)((e=>t.$emit("getProducts",a.pages.current_page-1)),["prevent"]))},"上一頁")],2),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(a.pages.total_pages,(e=>((0,i.wg)(),(0,i.iD)("li",{class:(0,l.C_)(["page-item",{active:e===a.pages.current_page}]),key:"page"+e},[(0,i._)("a",{class:"page-link",href:"#",onClick:(0,n.iM)((a=>t.$emit("getProducts",e)),["prevent"])},(0,l.zw)(e),9,o)],2)))),128)),(0,i._)("li",{class:(0,l.C_)(["page-item",{disabled:!a.pages.has_next}])},[(0,i._)("a",{class:"page-link",href:"#",onClick:e[1]||(e[1]=(0,n.iM)((e=>t.$emit("getProducts",a.pages.current_page+1)),["prevent"]))},"下一頁")],2)])])}var c={props:["pages"]},p=a(3744);const u=(0,p.Z)(c,[["render",r]]);var g=u},7823:function(t,e,a){a.r(e),a.d(e,{default:function(){return Y}});var i=a(6252),l=a(3577);const n=(0,i._)("h2",null,"後台-文章列表",-1),s={class:"container"},d={class:"text-end mt-4"},o=(0,i.Uk)(" 建立新的文章 "),r={class:"table mt-4"},c=(0,i._)("thead",null,[(0,i._)("tr",null,[(0,i._)("th",{width:"120"},"名稱"),(0,i._)("th",{width:"60"},"標籤"),(0,i._)("th",{width:"60"},"作者"),(0,i._)("th",{width:"120"},"建立時間"),(0,i._)("th",{width:"120"},"發布"),(0,i._)("th",{width:"120"},"編輯")])],-1),p={key:0},u={key:1},g={class:"btn-group"},h=(0,i.Uk)(" 編輯 "),_=["onClick"];function m(t,e,a,m,b,w){const v=(0,i.up)("Loading"),k=(0,i.up)("router-link"),f=(0,i.up)("pagination"),A=(0,i.up)("deleteArticle");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(v,{active:b.isLoading,"z-index":1060},null,8,["active"]),n,(0,i._)("div",s,[(0,i._)("div",d,[(0,i.Wm)(k,{class:"btn btn-primary",to:"/admin/article"},{default:(0,i.w5)((()=>[o])),_:1})]),(0,i._)("table",r,[c,(0,i._)("tbody",null,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(b.articles,(t=>((0,i.wg)(),(0,i.iD)("tr",{key:t.title},[(0,i._)("td",null,(0,l.zw)(t.title),1),(0,i._)("td",null,(0,l.zw)(t.tag),1),(0,i._)("td",null,(0,l.zw)(t.author),1),(0,i._)("td",null,(0,l.zw)(new Date(1e3*t.create_at).toLocaleDateString()),1),(0,i._)("td",null,[t.isPublic?((0,i.wg)(),(0,i.iD)("span",p,"啟用中")):((0,i.wg)(),(0,i.iD)("span",u,"未啟用"))]),(0,i._)("td",null,[(0,i._)("div",g,[(0,i.Wm)(k,{to:`/admin/article/${t.id}`,class:"btn btn-outline-primary btn-sm"},{default:(0,i.w5)((()=>[h])),_:2},1032,["to"]),(0,i._)("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:e=>w.OpenDeleteArticleModal(t)}," 刪除 ",8,_)])])])))),128))])]),(0,i.Wm)(f,{pages:b.pagination,onGetProducts:w.getArticles},null,8,["pages","onGetProducts"]),(0,i.Wm)(A,{article:b.article,ref:"delArticleModal",onUpdate:e[0]||(e[0]=t=>w.getArticles(b.pagination.current_page))},null,8,["article"])])],64)}var b=a(9280);const w={id:"delArticleModal",ref:"modal",class:"modal fade",tabindex:"-1","aria-labelledby":"delArticleModal","aria-hidden":"true"},v={class:"modal-dialog"},k={class:"modal-content border-0"},f=(0,i._)("div",{class:"modal-header bg-danger text-white"},[(0,i._)("h5",{id:"delArticleModal",class:"modal-title"},[(0,i._)("span",null,"刪除文章")]),(0,i._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),A={class:"modal-body"},y={class:"text-center"},M=(0,i._)("strong",{class:"text-danger"},"(刪除文章後將無法恢復)。",-1),C={class:"modal-footer"},D=(0,i._)("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function $(t,e,a,n,s,d){return(0,i.wg)(),(0,i.iD)("div",w,[(0,i._)("div",v,[(0,i._)("div",k,[f,(0,i._)("div",A,[(0,i._)("p",y,[(0,i.Uk)(" 確定刪除"+(0,l.zw)(a.article.title)+"？ ",1),M])]),(0,i._)("div",C,[D,(0,i._)("button",{type:"button",class:"btn btn-danger",onClick:e[0]||(e[0]=(...t)=>d.deleteArticle&&d.deleteArticle(...t))}," 確認刪除 ")])])])],512)}var x=a(7424),z=a.n(x),L={data(){return{modal:""}},props:["article"],methods:{deleteArticle(){this.$http.delete(`https://vue3-course-api.hexschool.io/v2/api/otispath/admin/article/${this.article.id}`).then((t=>{alert(t.data.message),this.hideModal(),this.$emit("update")})).catch((t=>{alert(t.message)}))},openModal(){this.modal.show()},hideModal(){this.modal.hide()}},mounted(){this.modal=new(z())(this.$refs.modal,{keyboard:!1,backdrop:"static"})}},P=a(3744);const W=(0,P.Z)(L,[["render",$]]);var Z=W,U={components:{pagination:b.Z,deleteArticle:Z},data(){return{isLoading:!1,pagination:{},isNew:!1,articles:[],article:{}}},methods:{getArticles(t=1){this.isLoading=!0,this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/otispath/admin/articles/?page=${t}`).then((t=>{this.articles=t.data.articles,this.pagination=t.data.pagination,this.isLoading=!1})).catch((()=>{this.isLoading=!1,alert("無法取得文章列表")}))},OpenDeleteArticleModal(t){this.article=t,this.$refs.delArticleModal.openModal()}},mounted(){this.getArticles()}};const H=(0,P.Z)(U,[["render",m]]);var Y=H}}]);
//# sourceMappingURL=823.4d77d02c.js.map