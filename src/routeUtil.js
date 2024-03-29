import Auth from './services/Auth.js';
import UserService from './services/Users.js';
import FacultadService from './services/FacultadService';
import AuthToken from './libs/AuthToken';
import nativeToast from 'native-toast';
let facultadService = new FacultadService();
export default class RouteUtil{
	static redirectToLogin(nextState, replace) {
		replace({ pathname: '/login'});
	}
	static logout( nextState, replace ) {
		return Auth.logout();
	}

	static redirectToHome(nextState, replace) {
		replace({ pathname: '/dashboard/main'});
	}

	static redirectToUsers(nextState, replace) {
		if( Users.me().isAdmin ){
			if( !Users.selectedUser() ){
				replace({ pathname: '/dashboard/users'});
			}
		}
	}

	static requireAdmin(nextState, replace) {
		if( !Users.me().isAdmin ){
			RouteUtil.redirectToHome(nextState, replace);
		}
	}

	static requireAuth(nextState, replace, callback) {
		if(!Auth.loggedIn()){
			replace( { pathname: '/login'} );
			callback();
		}else{

			Auth.me( (error, data)=>{
				if (error) {
					
					nativeToast({
					message: error.message,
					position: 'top',
					timeout: 5000,
					type: 'warning'
					});
					Auth.logout();
					replace({ pathname: '/login'});
				} else {
					UserService.setMe(data);
					
					nextState.location.state={me:data};


				}
				callback();

			});
		}

	}
	static setTokenUrl(nextState,replace){
		console.log(nextState);
		AuthToken.setToken("Bearer "+nextState.params.token);
		return replace({ pathname: '/dashboard/main'});
	}
	static validateAuth( nextState, replace ) {
		if(Auth.loggedIn()){
			let user = UserService.me();
			debugger;
			if(!user.isAnonymous){
				return replace({ pathname: '/dashboard/main'});
			}else{
				return replace({ pathname: '/postulante'});
			}
			
		}
	}
}