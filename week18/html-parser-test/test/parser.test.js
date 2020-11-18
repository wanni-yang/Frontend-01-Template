import {parseHTML} from "../src/parser.js"
const assert = require('assert');

it('should parser a single element', ()=>{
    let doc = parseHTML("<div></div>");
    let div = doc.children[0]
    assert.strictEqual(div.tagName, "div")
    assert.strictEqual(div.children.length, 0)
    assert.strictEqual(div.type, "element")
    assert.strictEqual(div.attributes.length, 0)
})
it('should parser a single element with text context', ()=>{
    let doc = parseHTML("<div>hello mie</div>");
    let text = doc.children[0].children[0];
    assert.strictEqual(text.content, "hello mie")
    assert.strictEqual(text.type, "text")

})

it('tag mismatch', ()=>{
    try {
        let doc = parseHTML("<div></vid>")
    } catch (error) {
        assert.strictEqual(error.message, "Tag start end doesn't match!")
    }
})
it('text with <', () =>{
    let doc = parseHTML("<div>a < b</div>");
    let text = doc.children[0].children[0];
    assert.strictEqual(text.content, "a < b")
    assert.strictEqual(text.type, "text")
})
it('with property', () =>{
    let doc = parseHTML("<div id=a class='b' data=\"aaa\"></div>");
    let div = doc.children[0];
    let count = 0;
    for(let attr of div.attributes){
        if(attr.name === 'id'){
            count ++
            assert.equal(attr.value, "a")
        }
        if(attr.name === 'class'){
            count ++
            
            assert.equal(attr.value, "b")
        }
        if(attr.name === 'data'){
            
            count ++
            assert.equal(attr.value, "aaa")
        }
    }
    assert.ok(count === 3)
})
it("with double quoted property",() =>{
    let doc = parseHTML("<div id=a class='b' data=\"aaa\"></div>");
    let div = doc.children[0];
    let count = 0;
    for(let attr of div.attributes){
        if(attr.name === 'id'){
            count ++
            assert.equal(attr.value, "a")
        }
        if(attr.name === 'class'){
            count ++
            
            assert.equal(attr.value, "b")
        }
        if(attr.name === 'data'){
            
            count ++
            assert.equal(attr.value, "aaa")
        }
    }
    assert.ok(count === 3)
})
it("with selfclosetag",() =>{
    let doc = parseHTML("<div id=a class='b' data=\"aaa\"/>");
    let div = doc.children[0];
    let count = 0;
    for(let attr of div.attributes){
        if(attr.name === 'id'){
            count ++
            assert.equal(attr.value, "a")
        }
        if(attr.name === 'class'){
            count ++
            
            assert.equal(attr.value, "b")
        }
        if(attr.name === 'data'){
            
            count ++
            assert.equal(attr.value, "aaa")
        }
    }
    assert.ok(count === 3)
})
it('script', () => {
    let content = `<div>abc</div>
    <span>x</span>
    /script>
    <script
    <
    </
    </s
    </sc
    </scr
    </scri
    </scrip
    </script `
    let doc = parseHTML(`<script>${content}</script>`);
    let text = doc.children[0].children[0];

    assert.strictEqual(text.content,content);
    assert.strictEqual(text.type, 'text')
})
it('parse a sigle element with attributes 2', () => {
    const doc = parseHTML(`<div c="3"/>`)
    const element = doc.children[0]
    assert.equal(element.attributes.length, 2)
  })
  
it('parse a sigle element with attributes 4', () => {
    const doc = parseHTML(`<div a b></div>`)
    const element = doc.children[0]
    assert.equal(element.attributes.length, 2)
    assert.equal(element.attributes[0].name, 'a')
    assert.equal(element.attributes[1].name, 'b')
  })
it('missing whitespace between attributes', () => {
    try {    
        const doc = parseHTML('<div id="Id"class="cls"></div>')
    } catch (error) {
        assert.equal(error.message, 'missing-whitespace-between-attributes parse error')
    }
})
it('tag mismatch', () => {
    try {    
      const doc = parseHTML('<h1></h2>')
    } catch (error) {
      assert.equal(error.message, 'Tag start end doesn\'t match!')
    }
  })
  it('self closing start tag', () => {
    const doc = parseHTML('<br/>')
    const element = doc.children[0]
    assert.equal(element.attributes.length, 1)
    assert.equal(element.attributes[0].name, 'isSelfClosing')
    assert.equal(element.attributes[0].value, true)
  })
  
  it('missing end tag name', () => {
    try {
      const doc = parseHTML('<h1></>')
    } catch (error) {
      assert.equal(error.message, 'missing-end-tag-name parse error')
    }
  })
  it('invalid first character of tag name', () => {
    try {
      const doc = parseHTML('<h1></*>')
    } catch (error) {
      assert.equal(error.message, 'invalid-first-character-of-tag-name parse error')
    }
  })