import LocalGroceryStore from '@mui/icons-material/LocalGroceryStore';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import s from './NotesList.module.css';

// const categories=[
//     {name:"Task", icon:"LocalGroceryStore"},
//     {name:"Random Thought",icon:"PsychologyIcon"},
//     {name:"Idea", icon:"LightbulbIcon"},
//     {name:"Quote",icon:"FormatQuoteIcon" }
// ]

// const getCategoryIcon=(nameCategory)=>{

//     const currentIcon=categories.find(category=>nameCategory.component=== category.name).icon
//     console.log(currentIcon)
//     return currentIcon;
//         }

export default function CurrentIcon(nameCategory) {
  return (
    <>
      {/* {getCategoryIcon(nameCategory,categories)} */}
      
      {nameCategory.component === 'Task' && (
        <LocalGroceryStore className={s.bodyRowIcon} />
      )}
      {nameCategory.component === 'Random Thought' && (
        <PsychologyIcon className={s.bodyRowIcon} />
      )}
      {nameCategory.component === 'Idea' && (
        <LightbulbIcon className={s.bodyRowIcon} />
      )}
      {nameCategory.component === 'Quote' && (
        <FormatQuoteIcon className={s.bodyRowIcon} />
      )}
    </>
  );
}
