## Features
Small memory,Achieve basic animation effects,It is alike animation effect as
'react-beautiful-dnd 、react-dnd'，More than 80% similarity.

Build using 'draggable' API.

Use GitHub to download , Memory stick is 15 kb, 
https://github.com/9joker1/react-mini-dnd-cxh.git .


实现基本动画效果,体积小,实现多级嵌套效果,与'react-beautiful-dnd 、react-dnd'有相似的效果，相试度到达80%以上。
使用'draggable' API 进行封装。

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

<DragContainer blankDisappearTime={'0.7s'}>
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



可使用“div”除‘id’外的属性,可选属性blankDisappearTime 默认 '0.5s',控制空白消失的时间。
‘space’默认值为‘flase’,如果‘space’为默认值,同级的"DropCard"之间必须无空隙 ，否则会出错。
如果 ‘space’为 ‘true’ ，同级的 "DropCard" 可以有间隙 ，但动画效果不佳。

————————————————————————————

DropCard : Attributes other than 'id' can be used with 'div';
可使用“div”除‘id’外的属性

DropCard parameter:
1. "level" : the label of 'Dropcard' on the outermost layer is "level = 1", the label of 'dropcard' on the second layer is "level = 2", and so on. It must be written in this way.

"level" : 最外层的‘DropCard’标签为“ level = 1”，第二层‘DropCard’标签为“level = 2” ，之后以此
类推，必须这么传参数。
 type level = number

 
2. "indexdrag": It must be different the values of "indexdrag" of the same "level" layer , such as "key".

"indexDrag" : 相同"level"层 的 ”indexDrag”的值必须不等，如“key”一样。
type indexdrag = number | string


### `warning`

1. It's can be moved the "DropCard" of the same level. 
2. Need to use TS.
3. If 'space' is false or  default value, there must be no gap between "DropCard" of the same level, otherwise an error will occur.You can use children's margin or padding  to create voids.
4. DragContainer set up padding ,there be a gap between  browser toolbar and DropCard, otherwise it's an error when top element drag to Browser toolbar .
5. if these "DropCards" is children of  "DropCard" or "DragContainer",  these DropCards  must be a line or a  column . 

只有同级的"DropCard"之间可以移动.
需要使用TS.
如果‘space’为 ‘flase’或者不传值,同级的"DropCard"之间必须无空隙 ,否则会出错。
可以用children 的padding 和 margin 产生空隙。
DragContainer 设置padding 与工具栏产生间接 ,可以避免顶部元素上拉拖住出错。
如果这些“DropCard”是“DropCard”或“DragContainer”的子项，则这些DropCard必须是一行或一列。