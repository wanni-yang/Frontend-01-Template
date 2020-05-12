async function afoo() {
    console.log("-2");
    await new Promise(resolve => resolve());
    console.log("-1");
    await new Promise(resolve => resolve());
    console.log("0.5")
}
new Promise(resolve => (console.log("0"), resolve()))
    .then(() => (
        console.log("1"),
        new Promise(resolve => resolve())
            .then(() => console.log("1.5")) ));

setTimeout(function () {
    console.log("2");
    new Promise(resolve => resolve()).then(console.log("3"))
}, 0)
console.log("4");
console.log("5");
afoo();
// then的参数是立即执行的
new Promise(res => res())
    .then(
        ()=>
            setTimeout(()=>console.log(1),1000),
            console.log(0)
    );
console.log(2);
async function async1(){
    console.log('async 1 start');
    await async2();
    console.log('async 1 end');
}
async function async2(){
    console.log('async 2');
}
async1();
new Promise(function(resolve){
    console.log("promise 1");
    resolve();
}).then(function(){
    console.log("promise 2")
})
//0509
"s123cript".match(/(123)/);
"s123cript".match();
//正则求最小公倍数 正常匹配和正则和字符串成正比，时间复杂度O(n),\1 带回溯时间复杂度不确定
"aaaaaa".match(/(aaa)\1+/);
"aaaaaa".match(/(a?a)\1+/);
"aaaaaa".match(/(a|a-z|a)\1+/);