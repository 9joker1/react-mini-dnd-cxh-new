import {useRef }from 'react'
import { useDrag} from './context'

export function useSelect(dom:HTMLDivElement) {
  const {idGrag} = useDrag()
  let dragSonId = idGrag.split('=').slice(0,-1).join('_') 
  let dragParentsId = idGrag.split('_').slice(0,-1).join('_') 
  let dragSonIdExg = new RegExp(`^${dragSonId}`)
  let dragParentsIdExg = new RegExp(`^${dragParentsId}=\\w{1,}$`)
  let dargExg = /(drag){1,}/
  let length = idGrag.split('_').length 
  let dragAncestorsIdExg = new RegExp(`(drag){1,${length > 1 ? length-1 : 1}}`)
  
  const element = useRef<(Node & ParentNode) | null | undefined>(null) 

  const selectDragOver =(ele: (Node & ParentNode) | null | undefined):any=>{
    element.current = ele
    let lenT = (ele as HTMLDivElement).id.split('_').length 
    let s = lenT - length
    //No darg type ID element judgment
    // 没有darg类型ID元素判断
    if((ele as HTMLDivElement).id !== 'dom_Drag'){
      if(!dargExg.test((ele as HTMLDivElement).id)){   
        while (!dargExg.test((element.current as HTMLDivElement)?.id)){
          element.current = element.current?.parentNode
        } 
        selectDragOver(element.current)        
      } 
    }
    //Element judgment at the same level or below  
    // 同级或以下级元素判断
    if(dragSonIdExg.test((ele as HTMLDivElement).id)){
      for(let i = 0 ;i<s;i++){
        element.current = element.current?.parentNode
      };
      return element.current?.parentNode?.insertBefore(dom,element.current);
    }   
    //Judgment of elements above the parent level
    // 父级以上元素判断
    if(dragAncestorsIdExg.test((ele as HTMLDivElement).id)) {
      (ele as HTMLDivElement).appendChild(dom) 
      dom.style.height='0'
      dom.style.width='0'                
    }
  }

  const selectDrop =(ele: (Node & ParentNode) | null | undefined) => {
    element.current = ele
    let lenT = (ele as HTMLDivElement).id.split('_').length ;
    let s = lenT - length;
     //No darg type ID element judgment
    // 没有darg类型ID元素判断
    if(!dargExg.test((ele as HTMLDivElement).id)){   
      while (!dargExg.test((element.current as HTMLDivElement)?.id)){
        element.current = element.current?.parentNode
      }    
      selectDrop(element.current)       
    }  
     //Element judgment at the same level or below  
    // 同级或以下级元素判断
    if(dragSonIdExg.test((ele as HTMLDivElement).id)){
      for(let i = 0 ;i<s;i++){
        element.current = element.current?.parentNode
      };
      element.current?.parentNode?.insertBefore(document.getElementById(idGrag)! ,element.current)
    }   
    //Judgment of elements above the parent level
    // 父级元素判断
    if(dragParentsIdExg.test((ele as HTMLDivElement).id)) {
      (ele as HTMLDivElement).appendChild(document.getElementById(idGrag)!);             
    }
    //Judgment of blank
    if((ele as HTMLDivElement).id ==='dom_Drag'){ 
      if((ele as HTMLDivElement).nextElementSibling){
        (ele as HTMLDivElement).parentNode?.insertBefore(document.getElementById(idGrag)!,(ele as HTMLDivElement))
      }else{
        (ele as HTMLDivElement).appendChild(document.getElementById(idGrag)!)
      }
    }
  }
  return {
    selectDragOver,
    selectDrop
  }
   
}