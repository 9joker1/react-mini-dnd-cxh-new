import React, { createContext,useState ,useContext,  ReactNode} from "react";

const DargContext = createContext<{
  idGrag:string,
  isDraggable:boolean,
  setIdGrag:(e:string)=> void,
  setIsDraggable:(e:boolean)=>void,
}|null >(null) 

export  function DragProvider ({children}:{children:ReactNode}) {
  
  const [idGrag,setIdGrag] = useState('drag')
  const [isDraggable,setIsDraggable] = useState(true)
 
  return (
    <DargContext.Provider value={{idGrag,setIdGrag,isDraggable,setIsDraggable}}>
      {children}
    </DargContext.Provider>
  )
}

export const useDrag = () => {
  const context = useContext(DargContext)
  if(!context){
    throw new Error('useContext is undefined')
  }
  return context
}