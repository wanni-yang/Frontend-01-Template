
// require('./foo.js')
import "./foo";
let component = <Cls id='a' />;
// 语法糖
// let component = React.creatElement(Cls,{
//     id:'a'
// })
component.setAttribute('id','a')