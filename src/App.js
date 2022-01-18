import Container from './components/Container/Container';
import NotesList from './components/NotesList/NotesList';
import SummaryList from './components/SummaryList/SummaryList'

 export default function App() {
  return (
    <Container>
      <NotesList />
      <SummaryList/>
    </Container>
  );
};