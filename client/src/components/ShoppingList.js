import React, { Component } from 'react'
import uuid from 'uuid';
import { connect } from 'react-redux';
import { getItems, deleteItem, addItem, editItem, updateItem } from '../store/actions/itemActions';


class ShoppingList extends Component {
  state = {
     listName: "Shopping List",
     content: ''
  }

  componentDidMount() {
     this.props.getItems();
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
     if(isEditing) {
        this.props.updateItem({
         id: editItem.id,
         content
        })
        this.setState({
         content: ''
        })
     }
     else {
      this.props.addItem({
         id: uuid(),
         content
      })
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
      this.props.deleteItem(id);
  }

  editItem = (id, content) => {
     const editItem = {
        id,
        content
      };
      this.props.editItem(editItem);
  }
  
   render() {
    const { items, isEditing } = this.props.item;
    return (
      <div>
        <h1>{this.state.listName}</h1>
         <form onSubmit={this.handleSubmit}>
            <input type="text" id="content" value={this.state.content} onChange={this.handleChange}/>
            <button>{isEditing ? 'Update' : 'Add'}</button>
         </form>
            {items.map(({id, content}) => {
               return (
                  <li key={id}>
                  {content}
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
   console.log(state);  
   return {
      item: state.item
   }
};

export default connect(
   mapStateToProps, 
   { getItems, deleteItem, addItem, editItem, updateItem }
   )(ShoppingList); 
