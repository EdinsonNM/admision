import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AdmisionService from '../../services/AdmisionService';
import Cache from '../../services/Cache';
import FileFolder from 'material-ui/svg-icons/file/folder';

let service = new AdmisionService();
export default class ProcesosAdmision extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      data:[]
    };
  }


  componentWillMount(){
    this.loadData();
  }
  loadData(){
    service.getAll({},(error,data)=>{
        this.setState({data:data});
    },true);
  }
  componentDidMount(){

  }
  remove(id){
    console.log(id);
    service.delete(id,null);
    this.loadData();
  }
  edit(id){
    document.location.hash=`#/dashboard/admisiones/${id}/edit`;
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
   
    
    let items=[];
    let itemsCurrent=[];
    let currentYear = new Date().getFullYear();
    this.state.data.forEach((item,index)=>{
        let rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onTouchTap={this.edit.bind(this,item.id)}>Editar</MenuItem>
            <MenuItem onTouchTap={this.remove.bind(this,item.id)}>Delete</MenuItem>
            </IconMenu>
            );
        if(item.anio==currentYear){
            itemsCurrent.push(
                    <ListItem
                        key={index}
                         leftAvatar={<Avatar icon={<FileFolder />} />}
                        rightIconButton={rightIconMenu}
                        primaryText={item.anio+' - '+item.periodo}
                        secondaryText={
                            <p>
                            {item.inicio+' - '+ item.fin}
                            </p>
                        }
                        secondaryTextLines={2}
                        />
                );
                itemsCurrent.push( <Divider key={'divider'+index} inset={true} />)

        }else{
            items.push(
                        <ListItem
                            key={index}
                             leftAvatar={<Avatar icon={<FileFolder />} />}
                            rightIconButton={rightIconMenu}
                            primaryText={"Proceso de Admisión "+Cache.getItem('modalidadadmision',item.modalidad).nombre}
                            secondaryText={
                                <p>
                                <span style={{color: darkBlack}}>Periodo {Cache.getItem('periodos',item.periodo).nombre}</span><br />
                                {item.inicio+' - '+ item.fin}
                                </p>
                            }
                            secondaryTextLines={2}
                            />
                    );
            items.push(  <Divider key={'divider'+index} inset={true} />);

        }
    });

    const style = {
        marginRight: 20,
        position:'fixed',
        bottom:'10px',
        right:'10px',
        zIndex:'1000'
    };
    return (
        <div>
            <Card>
                <CardHeader
                title="Listado de Procesos de Admisión"
                subtitle="Admisión"
                avatar="images/user0.jpg"
                />

                <CardText >
                    Consulte todos los periodos académicos registrados en la institución

                    <List>
                        <Subheader>Proceso de Admisión Activo</Subheader>
                        {itemsCurrent}                
                    </List>
                    <List>
                        <Subheader>Procesos anteriores</Subheader>
                        {items}
                    </List>
                    </CardText>
            </Card>
            <FloatingActionButton style={style} href="#/dashboard/admisiones/new">
            <ContentAdd />
            </FloatingActionButton>
        </div>
    );
  }
}
