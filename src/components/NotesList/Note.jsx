import s from './NotesList.module.css';
import CurrentIcon from './Icon ';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CreateIcon from '@mui/icons-material/Create';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from './Button';
import { useSelector, useDispatch } from 'react-redux';
import { deleteNote, archiveNote } from '../../redux/notesSlicers';

export default function Note({ note, handleClickArchive, handleClickDelete}) {
  
  return (
    <>
      <TableCell component="th" scope="row" className={s.bodyRowName}>
        <CurrentIcon component={note.category} />
        {note.name}
      </TableCell>
      <TableCell className={s.bodyDescr}>{note.created}</TableCell>
      <TableCell className={s.bodyDescr}>{note.category}</TableCell>
      <TableCell className={s.bodyDescr}>{note.content}</TableCell>
      <TableCell className={s.bodyDescr}>{note.dates}</TableCell>
      <TableCell>
        <Button
        >
          <CreateIcon fontSize="small" className={s.bodyIconBtn}   onClickUpdate={()=>handleClickUpdate(note.id)}/>
        </Button>
      </TableCell>
      <TableCell>
        <Button>
          <ArchiveIcon
            fontSize="small"
            className={s.bodyIconBtn}
            onClickArchive={() => handleClickArchive(note.id)}
          />
        </Button>
      </TableCell>
      <TableCell>
        <Button>
          <DeleteIcon
            fontSize="small"
            className={s.bodyIconBtn}
            onClickDelete={() => handleClickDelete(note.id)}
          />
        </Button>
      </TableCell>
    </>
  );
}
