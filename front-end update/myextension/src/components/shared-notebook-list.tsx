import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

interface SharedNotebook {
  title: string;
}

interface SharedNotebooksListProps {
  sharedNotebooks: SharedNotebook[];
}

const SharedNotebooksList: React.FC<SharedNotebooksListProps> = ({ sharedNotebooks }) => {
  return (
    <div>
      <h2>Shared Notebooks</h2>
      <List>
        {sharedNotebooks.map((notebook, index) => (
          <ListItem key={index}>
            <ListItemText primary={notebook.title} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SharedNotebooksList;
