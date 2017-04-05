import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {blue500,grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AdmisionService from '../../services/AdmisionService';
import PostulanteService from '../../services/PostulanteService';
import Cache from '../../services/Cache';
import AssignmentLate from 'material-ui/svg-icons/action/assignment-late';
import AssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import Evaluacion from './evaluacion';
let service = new PostulanteService();
export default class Evaluaciones extends React.Component {
  constructor (props) {
    super(props);
    this.state={
     admisiones:[],
     data:[]
    };
    this.facultades = Cache.getData('escuelas');
    this.parmas={};
  }

  componentDidMount(){
    let service = new AdmisionService();
    service.getAll({},(error,data)=>{
      this.setState({admisiones:data});
    });
  }
   handleChangeSelect(key, event, index, value){
    let state = this.state;
    state[key] = value;
    this.setState(state);
    if(key=='escuela'||key=='facultad'){
      this.params={};
      this.params[key]=value;
      this.loadData();
    }
  }
  loadData(){

      service.getAll(this.params,(error,data)=>{
        debugger;
        this.setState({data:data});
      },false,this.state.admision)
  }
  remove(id){
    console.log(id);
    service.delete(id,null);
    this.loadData();
  }
  edit(id){
    document.location.hash=`#/dashboard/postulantes/${id}/edit`;
  }
  evaluar(item){
    console.log('open..');
    this.refs.evaluacion.open(item);
  }
  render(){
    
    const iconButtonElement = (
        <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
        >
        <MoreVertIcon color={grey400} />
        </IconButton>
        );
    const rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
        </IconMenu>
        );
    const style = {
        marginRight: 20,
        position:'fixed',
        bottom:'10px',
        right:'10px',
        zIndex:'1000'
    };

     let escuelas = [];
    if(this.state.facultad){
     Object.keys(this.facultades[this.state.facultad]).forEach((key,index)=>{
       if(key!=='id'){
       console.log(Cache.getItem('escuelas',key));
        escuelas.push(<MenuItem key={index} value={Cache.getItem('escuelas',this.state.facultad)[key].id} primaryText={Cache.getItem('escuelas',this.state.facultad)[key].nombre} />)
       }
      })
    }

    let items=[];
   

  this.state.data.forEach((item,index)=>{
             let rightIconMenu = (
               <IconButton tooltip="Evaluar" touch={true} tooltipPosition="bottom-left" onTouchTap={this.evaluar.bind(this,item)}>
                  <AssignmentLate />
                </IconButton>
            );
            if(item.evaluado){
               rightIconMenu = (
               <IconButton tooltip="Evaluado" touch={true} tooltipPosition="bottom-left">
                  <AssignmentTurnedIn color={blue500}/>
                </IconButton>
              );
            }
            items.push(
              <ListItem
                key={index}
                leftAvatar={<Avatar src="images/user00.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText={item.nombres+' '+item.apePaterno+' '+item.apeMaterno}
                secondaryText={
                    <p>
                    <span style={{color: darkBlack}}>DNI: {item.dni} / Estado: {item.evaluacion.estado} / Puntaje: {item.evaluacion.puntaje}</span>
                    </p>
                }
                secondaryTextLines={1}
                />
            );
            items.push(  <Divider key={'divider'+index} inset={true} />);
        });

   
    
    return (
      <div>
          <Card>
            <CardHeader
            title="Listado de Evaluaciones de Postulantes"
            subtitle="Admisión"
             avatar="images/user0.jpg"
            />

            <CardText >
            El proceso de evaluación permite registrar el puntaje obtenido por cada uno de los postulantes para su respectivo procesamiento y generación del orden de merito.
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <SelectField
                        fullWidth
                        floatingLabelText="Proceso de Admisión"
                        value={this.state.admision}
                        onChange={(event, index, value)=>{this.handleChangeSelect('admision',event, index, value)}}
                        >
                        {
                          this.state.admisiones.map((item,index)=>{
                            return (<MenuItem key={index} value={item.id} primaryText={"Admision "+Cache.getItem('periodos',item.periodo).nombre+' - '+Cache.getItem('modalidadadmision',item.modalidad).nombre} />)
                          })
                        }
                        </SelectField>
              </div>
              <div className="col-md-4 col-sm-6">
                 <SelectField
                        fullWidth
                        floatingLabelText="Facultad"
                        value={this.state.facultad}
                        onChange={(event, index, value)=>{this.handleChangeSelect('facultad',event, index, value)}}
                        >
                        {
                          Object.keys(this.facultades).map((key,index)=>{
                            return (<MenuItem key={index} value={Cache.getItem('facultades',key).id} primaryText={Cache.getItem('facultades',key).nombre} />)
                          })
                        }

                  </SelectField>
              </div>
              <div className="col-md-4 col-sm-6">
                 <SelectField
                        fullWidth
                        floatingLabelText="Escuela"
                        value={this.state.escuela}
                        onChange={(event, index, value)=>{this.handleChangeSelect('escuela',event, index, value)}}
                        >
                       {escuelas}
                        </SelectField>
              </div>
            </div>
   
      <List>
        <Subheader>Today</Subheader>
        {items}
      </List>
            </CardText>
        </Card>
         <FloatingActionButton style={style} href="#/dashboard/postulantes/new">
            <ContentAdd />
          </FloatingActionButton>
          <Evaluacion ref="evaluacion"/>  
        </div>
    );
  }
}
