import s from "./NotesList.module.css";


export default function Button({children}){
    return(
        <button type="button" className={s.btn}>{children}</button>
    )
}