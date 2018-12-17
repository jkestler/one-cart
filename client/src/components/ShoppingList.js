import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getItems, deleteItem, AddItem, editItem, UpdateItem, setItemPurchase, addItemSocket, deleteItemSocket, updateItemSocket, setItemPurchaseSocket } from '../store/actions/itemActions';
import { 
   Alert, 
   Form, 
   Button, 
   Input, 
   InputGroup, 
   InputGroupAddon,
   ListGroup, 
   ListGroupItem,
   ButtonGroup,
   Container
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import io from "socket.io-client";

let socket;

class ShoppingList extends Component {
  constructor(props) {
      super(props);
      socket = io();
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
      <Container>
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
         <Form onSubmit={this.handleSubmit}>
            <InputGroup>
               <Input type="text" id="content" value={this.state.content} onChange={this.handleChange} placeholder="Add an item" bsSize="lg" />
               <InputGroupAddon addonType="append">
                  <Button color='success'>{isEditing ? 'Update' : 'Add'}</Button>
               </InputGroupAddon>
            </InputGroup>
         </Form>
         
         <ListGroup className="shopping-lst">
            {items.map(({id, content, isPurchased}) => {
               return (
                  <ListGroupItem key={id}>
                  <div className={isPurchased ? "items strike" : ''} onClick={() => this.props.setItemPurchase(socket, id, isPurchased)}><p className='text-xl-center list-items'>{content}</p></div>
                  {!isEditing 
                  ?
                  <ButtonGroup>
                     <Button color='danger' onClick={() => this.deleteItem(id)}><i class="fas fa-trash-alt"></i></Button>
                     <Button color='warning' onClick={() => this.editItem(id, content)}><i class="fas fa-edit"></i></Button>
                  </ButtonGroup>
                  : 
                  ''}
                  </ListGroupItem>
               );
            })}
         </ListGroup>
      </Container> 
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
