import { useCallback, useState } from "react"

export default () => {
    const [text, setText] = useState('')

    const setTextEvent = useCallback((e) => {
        setText(e.target.value)
    }, [setText])

    return { text, setTextEvent, setText }
}