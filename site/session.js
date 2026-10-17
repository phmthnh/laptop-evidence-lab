import{defaults}from'./engine.js?v=simple-20261018-4';
export function freshState(mode='simple'){
 return {mode:mode==='expert'?'expert':'simple',selectedNeeds:[],weights:{...defaults},seller:false,direct:false,budget:23,extra:0,maxWeight:2.2,ratings:{}};
}
