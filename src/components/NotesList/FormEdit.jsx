import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { updateNote } from '../../redux/notesSlicers';
import { getNotes } from '../../redux/notesSelectors';
import s from './NotesList.module.css';

export default function EditForm({ editNote, handleCloseEditor }) {
  const { name, created, category, content, dates } = editNote;
  const notes = useSelector(getNotes);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [nameEdit, setNameEdit] = useState('');
  const [categoryEdit, setCategoryEdit] = useState('');
  const [createdEdit, setCreatedEdit] = useState('');
  const [contentEdit, setContentEdit] = useState('');
  const [datesEdit, setDatesEdit] = useState('');

  const updatedNote = {
    id: editNote.id,
    name: nameEdit !== '' ? nameEdit : editNote.name,
    created: createdEdit !== '' ? createdEdit : editNote.created,
    category: categoryEdit !== '' ? categoryEdit : editNote.category,
    content: contentEdit !== '' ? contentEdit : editNote.content,
    dates: datesEdit !== '' ? datesEdit : editNote.dates,
    archive: editNote.archive,
  };

  const saveUpdateNote = updatedNote => dispatch(updateNote(updatedNote));

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleCloseEditor();
      setOpen(!open);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    saveUpdateNote(updatedNote);
    setNameEdit('');
    setCategoryEdit('');
    setCreatedEdit('');
    setContentEdit('');
    setDatesEdit('');

    handleClose(!open);
  };
  console.log('open', open);

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Edit the note</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          fullWidth
          autoComplete="off"
          sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
        >
          <FormControl>
            <TextField
              id="noteName"
              label="Note's name"
              variant="outlined"
              className={s.formInput}
              defaultValue={name}
              // value={name}
              onChange={e => setNameEdit(e.target.value)}
              style={{ marginTop: 10, marginBottom: 10 }}
            />

            <TextField
              id="created"
              label="Created"
              defaultValue={created}
              onChange={e => setCreatedEdit(e.target.value)}
              variant="filled"
              className={s.formInput}
              style={{ marginBottom: 10 }}
            />
            <FormControl>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                lable="Choose Category"
                id="select-category"
                defaultValue={category}
                onChange={e => setCategoryEdit(e.target.value)}
                variant="outlined"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                <MenuItem value={'Task'}>Task</MenuItem>
                <MenuItem value={'Random Thought'}>Random Thought</MenuItem>
                <MenuItem value={'Idea'}>Idea</MenuItem>
                <MenuItem value={'Quote'}>Quote</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="content"
              label="Content"
              variant="outlined"
              className={s.formInput}
              defaultValue={content}
              onChange={e => setContentEdit(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <TextField
              id="dates"
              label="Dates"
              variant="outlined"
              className={s.formInput}
              defaultValue={dates}
              onChange={e => setDatesEdit(e.target.value)}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
