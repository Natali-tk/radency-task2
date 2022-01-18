import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrentIcon from './Icon ';
import Button from './Button';
import Form from './Form';
import FormEdit from './FormEdit';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteNote, archiveNote, updateNote } from '../../redux/notesSlicers';
import { getNotes } from '../../redux/notesSelectors';
import s from './NotesList.module.css';

export default function NotesList() {
  const notes = useSelector(getNotes);
  const activeNotes = notes.filter(note => !note.archive);
  const archiveNotes = notes.filter(note => note.archive);

  const [archiveList, setArchiveList] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [editNote, setEditNote] = useState({});
  const dispatch = useDispatch();
  const handleClickDelete = id => dispatch(deleteNote(id));
  const handleClickArchive = id => dispatch(archiveNote(id));

  const handleClickUpdate = id => {
    const editNote = notes.find(note => note.id === id);
    setEditNote(editNote);
    setOpenEditor(!openEditor);
  };

  const handleCloseEditor = () => {
    setOpenEditor(!openEditor);
  };

  console.log('openEditor', openEditor);
  const handleOpenArchiveList = e => {
    e.preventDefault();
    setArchiveList(!archiveList);
  };

  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <Paper>
        <Table>
          <TableHead>
            <TableRow className={s.headerRow}>
              <TableCell className={s.headerDescr}>Name</TableCell>
              <TableCell className={s.headerDescr}>Created</TableCell>
              <TableCell className={s.headerDescr}>Category</TableCell>
              <TableCell className={s.headerDescr}>Content</TableCell>
              <TableCell className={s.headerDescr}>Dates</TableCell>
              <TableCell className={s.headerIcon}>
                
              </TableCell>
              <TableCell className={s.headerIcon}>
                <Button>
                  <ArchiveIcon
                    fontSize="small"
                    className={
                      archiveList ? `${s.activeIcon}` : `${s.archiveIcon}`
                    }
                    onClick={handleOpenArchiveList}
                  />
                </Button>
              </TableCell>
              <TableCell className={s.headerIcon}>
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archiveList === true &&
              archiveNotes.map(
                ({ id, name, created, category, content, dates }) => {
                  return (
                    <TableRow key={id} className={s.bodyRow}>
                      <TableCell
                        component="th"
                        scope="row"
                        className={s.bodyRowName}
                      >
                        <CurrentIcon component={category} />
                        {name}
                      </TableCell>
                      <TableCell className={s.bodyDescr}>{created}</TableCell>
                      <TableCell className={s.bodyDescr}>{category}</TableCell>
                      <TableCell className={s.bodyDescr}>{content}</TableCell>
                      <TableCell className={s.bodyDescr}>{dates}</TableCell>
                      <TableCell>
                        <Button>
                          <CreateIcon
                            fontSize="small"
                            className={s.bodyIconBtn}
                            onClick={handleClickUpdate}
                          />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button>
                          <ArchiveIcon
                            fontSize="small"
                            className={s.bodyIconBtn}
                            onClick={() => handleClickArchive(id)}
                          />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button>
                          <DeleteIcon
                            fontSize="small"
                            className={s.bodyIconBtn}
                            onClick={() => handleClickDelete(id)}
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
            {archiveList === false &&
              activeNotes.map(
                ({ id, name, created, category, content, dates }) => {
                  return (
                    <TableRow key={id} className={s.bodyRow}>
                      <TableCell
                        component="th"
                        scope="row"
                        className={s.bodyRowName}
                      >
                        <CurrentIcon component={category} />
                        {name}
                      </TableCell>
                      <TableCell className={s.bodyDescr}>{created}</TableCell>
                      <TableCell className={s.bodyDescr}>{category}</TableCell>
                      <TableCell className={s.bodyDescr}>{content}</TableCell>
                      <TableCell className={s.bodyDescr}>{dates}</TableCell>
                      <TableCell>
                        <Button onClick={e => console.log(e.target)}>
                          <CreateIcon
                            fontSize="small"
                            className={s.bodyIconBtn}
                            onClick={() => handleClickUpdate(id)}
                          />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button>
                          <ArchiveIcon
                            fontSize="small"
                            className={s.bodyIconBtn}
                            onClick={() => handleClickArchive(id)}
                          />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button>
                          <DeleteIcon
                            fontSize="small"
                            className={s.bodyIconBtn}
                            onClick={() => handleClickDelete(id)}
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
          </TableBody>
        </Table>
      </Paper>
      <Form />
      {openEditor && (
        <FormEdit editNote={editNote} handleCloseEditor={handleCloseEditor} />
      )}
    </>
  );
}
