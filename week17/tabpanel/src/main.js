import { create, Text, Wrapper } from './create'
import { TabPanel } from './TabPanel.js'
import { List } from './List.js'

// let tabpanel = <TabPanel title='this is my Tabpanel'>
//     <span title="tab1">this is content1</span>
//     <span title="tab2">this is content2</span>
//     <span title="tab3">this is content3</span>
//     <span title="tab4">this is content4</span>

// </TabPanel>
let data = [
    {title:'蓝猫',url: 'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg'},
    {title:'黄白猫',url: 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg'},
    {title:'花猫',url: 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg'},
    {title:'橘猫',url: 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'},
]
let list = <List data = {data}>
    {record => <figure>
        <img src = {record.url}/>
        <figcaption>{record.title}</figcaption>
    </figure>}
    </List>

list.mountTo(document.body)
