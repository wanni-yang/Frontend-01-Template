function match(string){
    let state = start;
    for(let c of string){
        state = state(c);
    }
    return state === end;
}
function start(c){
    if(c === 'a')
        return foundA;
    else
        return start;
}
// 固定状态，进入这个状态就不可能切到其他状态，返回自身，表示最终的结果，不一定有一个结果
function end(c){
    return end;
}
function foundA(c){
    if(c === 'b')
        return foundB;
    else
        // return start;
        return start(c);//把本状态（foundA）代理到start状态
}
function foundB(c){
    if(c === 'c')
        return foundC;
    else
        return start(c);
}
function foundC(c){
    if(c === 'd')
        return foundD;
    else
        return start(c);
}
function foundD(c){
    if(c === 'e')
        return foundE;
    else
        return start(c);
}
function foundE(c){
    if(c === 'f')
        return end;
    else
        return start(c);
}
match('aabbceeff')