import React ,{useRef }from 'react'
import { useDrag} from './context'

export  function useDragHandleSpace( time = '0.5s') {
  const {idGrag} = useDrag()
  const {setIdGrag,setIsDraggable} = useDrag()
  let [dragSonId] = idGrag.split('=').slice(0,-1)
  let dragParentsId = idGrag.split('_').slice(0,-2).join('_') 
  let dragSonIdExg = new RegExp(`^${dragSonId}`)
  let dragParentsIdExg = new RegExp(`^${dragParentsId}_=[\\w\\W]*$`)
  let length = idGrag.split('_').length-1
  let dargExg = /(drag_){1,}/;
  const width = useRef(0)
  const height = useRef(0)
  
  function dragStartSpace(e:React.DragEvent<HTMLDivElement>) {
    setIdGrag((e.target as HTMLDivElement).id);
    width.current = (e.target as HTMLDivElement).offsetWidth;
    height.current = (e.target as HTMLDivElement).offsetHeight;
  }
  function dargSpace (e:React.DragEvent<HTMLDivElement>) {
    (e.target  as HTMLDivElement).style.opacity = '0';  
    (e.target  as HTMLDivElement).style.transition = `height ${time} ,width ${time}`;
    (e.target  as HTMLDivElement).style.height = '0';
    (e.target  as HTMLDivElement).style.width = '0';
  }
  function dragEndSpace (e:React.DragEvent<HTMLDivElement>) {
    (e.target  as HTMLDivElement).style.transition = 'none';
    (e.target  as HTMLDivElement).style.opacity = '1';  
    (e.target  as HTMLDivElement).style.boxSizing = 'border-box';
    (e.target  as HTMLDivElement).style.height = `${height.current}px`; 
    (e.target  as HTMLDivElement).style.width = `${width.current}px`;
    setIsDraggable(true);
    setIdGrag('')
  }  
  function dragOverSpace (e:React.DragEvent<HTMLDivElement>) {
    e.preventDefault();  
  };
  function dropSpace(e:React.DragEvent<HTMLDivElement>) { 
    let lenT = (e.target as HTMLDivElement).id.split('_').length-1 ;
    let s = lenT - length;
    let element = e.target as (Node & ParentNode) | null | undefined
    let node = e.target as any  ;
    if(!dargExg.test((e.target as HTMLDivElement).id)){
      while (!dargExg.test(node?.id)){
       node = node?.parentNode
      }
      if (!dragSonIdExg.test(node?.id)) return  
      node.parentNode.insertBefore(document.getElementById(idGrag)!,node);
    };
    if(dragSonIdExg.test((e.target as HTMLDivElement).id)){
      for(let i = 0 ;i<s;i++){
        element = element?.parentNode
      }; 
      element?.parentNode?.insertBefore(document.getElementById(idGrag)!,element)
    };
    if(dragParentsIdExg.test((e.target as HTMLDivElement).id)) {
      (e.target as HTMLDivElement).appendChild(document.getElementById(idGrag)!); 
    }
  }
  return {    
    dragOverSpace,
    dropSpace,
    dragStartSpace,
    dragEndSpace,
    dargSpace
  }
}