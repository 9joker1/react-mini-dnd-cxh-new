import React from 'react'
import {useDrag} from './utils/context'
import useCreactId from './utils/useCreateId'

interface DragC extends Omit<React.AllHTMLAttributes<HTMLDivElement>,'id'> {
  level:number,
  indexDrag:number |string
 }


export default function DropCard({level,indexDrag,children,...props}:DragC) {
  const idG = useCreactId(level,indexDrag)
  const {isDraggable} = useDrag()

  return (
    <div id={idG} draggable = {isDraggable} {...props} >
      {children}  
    </div>
  )
}






