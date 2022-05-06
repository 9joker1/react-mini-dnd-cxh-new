import React ,{useRef}from 'react'
import { useDrag} from './context'
import {useSelect} from './useSelect'

export  function useDragHandle( time = '0.5s') {
  const {setIdGrag,setIsDraggable,isBlankDisappear} = useDrag()
  const width = useRef(0)
  const height = useRef(0)
  const border =  useRef(0)
  let dom = document.createElement('div')
  const {selectDragEnter,selectDrop,selectDragLeave} = useSelect (dom)
  dom.style.opacity='0'  
  dom.setAttribute('id','dom_Drag')
  dom.style.boxSizing = 'border-box';

  function dragStart(e:React.DragEvent<HTMLDivElement>) {
    setIsDraggable(false);
    setIdGrag((e.target as HTMLDivElement).id);
    width.current = (e.target as HTMLDivElement).offsetWidth;
    height.current = (e.target as HTMLDivElement).offsetHeight; 
    border.current = ((e.target as HTMLDivElement).offsetWidth-(e.target as HTMLDivElement).clientWidth)/2; 
  }
  
  function darg (e:React.DragEvent<HTMLDivElement>) {
    (e.target  as HTMLDivElement).style.opacity = '0'; 
    if(isBlankDisappear.current){
      (e.target  as HTMLDivElement).style.transition = `height ${time} ,width ${time}`;
      (e.target  as HTMLDivElement).style.height = '0';
      (e.target  as HTMLDivElement).style.width = '0';
      (e.target  as HTMLDivElement).style.borderWidth = '0';
    }
  }

  function dragEnd (e:React.DragEvent<HTMLDivElement>) {
    isBlankDisappear.current = false;
    (e.target  as HTMLDivElement).style.transition = 'none';
    (e.target  as HTMLDivElement).style.opacity = '1';  
    (e.target  as HTMLDivElement).style.boxSizing = 'border-box';
    (e.target  as HTMLDivElement).style.height = `${height.current}px`; 
    (e.target  as HTMLDivElement).style.width = `${width.current}px`;
    (e.target  as HTMLDivElement).style.borderWidth =`${border.current}px`;
    (dom as HTMLDivElement).remove();
    setIsDraggable(true);
    setIdGrag('');
  } 

  function dragOver(e:React.DragEvent<HTMLDivElement>){
    e.preventDefault();  
  }
  
  function dragEnter (e:React.DragEvent<HTMLDivElement>) {
    dom.style.height = `${height.current}px`
    dom.style.width = `${width.current}px`
    selectDragEnter((e.target) as HTMLDivElement)
  } 
  
  function drop(e:React.DragEvent<HTMLDivElement>){ 
    selectDrop((e.target) as HTMLDivElement) 
  }

  function dragLeave(e:React.DragEvent<HTMLDivElement>) {
    selectDragLeave((e.target) as HTMLDivElement)
  }
  
  return {    
    dragOver,
    drop,
    dragStart,
    dragEnd,
    darg,
    dragEnter,
    dragLeave
  }
}