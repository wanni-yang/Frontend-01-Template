import {parseHTML} from "../src/parser.js"
const assert = require('assert');

it('should parser a single element', ()=>{
    let doc = parseHTML("<div></div>");
    let div = doc.children[0]
    assert.equal(div.tagName, "div")
    assert.equal(div.children.length, 0)
    assert.equal(div.type, "element")
    assert.equal(div.attributes.length, 2)
})
it('should parser a single element with text context', ()=>{
    let doc = parseHTML("<div>hello mie</div>");
    let text = doc.children[1].children[0];
    assert.equal(text.content, "hello mie")
    assert.equal(text.type, "text")
    // assert.equal(div.attributes.length, 2)
})