import React, { useState} from 'react';


import  { useDispatch , useSelector } from 'react-redux';


import { Container, 
  TextField, 
  Typography,
   Button, 
   List,
   ListItem,  
   ListItemText,
   ListItemSecondaryAction,
   Checkbox,
   IconButton,
   
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { RootState, AppDispatch } from './redux/store';
import { addTodo, removeTodo, setTodoStatus } from './redux/todoSlice';


const App = () => {

  // React hook
  const [todoDescription, setTodoDescription] = useState("");

  // React Redux Hooks
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Container maxWidth="xs" > 
      <Typography style={{textAlign: "center"}} variant="h3">
        Redux List App
      </Typography>
      <TextField
      variant="outlined"
      label="To Do Item"
      fullWidth
      onChange={(e) => setTodoDescription(e.target.value)}
      value={todoDescription}
      />
      <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={() => {
        dispatch(addTodo(todoDescription));
        setTodoDescription("");
      }}
      >
        Add Item
      </Button>
      <List>
        {todoList.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              style={{
                textDecoration: todo.completed ? "line-through": "none"
              }}
            >
              {todo.description}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                onClick={ () => {
                  dispatch(removeTodo(todo.id));
                }}
              >
                <DeleteIcon />
              </IconButton>
              <Checkbox 
              edge="end"
              value={todo.completed}
              onChange={() => {
                dispatch(
                  setTodoStatus({ completed: !todo.completed, id: todo.id})
                )
              }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ) )}
      </List>
    </Container>
  ); 
}

export default App;
