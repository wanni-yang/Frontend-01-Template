import { createElement } from './lib/createElement'
import { Panel } from './lib/Panel'
import { TabPanel } from './lib/TabPanel'
import { ListView } from './lib/ListView'

const data = [
  {title: '蓝猫', url:'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg'},
  {title: '橘猫加白', url:'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg'},
  {title: '狸花加白', url:'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg'},
  {title: '橘猫', url:'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'},
]

// let component = (
//   <TabPanel>
//     <span title='title1'>this is content 1</span>
//     <span title='title2'>this is content 2</span>
//     <span title='title3'>this is content 3</span>
//     <span title='title4'>this is content 4</span>
//   </TabPanel>
// )

let component = (
  <ListView data={data}>
    {
      record => <figure>
        <img src={record.url} class="list-item-image" />
        <figcaption>{record.title}</figcaption>
      </figure>
    }
  </ListView>
)

window.component = component

component.mountTo(document.body)
