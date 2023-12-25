import React, { useState, useRef, useEffect } from "react"
import { FileType } from "../types"

interface RecursiveItemInputProps {
  file: FileType
  editModeOff: (content: string) => void
}

export const RecursiveItemInput = (props: RecursiveItemInputProps) => {
  const { file, editModeOff } = props
  const [value, setValue] = useState<string>(file.name)
  const ref = useRef(null)

  const handleKeyDown = (e: any) => {
    if (e.which === 13) {
      e.preventDefault()
      editModeOff(value)
    }
    if (e.which === 27) {
      e.preventDefault()
      // don't change it
      editModeOff(file.name)
    }
  }

  const handleEditBlur = (event: React.SyntheticEvent) => {
    event.stopPropagation()
    // don't change it
    editModeOff(file.name)
  }

  const handleFocus = (e: any) => {
    // select the file name without the extension
    const val = e.target.value
    const dotIndex = val.lastIndexOf('.')
    if (dotIndex > 0) {
      e.target.setSelectionRange(0, dotIndex)
    } else {
      e.target.setSelectionRange(0, val.length)
    }
  }

  useEffect(() => {
    ref.current.focus()
  },[])

  return(<input 
    onBlur={handleEditBlur} 
    onKeyDown={handleKeyDown} 
    ref={ref} 
    style={{
      height: '1.5em',
    }}
    className='form-control p-0 ml-2' 
    onFocus={handleFocus} 
    onChange={e => setValue(e.target.value)} 
    defaultValue={file.name}>
    </input>)
}