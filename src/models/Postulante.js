import Model from './Model';
const attrs = [
    "id",
    "nombres",
    "apePaterno",
    "apeMaterno",
    "dni",
    "direccion",
    "telefono",
    "email",
    "celular",
    "departamento",
    "provincia",
    "distrito",
    "admision",
    "facultad",
    "escuela",
    "estadoCivil",
    "fechaNacimiento",
    "tipoColegio",
    "colegio",
    "anioColegio",
    "createdAt"
    
]

export default class Postulante extends Model{
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