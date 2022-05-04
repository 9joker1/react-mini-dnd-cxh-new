import { createContext,useState,useContext,ReactNode,useRef} from "react";

const DargContext = createContext<{
  idGrag:string,
  isDraggable:boolean,
  setIdGrag:(e:string)=> void,
  setIsDraggable:(e:boolean)=>void,
  isBlankDisappear:React.MutableRefObject<boolean>
}|null >(null) 

export  function DragProvider ({children}:{children:ReactNode}) {
  
  const [idGrag,setIdGrag] = useState('drag')
  const [isDraggable,setIsDraggable] = useState(true)
  const isBlankDisappear = useRef(false)
 
  return (
    <DargContext.Provider value={{idGrag,setIdGrag,isDraggable,setIsDraggable,isBlankDisappear}}>
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