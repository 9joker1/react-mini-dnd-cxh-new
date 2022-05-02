import React ,{useRef }from 'react'
import { useDrag} from './context'
import {useSelect} from './useSelect'

export  function useDragHandle( time = '0.5s') { 
  let dom = document.createElement('div')
  const {selectDragOver,selectDrop} = useSelect (dom)
  const {setIdGrag,setIsDraggable} = useDrag()
  const width = useRef(0)
  const height = useRef(0) 
  dom.style.opacity='0'  
  dom.setAttribute('id','dom_Drag')

  function dragStart(e:React.DragEvent<HTMLDivElement>) {
  
    setIsDraggable(false);
    setIdGrag((e.target as HTMLDivElement).id);
    width.current = (e.target as HTMLDivElement).offsetWidth;
    height.current = (e.target as HTMLDivElement).offsetHeight;   
  }
  
  function darg (e:React.DragEvent<HTMLDivElement>) {
    (e.target  as HTMLDivElement).style.opacity = '0';  
    (e.target  as HTMLDivElement).style.transition = `height ${time} ,width ${time}`;
    (e.target  as HTMLDivElement).style.height = '0';
    (e.target  as HTMLDivElement).style.width = '0';
  }

  function dragEnd (e:React.DragEvent<HTMLDivElement>) {
    (e.target  as HTMLDivElement).style.transition = 'none';
    (e.target  as HTMLDivElement).style.opacity = '1';  
    (e.target  as HTMLDivElement).style.height = `${height.current}px`; 
    (e.target  as HTMLDivElement).style.width = `${width.current}px`;
    (dom as HTMLDivElement).remove();
    setIsDraggable(true);
    setIdGrag('')
  } 

  function dragOver (e:React.DragEvent<HTMLDivElement>) {
    dom.style.height = `${height.current}px`
    dom.style.width = `${width.current}px`
    e.preventDefault();  
    selectDragOver( (e.target) as HTMLDivElement)
  } 

  function drop(e:React.DragEvent<HTMLDivElement>) { 
    selectDrop((e.target) as HTMLDivElement)    
  }

  return {    
    dragOver,
    drop,
    dragStart,
    dragEnd,
    darg
  }
}