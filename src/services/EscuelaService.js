import Service from './Service';
import Users from './Users';
let route="escuelas";
export default class EscuelaService extends Service{
  constructor(){
    super(route);
  }

  post(data,next,customRoute=''){
      super.post(data,(error,data)=>{
        let urlFacultad = super.getUrl(Users.origin(),'facultades',data.facultad);
        super.database.ref(urlFacultad).child('escuelas')
        .transaction(function(escuelas) {
            escuelas = (escuelas||0) + 1;

            return escuelas;
        });
        
        next(null,data);
      },customRoute);
  }
 

}
