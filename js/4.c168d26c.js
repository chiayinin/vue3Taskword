"use strict";(self["webpackChunkweek006"]=self["webpackChunkweek006"]||[]).push([[4],{4:function(t,c,s){s.r(c),s.d(c,{default:function(){return _}});var r=s(252),a=s(577);const i=(0,r._)("h2",null,"產品列表",-1),o={class:"container"},l={class:"row row-cols-1 row-cols-4 g-3"},e={class:"card h-100"},d=["src","alt"],n={class:"card-body"},u={class:"card-title"},p={class:"card-text"},h=(0,r.Uk)(" 要看產品細節點這邊 ");function w(t,c,s,w,v,g){const k=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)(r.HY,null,[i,(0,r._)("div",o,[(0,r._)("div",l,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(v.product,(t=>((0,r.wg)(),(0,r.iD)("div",{class:"col",key:t.id},[(0,r._)("div",e,[(0,r._)("img",{src:t.imageUrl,class:"card-img-top h-100",alt:t.title},null,8,d),(0,r._)("div",n,[(0,r._)("h5",u,(0,a.zw)(t.title),1),(0,r._)("p",p,(0,a.zw)(t.description),1),(0,r.Wm)(k,{to:`/product/${t.id}`,class:"btn btn-primary"},{default:(0,r.w5)((()=>[h])),_:2},1032,["to"])])])])))),128))])])],64)}var v={data(){return{product:[]}},methods:{getProduct(){this.$http("https://vue3-course-api.hexschool.io/v2/api/chiayinin-api/products/all").then((t=>{this.product=t.data.products})).catch((t=>{console.dir(t)}))}},mounted(){this.getProduct()}},g=s(744);const k=(0,g.Z)(v,[["render",w]]);var _=k}}]);
//# sourceMappingURL=4.c168d26c.js.map