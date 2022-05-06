import React from 'react'
import {useDragHandle} from './utils/useDragHandle'
import {useDragHandleSpace} from './utils/useDragHandleSpace'

interface DragS extends Omit<React.AllHTMLAttributes<HTMLDivElement>,'id'> {
  space?:boolean,
  blankDisappearTime?:string,
}

export default function DragSource ({children,space = false,blankDisappearTime,...props}:DragS) {
  const {dragOver,dragStart,dragEnd,darg,drop,dragEnter,dragLeave} = useDragHandle (blankDisappearTime)
  const {dragOverSpace,dropSpace,dragStartSpace,dragEndSpace,dargSpace} = useDragHandleSpace ( blankDisappearTime)
  
  return ( 
    <div id='drag_=0' {...props} 
      onDragEnter={ dragEnter}
      onDrag={space ? dargSpace:darg} 
      onDragStart={space ?dragStartSpace: dragStart} 
      onDragEnd={space ? dragEndSpace : dragEnd} 
      onDrop={space ? dropSpace : drop} 
      onDragOver = {space ? dragOverSpace : dragOver}
      onDragLeave = {dragLeave}
    >
      {children}
    </div>  
  )
}






