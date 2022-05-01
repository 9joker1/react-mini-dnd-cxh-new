import React from 'react'

import {useDragHandle} from './utils/useDragHandle'
import {useDragHandleSpace} from './utils/useDragHandleSpace'


interface DragS extends Omit<React.AllHTMLAttributes<HTMLDivElement>,'id'> {
  space?:boolean,
  blankDisappearTime?:string,
}
export default function DragSource ({children,space = false,blankDisappearTime,...props}:DragS) {
 
  const {dragOver,dragStart,dragEnd,darg,drop} = useDragHandle (blankDisappearTime)
  const {dragOverSpace,dropSpace,dragStartSpace,dragEndSpace,dargSpace} = useDragHandleSpace ( blankDisappearTime)  
  return ( 
    <div id='drag=0' {...props} 
      onDragOver={space ? dragOverSpace: dragOver}
      onDrag={space ? dargSpace:darg} 
      onDragStart={space ?dragStartSpace: dragStart} 
      onDragEnd={space ? dragEndSpace : dragEnd} 
      onDrop={space ? dropSpace : drop} 
    >
      {children}
    </div>  
  )
}


