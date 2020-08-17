const fs = require('fs');
const parser = require('@babel/parser') ;
const traverse = require ('@babel/traverse');

const moduleIndex = fs.readFileSync('./src/index.js' , 'utf-8');
const moduleAST = parser.parse(moduleIndex , {
    sourceType : 'module'
});
const dependencies = [];
traverse.default( moduleAST , {
    ImportDeclaration( { node } ){
        //导入节点部分
        dependencies.push(node.source.value);
    },
    enter(path){
        console.log('进入语法树');
        // console.log(path);
    },
    exit(){
        console.log('退出节点');
    }
})

console.log(dependencies);

