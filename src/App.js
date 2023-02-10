import { useState } from "react"
import './App.css';

function App() {
  let [input, setInput] = useState("");
  let [list, setList] = useState([]);
  let [update, setUpdate] = useState(true);
  const [isEdit, setIsEdit] = useState();

  // For add all task 
  let addTask = () => {

    if (input.length === 0) {
      alert("enter value")
    } else if (input && !update) {
      setList(
        list.map((e) => {
          if (e.id === isEdit) {
            return { ...list, name: input }
          }
          return e;
        })
      )
      setUpdate(true);
      setInput("")
      setIsEdit(null);
    }
    else {
      const allData = { id: new Date().getTime().toString(), name: input }
      let addData = [...list, allData]
      setList(addData);
      setInput("")
    }


  }

  // for removing element from array and view 
  let deleteTask = (index) => {
    let element = list.filter((value) => index !== value.id);
    setList(element);
    console.log(element);
  }



  // update list here
  let updateTask = (id) => {
    const newItem = list.find((value) => {
      return value.id === id
    })
    setUpdate(false);
    setInput(newItem.name)
    setIsEdit(id);
  }


  //  after click all list items
  let deleteAll = () => {
    setList([]);
  }
  return (
    <div className="main_div">
      <div className='center_div'>
        <h1 className='heading'>ToDo List</h1>
        <input type="text" placeholder='Add Item' value={input} onChange={(e) => setInput(e.target.value)} />

          {/* button change for  add and update */}
        {
          update ? <button onClick={addTask}>Add List</button> :
            <button onClick={addTask}>update</button>
        }


        <div className='detail_div'>
          {list.map((e, i) => (
            <div className="detail">
              <h4 className='list_name' >{e.name}</h4>
              <div className='edit-delete'>
                <i className="fa-solid fa-pen-to-square" style={{ color: "red" }} onClick={() => updateTask(e.id)}></i>
                <i className="fa-solid fa-trash-can" title='delete' onClick={() => deleteTask(e.id)}></i>
              </div>
            </div>
          ))}
        </div>

        {/* delete all list */}
        <button style={{ marginTop: "20px" }} onClick={deleteAll}>Clear</button>
      </div>
    </div>
  );
}

export default App;
