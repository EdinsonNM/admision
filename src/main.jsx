//require('es6-promise').polyfill();
import { Router, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import routes from './routes.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Auth from './services/Auth';
import nativeToast from 'native-toast'
import UserService from './services/Users';
import FacultadService from './services/FacultadService';
import EscuelaService from './services/EscuelaService';
import PeriodoService from './services/PeriodoService';
import ModalidadAdmisionService from './services/ModalidadAdmisionService';
import AdmisionService from './services/AdmisionService';

var initUI = function(){
    const route = (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={hashHistory}>{routes}</Router>
        </MuiThemeProvider>
    );
    ReactDOM.render(route,document.querySelector("#app"));
    console.log(' %c STOP: %c This browser feature is intended for developers.!', 'color: red; font-weight: bold; font-size:20px;','color:green;font-size:20px;');
}
Auth.init((error,user)=>{
    if(error){
		initUI();  
    }
    else{
        nativeToast({
            message: 'Bienvenido, estamos optimizando tu experiencia!',
            position: 'top',
            timeout: 5000
          });
        Auth.me((error,data)=>{
            UserService.setMe(data);
			if(UserService.me().isAnonymous){
				initUI()
			}else{
				let facService = new FacultadService();
				let perService = new PeriodoService();
				let proAdmiService = new ModalidadAdmisionService();
				let escService = new EscuelaService();
				facService.getAll({},(error,data)=>{
					perService.getAll({},(error,data)=>{
						proAdmiService.getAll({},(error,data)=>{
							escService.getAll({},(error,data)=>{
								initUI();
							},true);
						},true);
					},true);
				},true);
			}
           
            
        })
    }
    

});
//injectTapEventPlugin();
