import { useState} from 'react';
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
import { addNote } from '../../redux/notesSlicers';
import moment from 'moment';
import {getNotes} from '../../redux/notesSelectors';
import { v4 as uuidv4 } from 'uuid';
import s from './NotesList.module.css';

export default function Form() {
  const date = new Date();
  const dateFormat = moment(date).format('MMM DD, YYYY');
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [created, setCreated] = useState(`${dateFormat}`);
  const [content, setContent] = useState('');
  const [dates, setDates] = useState('');
 

  const notes = useSelector(getNotes);
  const dispatch = useDispatch();
  
  const note = {
    id: uuidv4(),
    name,
    created,
    category,
    content,
    dates,
    archive:false,
  };
  const saveNote = note => dispatch(addNote(note));

  const handleChange = event => {
    setCategory(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
    const findNote = notes.find(
      note => note.name.toLowerCase() === name.toLowerCase(),
    );

    if (findNote) {
      return;
    } else {
      saveNote(note);
      setName('');
      setCategory('');
      setCreated('');
      setContent('');
      setDates('');
    }
    handleClose(event);
  };

  return (
    <> 
    <div className={s.boxCreateBtn}>
      <Button onClick={handleClickOpen} className={s.openBtn}>Create Note</Button>
      </div>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the note</DialogTitle>
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
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ marginTop: 10, marginBottom: 10 }}
              />

              <TextField
                id="created"
                label="Created"
                defaultValue={`${dateFormat}`}
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
                value={category}
                onChange={handleChange}
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
                value={content}
                onChange={e => setContent(e.target.value)}
                style={{ marginBottom: 10 }}
              />
              <TextField
                id="dates"
                label="Dates"
                variant="outlined"
                className={s.formInput}
                value={dates}
                onChange={e => setDates(e.target.value)}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
