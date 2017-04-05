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
import PeriodoService from '../../services/PeriodoService';
import FileFolder from 'material-ui/svg-icons/file/folder';
import moment from 'moment';
let service = new PeriodoService();
export default class Periodos extends React.Component {
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
    document.location.hash=`#/dashboard/periodos/${id}/edit`;
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
                         leftAvatar={<Avatar icon={<FileFolder />} style={{color:'red'}} />}
                        rightIconButton={rightIconMenu}
                        primaryText={item.anio+' - '+item.periodo}
                        secondaryText={
                            <p>
                             {moment(item.inicio).format('L')+' - '+ moment(item.fin).format('L')}
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
                            primaryText={item.anio+' - '+item.periodo}
                            secondaryText={
                                <p>
                                <span style={{color: darkBlack}}>Activo</span><br />
                                {moment(item.inicio).format('L')+' - '+ moment(item.fin).format('L')}
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
                title="Listado de Periodos Académicos"
                subtitle="Mantenimiento"
                avatar="images/user0.jpg"
                />

                <CardText >
                    Consulte todos los periodos académicos registrados en la institución

                    <List>
                        <Subheader>Periodos creados en el presente año</Subheader>
                        {itemsCurrent}                
                    </List>
                    <List>
                        <Subheader>Periodos de años anteriores</Subheader>
                        {items}
                    </List>
                    </CardText>
            </Card>
            <FloatingActionButton style={style} href="#/dashboard/periodos/new">
            <ContentAdd />
            </FloatingActionButton>
        </div>
    );
  }
}
