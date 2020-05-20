import React from "react";
import {Button} from '@material-ui/core'
import {IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import _ from 'lodash'
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", lists: [], a: [], toDel:'' , edited: false, placeToEdit:0};
    this.doInput = this.doInput.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
    this.delClick=this.delClick.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
  }

  doInput(event) {
    this.setState({ value: event.target.value });
  }

  doSubmit() {
    if (this.state.value !== "" && this.state.edited=== false)
      this.setState({ lists: this.state.lists.concat(this.state.value) });
    if (this.state.edited===true){
      let newls=_.cloneDeep(this.state.lists);
      newls[this.state.placeToEdit]=this.state.value;
      this.setState({ lists: _.cloneDeep(newls)});
      this.setState({edited: false});
    }
      this.setState({ value: "" });
  }

  handleEdit(q){
    this.setState({value: q});     
    this.setState({placeToEdit: this.state.lists.indexOf(q)});
    this.setState({edited: true});
  }

  delClick(p){
    
    const pl=this.state.lists.indexOf(p);
    console.log(p);
    console.log(pl);
    const ar=JSON.parse(JSON.stringify(this.state.lists)); 
    ar.splice(pl,1);
    this.setState({lists: ar});
    console.log(this.state.lists);
  }


  render() {
    return (
      <div>
        <h1>TODO</h1>

        <label>
          {" "}
          What needs to be done?
          <input type="text" value={this.state.value} onChange={this.doInput} />
          <button onClick={this.doSubmit}>Add{this.state.lists.length} </button>
          <h2>
            {this.state.lists.map((item) => (
              <div>
              <li style={{display:"inline", margin:"2rem"}} key={item}>{item}</li>
            
              <EditIcon onClick={()=>{this.handleEdit(item)}} style={{display: "inline"}}>Edit</EditIcon>
              <IconButton aria-label='delete' style={{display:"inline"}} onClick={()=>{this.delClick(item)}}><DeleteIcon /></IconButton>
              </div>
            ))}
          </h2>
        </label>
      </div>
    );
  }
}
export default Todo;
