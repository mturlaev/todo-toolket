import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./App.module.css"
import { deleteTodos, fetchTodos, patchTodos, postTodos } from "./features/todoSlice";
import CircularProgress from '@mui/material/CircularProgress'

function App() {
  const todos = useSelector((state) => state.todos)
  const [text, setText] = useState("")
  const loading = useSelector((state) => state.loading)
console.log(todos);
  const dispath = useDispatch()

  useEffect(() => {
    dispath(fetchTodos())
  }, [dispath])

  const handleText = (e) => {
    setText(e.target.value)
  }

  const handleAddClick = () => {
    dispath(postTodos(text))
    setText("")
  }

  const handleDelete = (id) => {
    dispath(deleteTodos(id))
  }
  const handleActive = (id, completed) => {
    dispath(patchTodos({id, completed}))
  }


  return (
    <div className={css.header}>
      <div className={css.main}>
        <input type="text"
        placeholder="Введите текст"
        value={text}
        onChange={(e) => handleText(e)}
        />
        <button className={css.btn} onClick={handleAddClick} type={"submit"}>add</button>
      </div>
      <div className={css.addList}>
      {loading && <div className={css.loader}><CircularProgress /></div>}
        {todos.map((item, id) => {
          return (
            <>
            <div className={css.items} key={id}>
              <button className={(item.completed) ? css.btnItem1 : css.btnItem2} onClick={() => handleActive(item._id, item.completed)}>⭐</button>
              {item.text}
              <button className={css.btn_item} onClick={() => handleDelete(item._id)}>x</button>
            </div>
            </>
            
          )
        })}
      </div>
    </div>
  );
}

export default App;
