// https://www.w3.org/TR/?tag=css
var lis = document.getElementById("container").children // 1223条

var result = [];

for (let li of lis) {
    if (li.getAttribute('data-tag').match(/css/))
        result.push({
            name: li.children[1].innerText, // 标题
            url: li.children[1].children[0].href // 链接
        })
}
console.log(JSON.stringify(result, null, 4))
console.log('W3C有'+result.length+'条css标准') // 139条