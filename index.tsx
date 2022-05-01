import React from 'react'
import DragSource from './DragSource'
import DropCard from './DropCard'
import {DragProvider} from './utils/context'
interface Drag extends Omit<React.AllHTMLAttributes<HTMLDivElement>,'id'> {
  space?:boolean, 
  blankDisappearTime?:string,
}

 function DragContainer(props:Drag) {
  return (
    <DragProvider>
      <DragSource {...props}  >
      </DragSource>
    </DragProvider>
  )
}

export {
  DropCard,
  DragContainer
}
