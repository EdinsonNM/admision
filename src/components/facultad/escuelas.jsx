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
import Users from '../../services/Users';
import EscuelaService from '../../services/EscuelaService';
import Cache from '../../services/Cache';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FileFolder from 'material-ui/svg-icons/file/folder';

const style={
  appbar:{
    backgroundColor:'var(--paper-purple-700)'
  }
}

let service = new EscuelaService();
export default class Facultades extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      data:[],
      facultad:Cache.getItem('facultades',this.props.params.id)
    };
    
  }
  
 
  componentDidMount(){
    this.loadData();
    service.on(()=>{
      this.loadData();
    },this.state.facultad.id)
  }
 
  loadData(){
    service.getAll({},(error,data)=>{
        this.setState({data:data});
    },true,this.props.params.id);
  }
  remove(id){
    console.log(id);
    service.delete(id,null,this.props.params.id);
    this.loadData();
  }
  edit(id){
    document.location.hash=`#/dashboard/facultades/${this.props.params.id}/escuelas/${id}/edit`;
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
    this.state.data.forEach((item,index)=>{
          let rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onTouchTap={this.edit.bind(this,item.id)}>Editar</MenuItem>
            <MenuItem onTouchTap={this.remove.bind(this,item.id)}>Delete</MenuItem>
            </IconMenu>
            );
            items.push(
                        <ListItem
                            key={index}
                           leftAvatar={<Avatar icon={<FileFolder />} />}
                            rightIconButton={rightIconMenu}
                            primaryText={item.nombre}
                            secondaryText={
                                <p>
                                <span style={{color: darkBlack}}>Activo</span><br />
                                </p>
                            }
                            secondaryTextLines={1}
                            />
                    );
            items.push(  <Divider key={'divider'+index} inset={true} />);

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
            title="Listado de escuelas"
            subtitle={this.state.facultad.nombre}
             avatar="images/user0.jpg"
            />

            <CardText >
   
      <List>
        {items}
      </List>
            </CardText>
        </Card>
         <FloatingActionButton style={style} href={`#/dashboard/facultades/${this.props.params.id}/escuelas/new`}>
            <ContentAdd />
            </FloatingActionButton>
        </div>
    );
  }
}
