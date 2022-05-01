import{useState,useEffect,useRef}from 'react'

export default function useCreateId(level:number,index:number|string) {

  const [id,setId] = useState('drag')
  const num = useRef('drag')
  for (let i = 1 ;i <=level ;i++){
     num.current = `${num.current}_drag` 
   } 
  num.current = `${num.current}=${index}`
  useEffect(()=>{
    setId(num.current)
  },[num])
  
  return id
    
}
