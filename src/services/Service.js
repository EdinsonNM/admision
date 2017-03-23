import Cache from './Cache';
import Users from './Users';
let database = firebase.database();
export default class Service {
    get database(){
        return database;
    }
    constructor(route){
        this.route = route;
        this.origin='';

    }
    getUrl(...params){
        let url='/';
        for (let i = 0, length = params.length; i < length; i++) {
            url += params[i]+((params[i]!==''&&i<length-1)?'/':'');
        }
        console.log(url);
        return url;
    }
    //customRoute ="/mycustom/route"
    get(id,next,customRoute=''){
        let url = this.getUrl(Users.origin(),this.route,customRoute,id);
        database.ref(url).once('value').then((snapshot)=>{
            let data = snapshot.val();
            data.id=id;
            return next(null,data);
        });
    }
  getAll({},next,caching=false,customRoute=''){
      let url = this.getUrl(Users.origin(),this.route,customRoute);
      database.ref(url).once('value', (snapshot) =>{
        let data = [];
        if(caching){
            Cache.clear(this.route);
        }
        snapshot.forEach((childSnapshot)=>{
            let item=  childSnapshot.val();
            item.id =  childSnapshot.key;
            data.push(item);
            if(caching){  
                Cache.addItem(this.route,item.id,item);
            }
        });
        return next(null,data);
    });
  }

  post(data,next,customRoute=''){
      let url = this.getUrl(Users.origin(),this.route,customRoute);
      let newKey = database.ref().child(url).push().key;
      database.ref(this.getUrl(Users.origin(),this.route,customRoute,newKey)).set(data);
      next(null,data);
  }
  update(id,data,next,customRoute='',updates={}){
      let url = this.getUrl(Users.origin(),this.route,customRoute,id);
      //var updates = {};
      updates[url] = data;
      database.ref().update(updates);
      next(null,data);
  }
  delete(id,next,customRoute=''){
      let url = this.getUrl(Users.origin(),this.route,customRoute);
      database.ref(url).child(id).remove();
  }

  on(next,customRoute=''){
    let url = this.getUrl(Users.origin(),this.route,customRoute);
    database.ref(url).on('value', function(snapshot) {
        next(null, snapshot.val());
    });
  }
  off(next,customRoute=''){
    let url = this.getUrl(Users.origin(),this.route,customRoute);
    database.ref(url).off();
  }

   static getAll(route,next,caching=false){
      database.ref(Users.origin()+'/'+route).once('value', (snapshot) =>{
        let data = [];
        if(caching){
            Cache.clear(route);
        }
        snapshot.forEach((childSnapshot)=>{
            let item=  childSnapshot.val();
            item.id =  childSnapshot.key;
            data.push(item);
            if(caching){  
                Cache.addItem(route,item.id,item);
            }
        });
        return next(null,data);
    });
  }



}