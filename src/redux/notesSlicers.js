import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import initialNotes from '../data.json';

const initialState = {
  notes: JSON.parse(window.localStorage.getItem('notes')) ?? initialNotes,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, { payload }) => ({
      ...state,
      notes: [...state.notes, payload],
    }),
    deleteNote: (state, { payload }) => ({
      ...state,
      notes: state.notes.filter(note => note.id !== payload),
    }),
    archiveNote: (state, { payload }) => ({
      ...state,
      notes: state.notes.map(note =>
        note.id === payload ? { ...note, archive: !note.archive } : note,
      ),
    }),
    updateNote:(state, { payload}) => ({
      ...state,
      notes: state.notes.map(note =>
        note.id === payload.id? { ...payload}:note
      ),
    }),
  },
});

const rootReducer = combineReducers({
  notes: notesSlice.reducer,
});

export const { addNote, deleteNote,archiveNote,updateNote } = notesSlice.actions;


export default rootReducer;
