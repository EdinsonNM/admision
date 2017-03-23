import Model from './Model';
import _ from 'underscore';
var mockData = [
    {
        anio:2014,
        periodo:1,
        inicio:'01/03/2014',
        fin:'31/07/2014',

    },
     {
        anio:2014,
        periodo:2,
        inicio:'01/07/2014',
        fin:'31/12/2014',

    },
     {
        anio:2015,
        periodo:1,
        inicio:'01/07/2015',
        fin:'31/12/2015',

    },
     {
        anio:2015,
        periodo:2,
        inicio:'01/07/2014',
        fin:'31/12/2014',

    },
     {
        anio:2016,
        periodo:1,
        inicio:'01/03/2014',
        fin:'31/07/2014',

    },
     {
        anio:2016,
        periodo:2,
        inicio:'01/08/2016',
        fin:'31/12/2016',

    },
     {
        anio:2017,
        periodo:1,
        inicio:'01/03/2017',
        fin:'31/07/2017',

    }
];

let serviceName='periodo';

export default class Periodo extends Model{
    constructor(){
        super(serviceName);
    }

    getAll(params,next){
        let data = _.sortBy(mockData, function(item){ return - (item.anio); });
        return next(null,{data:data});
	}
}