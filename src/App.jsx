import { useCallback, useState } from "react"
import truncate from "./helper/truncate"
import useDelete from "./hooks/useDelete"
import useText from "./hooks/useText"
import useGet from "./hooks/useGet"
import usePost from "./hooks/usePost"
import Dialog from "./components/Dialog"

function App() {
  const [visible, setVisible] = useState(false)
  const [idDialog, setIdDialog] = useState('')
  const { text, setTextEvent } = useText()
  const { getData, data } = useGet("/todo")
  const { postData, loading } = usePost()
  const { deleteData } = useDelete()

  const handleShow = useCallback((id) => () => {
    setIdDialog(id)
    setVisible(true)
  }, [setVisible, setIdDialog])

  const saveTodo = useCallback(async () => {
    try {
      await postData({ todo: text }, "/todo")
      await getData("/todo")
    } catch(er) { }
  }, [text, postData, getData])

  const deleteTodo = useCallback((id) => async () => {
    try {
      await deleteData(`/todo/${id}`)
      await getData("/todo")
    } catch(er) { }
  }, [text, deleteData, getData])


  return (
    <main className="bg-[#0f172a] min-h-screen min-w-screen">
      <article className="max-w-[350px] m-auto">
        <h1 className="text-center text-[#7acff7] text-2xl font-bold p-[10px] pt-[20px]">Simple Todo List</h1>
        <section className="bg-[#1e293b] flex justify-between p-[10px] rounded mt-[20px]">
          <input type="text" name="text" id="text" className="block text-[#7dd3fc] p-[10px] rounded outline-none border-none bg-[#2d4358] w-[77%]" placeholder="I will watch a lot of anime today" onChange={setTextEvent} />
          <button className="w-[20%] bg-[#2d4358] rounded text-[#7dd3fc] p-[10px] disabled:cursor-not-allowed" disabled={!text || loading} onClick={saveTodo}>Save!</button>
        </section>
        {
          data?.length && <h1 className="text-center text-[#7acff7] text-2xl font-bold mt-[40px]">Your Todos</h1>
        }
        <section className="flex flex-col bg-[#1e293b] mt-[20px]">
          {
            data?.map(itm => (
              <section className="flex justify-between p-[10px] rounded items-center" key={itm?._id}>
                <p className="text-[#7acff7] font-bold p-[10px]">{truncate(itm.todo, 15)}</p>
                <div className="flex items-center">
                  <button className="mr-[10px] w-[20px] h-[20px] rounded-full bg-[#803c3cb5] flex items-center justify-center p-[20px] text-[#f57070]" onClick={deleteTodo(itm._id)}>D</button>
                  <button className="w-[20px] h-[20px] rounded-full bg-[#2d4358] flex items-center justify-center p-[20px] text-[#7dd3fc]" onClick={handleShow(itm._id)}>D</button>
                </div>
              </section>
            ))
          }
        </section>
      </article> 

      <Dialog visible={visible} setVisible={setVisible} id={idDialog} updateCallback={getData} />     
    </main>
  )
}

export default App
