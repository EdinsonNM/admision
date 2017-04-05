const DATA=[
	{id:'BN',nombre:'Banco de la Nación'},
	{id:'BBVA',nombre:'Banco Continental'},
	{id:'BCP',nombre:'Banco de C´redito'}
]
import _ from 'underscore';
export default class BancoService{
    static getAll(params){
        let data =_.where(DATA, params) ;
        return data;
    }
    static get(id){
        let data = _.findWhere(DATA, {id:id});
        return data;
    }

}