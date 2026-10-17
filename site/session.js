import{defaults}from'./engine.js?v=battery-20261018-9';
export function freshState(mode='simple'){
 return {mode:mode==='expert'?'expert':'simple',selectedNeeds:[],priority:'',weights:{...defaults},seller:false,direct:false,budget:23,extra:0,maxWeight:2.2,ratings:{}};
}
