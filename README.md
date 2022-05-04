## Features
Small memory,Multilayer Mobile,It is alike animation effect as
'react-beautiful-dnd 、react-dnd'，More than 80% similarity.
The size of the source code is smaller, only 15kb.
Build using 'draggable' API.

https://github.com/9joker1/react-mini-dnd-cxh-new.git 

##  Update

 Better animation effects.
___________________________

 There be a gap between  Browser toolbar and DropCard, otherwise it's an error when top element drag to Browser toolbar .
 DragContainer should set up padding .

##  Install

```bash
$ npm install --save react-mini-dnd-cxh
# or
$ yarn add react-mini-dnd-cxh
```
##  Usage

```ts
import {DragContainer,DropCard} from 'react-mini-dnd-cxh';

```

### ` for example`

```ts

<DragContainer blankDisappearTime={'0.7s'} space={flase} style={{padding:"10px"}}>
  <DropCard className='name' level={1} indexDrag={'1'} 
  style={{height:'300px',width:'500px'}}
  >
    {a.map((i)=>{
      return <DropCard level={2} indexDrag={i.id} key={i.id} >
      <div className='sss'>{i.text}</div>
    </DropCard>   
    })}
  </DropCard>
  <DropCard className='name' level={1} indexDrag={'2'} >
    <DropCard level={2} indexDrag={'hello'} className='sss'>
      <DropCard level={3} indexDrag={'hello1'}>
        <div style={{margin:"10px"}}>
          <div style={{height:'30px'}}>hello</div>
        </div>
      </DropCard>
      <DropCard level={3} indexDrag={'hello2'}>
        <div style={{margin:"10px"}}>
          <div style={{height:'30px'}}>Hello</div>
        </div>
      </DropCard>
    </DropCard>
  </DropCard>
</DragContainer>

```

### ` API`

DragContainer :   
Attributes other than 'id' can be used'.

(optional parameter) :blankDisappearTime ,default value: '0.5s' . 
Control the time when the blank disappears.
type blankDisappearTime = string

(optional parameter) :space , default value: flase.
If 'space' is false ,  A gap is forbiden between "DropCard" of the same level, otherwise an error will occur.
If 'space' is true , A gap is allow between "DropCard" of the same level, But the animation effect is not good.
type space = boolean

————————————————————————————

DropCard: 
Attributes other than 'id' can be used.

DropCard parameter:
1. "level" : the label of 'Dropcard' on the outermost layer is "level = 1", the label of 'dropcard' on the second layer is "level = 2", and so on. It must be written in this way.
type level = number

2. "indexdrag": It must be different the values of "indexdrag" of the same "level" layer , such as "key".
type indexdrag = number | string

### `warning`

1. It's can be moved the "DropCard" of the same level. 
2. parent of "DropCard"  must be "DropCard" or "DragContainer".
3. If 'space' is false or  default value, there must be no gap between  "DropCard" of the same level, otherwise shake will occur,You can use children's margin or padding  to create voids.
4. DragContainer set up padding , otherwise it's an error when drag to Browser toolbar .
5. if these "DropCards" is children of  "DropCard" or "DragContainer",  these DropCards  must be a row or a column , otherwise shake will occur




