import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getItems, deleteItem, AddItem, editItem, UpdateItem, setItemPurchase, addItemSocket, deleteItemSocket, updateItemSocket, setItemPurchaseSocket } from '../store/actions/itemActions';
import { Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import io from "socket.io-client";

let socket;

class ShoppingList extends Component {
  constructor(props) {
      super(props);
      socket = io.connect("http://localhost:5000")
      // Connections to server events
      socket.on('itemAdded',(res)=>{
         this.props.addItemSocket(res)
      });
      socket.on('itemRemoved',(res)=>{
         this.props.deleteItem(res)
      });
      socket.on('itemUpdated',(res)=>{
         this.props.updateItemSocket(res)
      });
      socket.on('purchaseChange',(res)=>{
         this.props.setItemPurchaseSocket(res)
      });
  }
  state = {
     listName: "Shopping List",
     content: '',
     isPurchased: false
  }

  componentDidMount() {
     this.props.getItems();
  }

  componentWillUnmount() {
   socket.disconnect()
   alert("Disconnecting Socket as component will unmount")
  }

  
  componentWillReceiveProps(nextProps) {
      const { isEditing, editItem } = nextProps.item

      if(isEditing) {
         this.setState({
            content: editItem.content 
         });
      }

  }

  handleSubmit = (e) => {
      const { content } = this.state;
      const { isEditing, editItem } = this.props.item;
      e.preventDefault();
      if(content === '') return alert("Please enter some text for shopping item.")

      if(isEditing) {
         this.props.UpdateItem(socket, {
            id: editItem.id,
            content
         })
         this.setState({
            content: ''
         })
      }
      else {
         this.props.AddItem( socket, { content })
         this.setState({
            content: ''
         })
      }  
  }

  handleChange = (e) => {
      this.setState({
         [e.target.id]: e.target.value
      })
  }

  deleteItem = (id) => {
      this.props.deleteItemSocket(socket, id);
  }

  editItem = (id, content) => {
     const editItem = {
        id,
        content
      };
      this.props.editItem(editItem);
  }

  handlePurchase = (content, id) => {
     this.setState(prevState => ({
         isPurchased: !prevState.isPurchased
     }))
  }
  
   render() {
    const { items, isEditing, error } = this.props.item;
    const { user } = this.props.user;
    if(!user.id) return <Redirect to="/signin" /> 
    return (
      <div>
        <h1>{this.state.listName}</h1>
        {error 
         ? 
         error.map((err, id) => { 
            return (
               <div key={id}>
                <Alert color="danger">
                  {err.msg}
                </Alert>
               </div>
            );
         })
         :
         ''
         }
         <form onSubmit={this.handleSubmit}>
            <input type="text" id="content" value={this.state.content} onChange={this.handleChange}/>
            <button>{isEditing ? 'Update' : 'Add'}</button>
         </form>
            <ul className="shopping-lst">
               {items.map(({id, content, isPurchased}) => {
                  return (
                     <li key={id}>
                     <div className={isPurchased ? "items strike" : ''} onClick={() => this.props.setItemPurchase(socket, id, isPurchased)}>{content}</div>
                     {!isEditing 
                     ? 
                     <div className="btn-group">
                        <button onClick={() => this.deleteItem(id)}>&times;</button>
                        <button onClick={() => this.editItem(id, content)}>Edit</button>
                     </div>
                     : 
                     ''}
                     </li>
                  );
               })}
            </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
   console.log(state);  
   return {
      item: state.item,
      user: state.user
   }
};

export default connect(
   mapStateToProps, 
   { getItems, deleteItem, AddItem, editItem, UpdateItem, setItemPurchase, addItemSocket, deleteItemSocket, updateItemSocket, setItemPurchaseSocket }
   )(ShoppingList); 
