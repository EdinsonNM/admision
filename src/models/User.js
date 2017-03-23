import AuthUtils from '../libs/AuthUtils';

export default class User {
	constructor(userData){
		if(userData.uid)
			this._id = userData.uid;

		if(userData.email)
			this._email = userData.email;

		if(userData.nombres)
			this._nombres = userData.nombres;

		if(userData.apellidos)
			this._apellidos = userData.apellidos;

		if(userData.institucion)
			this._institucion = userData.institucion;

		
	}


	get id(){
		return this._id;
	}

	get nombres(){
		return this._nombres;
	}

	get apellidos(){
		return this._apellidos;
	}

	get email(){
		return this._email;
	}

	get institucion(){
		return this._institucion;
	}


	update( partialObj ){

		if(partialObj.nombres)
			this._nombres = partialObj.nombres;

		if(partialObj.apellidos)
			this._apellidos = partialObj.apellidos;

		
	}




}
