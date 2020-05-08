
var set = new Set();
var globalProperties = [
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "Array",
    "Date",
    "RegExp",
    "Promise",
    "Proxy",
    "Map",
    "WeakMap",
    "Set",
    "WeakSet",
    "Function",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "Object",
    "Error",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8ClampedArray",
    "Atomics",
    "JSON",
    "Math",
    "Reflect"];
// objects.forEach(o => set.add(o));

// for(var i = 0; i < objects.length; i++) {
//     var o = objects[i]
//     for(var p of Object.getOwnPropertyNames(o)) {
//         var d = Object.getOwnPropertyDescriptor(o, p)
//         if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
//             if(!set.has(d.value))
//                 set.add(d.value), objects.push(d.value);
//         if( d.get )
//             if(!set.has(d.get))
//                 set.add(d.get), objects.push(d.get);
//         if( d.set )
//             if(!set.has(d.set))
//                 set.add(d.set), objects.push(d.set);
//     }
// }
let queue = [];
for()
let current;

while(queue.length){
    current = queue.shift();
    console.log(current.path.join('.'))
    if(set.has(current.object)){
        continue;
    }
    let proto = Object.
    set.add(current.object);
    for(let p of Object.getOwnPropertyNames(current.object)){
        var property = Object.getOwnPropertyDescriptor(current.object,p);

        if(property.hasOwnProperty("value") && 
        ((property.value != null) && (typeof property.value == "object") 
        || (typeof property.value == "function")) && property.valuee instanceof Object){
            queue.push({
                path: current.path.concat([p]),
                Object:property.value
            })
        }
            
        if(property.hasOwnProperty("get") && typeof property.value == "function"){
            queue.push({
                path: current.path.concat([p]),
                Object:property.get
            })
        }
        if(property.hasOwnProperty("set") && typeof property.value == "function")
        queue.push({
            path: current.path.concat([p]),
            Object:property.set
        })
    }

}
// Antv G6可视化 https://g6.antv.vision/en/
var iframe = document.createElement("iframe");
document.body.appendChild(iframe);
iframe.contentWindow.Object.prototype