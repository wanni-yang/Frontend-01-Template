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