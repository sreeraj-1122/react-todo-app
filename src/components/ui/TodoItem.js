import React, { Component } from 'react';
import ConfirmationDialog from './ConfirmationDialog ';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.data.completed,
      showDialog: false,
      tempChecked: this.props.data.completed, 
    };
  }

  handleCheckboxChange = (e) => {
    const { checked } = e.target;
    this.setState({
      tempChecked: checked,    
      showDialog: true,         
    });
  };

  // Handle the confirm action

  handleConfirm = () => {
    this.setState({
      checked: this.state.tempChecked, 
      showDialog: false,              
    });
    this.props.changeStatus(this.props.data.id, this.state.tempChecked); 
  };

  // Handle the cancel action
  handleCancel = () => {
    this.setState({
      showDialog: false,        
      tempChecked: this.state.checked, 
    });
  };

  render() {
    const { data } = this.props;
    const { checked, showDialog } = this.state;

    return (
      <li className={`todo-item ui-state-default ${checked ? 'completed' : 'pending'}`}>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={this.handleCheckboxChange} 
            />
            {data.text}
          </label>
        </div>

        <ConfirmationDialog
          isVisible={showDialog}
          onConfirm={this.handleConfirm}  
          onCancel={this.handleCancel}   
        />
      </li>
    );
  }
}

export default TodoItem;
