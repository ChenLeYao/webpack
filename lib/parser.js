const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const core = require('babel-core');
console.log(core);
module.exports = {
   getAST( sourse ){
      const ast =  fs.readFileSync( sourse , 'utf-8');
      const ASTtree =  parser.parse( ast , {
          sourceType : "module"
      });
      return ASTtree;
   } ,
   getASTdependencies( ASTtree ){
       const dependencies = [];
       traverse.default( ASTtree , {
           enter(){
             // console.log('进入语法树');
           },
           ImportDeclaration({ node }){
               dependencies.push( node.source.value );
           }}
       );
       return dependencies;
   },
    transform( ast ){
       const { code } = core.transformFromAst( ast , null , {
           presets : ['@babel/preset-env']
       });
       return code;
    }
};