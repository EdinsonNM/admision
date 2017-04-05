import Model from './Model';
const attrs = [
    "codigo",
    "fecha",
    "monto",
    "tipoPago",
	"banco"
   
]

export default class Voucher extends Model{
    constructor(data){
        super();
        this.copy(this.convertToObject(data,attrs),this);
        
    }

}