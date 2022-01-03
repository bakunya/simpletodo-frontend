import { useCallback, useEffect, useState } from 'react'
import useGet from '../hooks/useGet'
import usePut from '../hooks/usePut'
import useText from '../hooks/useText'

export default ({ visible, setVisible, id, updateCallback }) => {
    const [update, setUpdate] = useState(false)
    const { text, setTextEvent, setText } = useText()
    const { loading, getData, data } = useGet(`/todo/${id}`)
    const { putData } = usePut()

    const handleClose = useCallback(() => {
        if(loading) return
        setVisible(false)
    }, [setVisible])

    const saveTodo = useCallback(async () => {
        try {
            await putData({ id, todo: text }, '/todo')
            await Promise.all([
                getData(`/todo/${id}`),
                updateCallback('/todo'),
            ])
            setUpdate(false)
        } catch(er) { }
    }, [id, text, putData, getData])

    const updateTodo = useCallback(() => setUpdate(true), [setUpdate])

    useEffect(() => setText(data?.todo ?? ''), [data])

    return (
        <section className={`fixed inset-0 w-screen h-screen items-center justify-center bg-[#0f172a] ${!visible ? 'hidden' : 'flex'}`}>
            <div className="w-screen md:w-[60vw] h-[50vh] bg-[#1e293b] rounded flex flex-col py-[50px] px-[30px] justify-evenly relative">
                {
                    !update 
                    ? (
                        <>
                            <h1 className="text-[#7acff7] font-bold p-[10px] text-[25px]">{data?.todo ?? ''}</h1>
                            <button className="ml-auto w-[20%] bg-[#2d4358] rounded text-[#7dd3fc] p-[10px] disabled:cursor-not-allowed" onClick={updateTodo}>Update</button>
                            <button className="m-[10px] absolute top-0 right-0 w-[40px] h-[40px] bg-[#2d4358] rounded-full text-[#7dd3fc] p-[10px] disabled:cursor-not-allowed" onClick={handleClose}>X</button>
                        </>
                    ) : (
                        <>
                            <input type="text" name="text" id="text" className="w-full block text-[#7dd3fc] p-[10px] rounded outline-none border-none bg-[#2d4358]" placeholder="I will watch a lot of anime today" onChange={setTextEvent} value={text} />
                            <button className="ml-auto w-[20%] bg-[#2d4358] rounded text-[#7dd3fc] p-[10px] disabled:cursor-not-allowed" onClick={saveTodo}>Save!</button>
                        </>
                    )
                }
            </div>
        </section>
    )
}