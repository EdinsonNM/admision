'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Route,IndexRoute } from 'react-router';
import App from './app';
import Index from './index';
import Login from './components/login/login';
import LoginPostulante from './components/login/loginPostulante';
import NotFound from './components/common/notfound';
import RouteUtil from './routeUtil';
import Admin from './components/layouts/admin';
import MainLayout from './components/layouts/main';
import Postulantes from './components/postulantes/postulantes';
import Postulante from './components/postulantes/postulante';
import Periodos from './components/periodo/periodos';
import Periodo from './components/periodo/periodo';
import Facultades from './components/facultad/facultades';
import Facultad from './components/facultad/facultad';
import Escuelas from './components/facultad/escuelas';
import Escuela from './components/facultad/escuela';
import Admisiones from './components/admision/admisiones';
import Admision from './components/admision/admision';
import Evaluaciones from './components/evaluacion/evaluaciones';
import Fichas from './components/postulantes/fichas';
import Ficha from './components/postulantes/ficha';
import AdminPostulante from './components/layouts/postulante';

export default (
	
	<Route path="/" component={App} >
		<IndexRoute component={Index}/>
		<Route
			path="/login"
			component={ Login }
			onEnter={ RouteUtil.validateAuth }
		/>
		<Route
			path="/login-postulante/:origin"
			component={ LoginPostulante }
			onEnter={ RouteUtil.validateAuth }
		/>
		<Route
			path="/logout"
			component={ Index }
			onEnter={ RouteUtil.logout }
		/>
		<Route
			path="/login/:token"
			component={ Login }
			onEnter={ RouteUtil.setTokenUrl }
		/>
		<Route
			path="/postulante"
			component={AdminPostulante}
			onEnter={RouteUtil.requireAuth}
		>
		</Route>
		<Route
			path="/dashboard"
			component={Admin}
			onEnter={RouteUtil.requireAuth}
		>
			<Route
				path="main"
				component={ MainLayout }
			/>
			<Route
				path="periodos"
				component={ Periodos }
			/>
			<Route
				path="periodos/new"
				component={ Periodo }
			/>
			<Route
				path="postulantes"
				component={ Postulantes }
			/>
			<Route
				path="postulantes/new"
				component={ Postulante }
			/>
			<Route
				path="postulantes/:id/edit"
				component={ Postulante }
			/>
			<Route
				path="fichas"
				component={ Fichas }
			/>

			<Route
				path="fichas/:admision/new"
				component={ Ficha }
			/>
			<Route
				path="facultades"
				component={ Facultades }
			/>
			<Route
				path="facultades/new"
				component={ Facultad }
			/>
			<Route
				path="facultades/:id/edit"
				component={ Facultad }
			/>
			<Route
				path="facultades/:id/escuelas"
				component={ Escuelas }
			/>
			<Route
				path="facultades/:facultadid/escuelas/new"
				component={ Escuela }
			/>
			<Route
				path="facultades/:facultadid/escuelas/:id/edit"
				component={ Escuela }
			/>
			<Route
				path="admisiones"
				component={ Admisiones }
			/>
			<Route
				path="admisiones/new"
				component={ Admision }
			/>
			<Route
				path="evaluaciones"
				component={ Evaluaciones }
			/>
		</Route>
		<Route path="*" component={NotFound} />
	</Route>
);