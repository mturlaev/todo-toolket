import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./App.module.css"
import { add, deleted } from "./features/todoReducer";

function App() {
  const todos = useSelector((state) => state.todos)
  const [text, setText] = useState("")
  const dispath = useDispatch()


  const handleText = (e) => {
    setText(e.target.value)
  }

  const handleAddClick = () => {
    dispath(add(text))
    setText("")
  }

  const handleDelete = (id) => {
    dispath(deleted(id))
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
        {todos.map((item, id) => {
          return (
            <div className={css.items} key={id}>
              {item.text}
              <button className={css.btn_item} onClick={() => handleDelete(id)}>x</button>
            </div>
            
          )
        })}
      </div>
    </div>
  );
}

export default App;
