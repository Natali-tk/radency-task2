import { useSelector} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {getNotes} from '../../redux/notesSelectors';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CurrentIcon from '../NotesList/Icon ';
import s from '../NotesList/NotesList.module.css';

export default function SummaryList() {
  const notes = useSelector(getNotes);

  let categoryList = [];
  notes.map(note => {
    const uniqNote = categoryList.find(n => n.category === note.category);
    if (uniqNote) {
      note.archive ? uniqNote.archive+=1 : uniqNote.active+=1;
    } else {
      categoryList.push({
        id: uuidv4(),
        category: note.category,
        active: note.archive ? 0 : 1,
        archive: note.archive ? 1 : 0,
      });
    }
    return categoryList;
  });

  return (
    <>
      <Paper>
        <Table>
          <TableHead>
            <TableRow className={s.headerRow}>
              <TableCell className={s.headerDescr}>Note Category</TableCell>
              <TableCell className={s.headerDescr}>Active</TableCell>
              <TableCell className={s.headerDescr}>Archived</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryList.map(({ id, category, active, archive }) => {
              return (
                <TableRow key={id} className={s.bodyRow}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={s.bodyRowName}
                  >
                    <CurrentIcon component={category} />
                    {category}
                  </TableCell>
                  <TableCell className={s.bodyDescr}>{active}</TableCell>
                  <TableCell className={s.bodyDescr}>{archive}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
