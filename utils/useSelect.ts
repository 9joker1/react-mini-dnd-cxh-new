import {useRef }from 'react'
import { useDrag} from './context'

export function useSelect(dom:HTMLDivElement,time:string) {
  const {idGrag} = useDrag()
  let dragSonId = idGrag.split('=').slice(0,-1).join('_') 
  let dragParentsId = idGrag.split('_').slice(0,-1).join('_') 
  let dragSonIdExg = new RegExp(`^${dragSonId}`)
  let dragParentsIdExg = new RegExp(`^${dragParentsId}=\\w{1,}$`)
  let dargExg = /(drag){1,}/
  let len = idGrag.split('_').length ;
  const element = useRef<(Node & ParentNode) | null | undefined>(null) 

  const selectDragOver =(ele: (Node & ParentNode) | null | undefined)=>{
    element.current = ele
    let lenT = (ele as HTMLDivElement).id.split('_').length ;
    let s = lenT - len;
    //No darg type ID element judgment
    // 没有darg类型ID元素判断
    if(!dargExg.test((ele as HTMLDivElement).id)){   
      while (!dargExg.test((element.current as HTMLDivElement)?.id)){
        element.current = element.current?.parentNode
      }    
      selectDragOver(element.current)       
    }
    //Element judgment at the same level or below  
    // 同级或以下级元素判断
    if(dragSonIdExg.test((ele as HTMLDivElement).id)){
      for(let i = 0 ;i<s;i++){
        element.current = element.current?.parentNode
      };
      element.current?.parentNode?.insertBefore(dom,element.current);
    }   
    //Judgment of elements above the parent level
    // 父级以上元素判断
    if(dragParentsIdExg.test((ele as HTMLDivElement).id)) {

      dom.style.height='0';
      dom.style.width='0' ;
      dom.style.transition = `all ${time}`;
      (ele as HTMLDivElement).appendChild(dom)               
    }
  }

  const selectDrop =(ele: (Node & ParentNode) | null | undefined) => {
    element.current = ele
    let lenT = (ele as HTMLDivElement).id.split('_').length ;
    let s = lenT - len;
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
    // 父级以上元素判断
    if(dragParentsIdExg.test((ele as HTMLDivElement).id)) {
      (ele as HTMLDivElement).appendChild(document.getElementById(idGrag)!);             
    }
    if((ele as HTMLDivElement).id ==='dom_drag'){ 
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
