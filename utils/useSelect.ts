import {useRef }from 'react'
import { useDrag} from './context'

export function useSelect(dom:HTMLDivElement) {
  const {idGrag,isBlankDisappear} = useDrag()
  let [dragSonId] = idGrag.split('=').slice(0,-1)
  let dragParentsId = idGrag.split('_').slice(0,-2).join('_') 
  let dragSonIdExg = new RegExp(`^${dragSonId}`)
  let dragParentsIdExg = new RegExp(`^${dragParentsId}_=[\\w\\W]*$`)
  let length = idGrag.split('_').length-1
  let dargExg = /(drag_){1,}/;
  let dragAncestorsIdExg = new RegExp(`^(drag_){1,${length-1>1 ? length-1 : 1}}$`);
  const element = useRef<(Node & ParentNode) | null | undefined>(null) 
  const element2 = useRef<(Node & ParentNode) | null | undefined>(null) 
  
  const selectDragEnter =(ele: (Node & ParentNode) | null | undefined)=>{
    element.current = ele
    let lenT = (ele as HTMLDivElement).id.split('_').length - 1 ;
    let s = lenT - length;
    let [dragAncestorsId] = (ele as HTMLDivElement).id.split('=').slice(0,-1) 
    if((ele as HTMLDivElement).id !== 'dom_Drag'){
      if(!dargExg.test((ele as HTMLDivElement).id)){   
        while (!dargExg.test((element.current as HTMLDivElement)?.id)){
          element.current = element.current?.parentNode
        } 
        selectDragEnter(element.current)        
      } 
    }
    if(dragSonIdExg.test((ele as HTMLDivElement).id)){
      for(let i = 0 ;i<s;i++){
        element.current = element.current?.parentNode
      };
      if((element.current as HTMLDivElement ).id !== idGrag && element.current !== (document.getElementById(idGrag) as HTMLDivElement ).nextElementSibling ){   
        isBlankDisappear.current = true
        element.current?.parentNode?.insertBefore(dom,element.current)
      } 
    }
    if(dragAncestorsIdExg.test(dragAncestorsId)) {
      isBlankDisappear.current = true;
      (ele as HTMLDivElement).appendChild(dom) 
      dom.style.height='0';
      dom.style.width='0' ;         
    }
  }
  const selectDrop =(ele: (Node & ParentNode) | null | undefined) => {
    element.current = ele
    let lenT = (ele as HTMLDivElement).id.split('_').length - 1 ;
    let s = lenT - length ;
    if(!dargExg.test((ele as HTMLDivElement).id)){   
      while (!dargExg.test((element.current as HTMLDivElement)?.id)){
        element.current = element.current?.parentNode
      } 
      selectDrop(element.current)      
    }  
    if(dragSonIdExg.test((ele as HTMLDivElement).id)){
      for(let i = 0 ;i<s;i++){
        element.current = element.current?.parentNode
      };
      if(!(element.current as HTMLDivElement).previousElementSibling){
        element.current?.parentNode?.insertBefore(document.getElementById(idGrag)!,element.current)
      }else{
        element.current?.parentNode?.insertBefore(document.getElementById(idGrag)!,(element.current as HTMLDivElement).nextElementSibling);
      } 
    } 
    if(dragParentsIdExg.test((ele as HTMLDivElement).id)) {
      (ele as HTMLDivElement).appendChild(document.getElementById(idGrag)!);             
    }
    if((ele as HTMLDivElement).id ==='dom_Drag'){ 
      if((ele as HTMLDivElement).nextElementSibling){
        (ele as HTMLDivElement).parentNode?.insertBefore(document.getElementById(idGrag)!,(ele as HTMLDivElement))
      }else{
        (ele as HTMLDivElement).appendChild(document.getElementById(idGrag)!) 
      }
    }
  }
   // (fix bug)
  //Top element darg up 
  const selectDragLeave =(ele: (Node & ParentNode) | null | undefined)=>{
    element2.current = ele
    let lenT = (ele as HTMLDivElement).id.split('_').length - 1 ;
    let s = lenT - length;
    if((ele as HTMLDivElement).id !== 'dom_Drag'){
      if(!dargExg.test((ele as HTMLDivElement).id)){   
        while (!dargExg.test((element2.current as HTMLDivElement)?.id)){
          element2.current = element2.current?.parentNode
        } 
        selectDragLeave(element2.current)        
      } 
    }
    if(dragSonIdExg.test((ele as HTMLDivElement).id)){
      for(let i = 0 ;i<s;i++){
        element2.current = element2.current?.parentNode
      };
      if((element2.current as HTMLDivElement ).id === idGrag){   
        isBlankDisappear.current = true
      } 
    }
  }
  return {
    selectDragEnter,
    selectDrop,
    selectDragLeave
  }  
}
