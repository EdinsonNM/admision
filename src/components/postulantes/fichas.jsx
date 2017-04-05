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
import SelectField from 'material-ui/SelectField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AdmisionService from '../../services/AdmisionService';
import PostulanteService from '../../services/PostulanteService';
import Cache from '../../services/Cache';

let service = new PostulanteService();
export default class Fichas extends React.Component {
  constructor (props) {
    super(props);
    this.state={
     admisiones:[],
     data:[]
    };
    this.facultades = Cache.getData('escuelas');
    this.params={};
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

 
    let items=[];
   

   
    return (
      <div>
          <Card>
            <CardHeader
            title="Listado de Postulantes"
            subtitle="Admisión"
             avatar="images/user0.jpg"
            />

            <CardText >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            <div className="row">
              <div className="col-md-4">
                <SelectField
                        fullWidth
                        floatingLabelText="Proceso de Admisión"
                        value={this.state.admision}
                        onChange={(event, index, value)=>{this.handleChangeSelect('admision',event, index, value)}}
                        >
                        {
                          this.state.admisiones.map((item,index)=>{
                            return (<MenuItem key={index} value={item.id} primaryText={"Proceso de Admision "+Cache.getItem('periodos',item.periodo).nombre+' - '+Cache.getItem('modalidadadmision',item.modalidad).nombre} />)
                          })
                        }
                        </SelectField>
              </div>

            </div>
   
      <List>
        <Subheader>Today</Subheader>
        {items}
      </List>
            </CardText>
        </Card>
         <FloatingActionButton style={style} href={`#/dashboard/fichas/${this.state.admision}/new`}>
            <ContentAdd />
            </FloatingActionButton>
        </div>
    );
  }
}
