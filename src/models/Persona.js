import Model from './Model';
const attrs = [
    "id",
    "nombres",
    "apePaterno",
    "apeMaterno",
    "dni",
    "departamento",
    "provincia",
    "distrito",
    "fechaNacimiento"
    
]

export default class Persona extends Model{
    constructor(data){
        super();
        this.copy(this.convertToObject(data,attrs),this);
        this.evaluacion = this.evaluado || {
            evaluado:false,
            estado:"registrado",
            puntaje:0
        }
    }

}