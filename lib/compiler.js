const path = require('path');
const fs = require('fs');
const parser = require('./parser');
const config = require('../webpack.config.js');

class Compiler {
    constructor( props ){
       this.entry = props.entry ;
       this.output = props.output;
       this.modules = [];
    }

    run(){
      //开始编译
        const entryModule = this.buildModules( this.entry , true );
        this.modules.push( entryModule );
        this.modules.map( _module =>
            _module.dependencies.map( _m =>{
                this.buildRecurrence( _m );
            })
        );

    }
    buildRecurrence( filename ){
        //递归构建模块
        const buildResult = this.buildModules( filename , false );
        this.modules.push( buildResult );
        if( buildResult.dependencies.length > 0 ){
            buildResult.dependencies.map( m =>
                this.buildRecurrence(m)
            )
        }else{
            return;
        }

    }

    buildModules( filename , isEntry ){
        //模块构建
        //filename 文件名
        //isEntry 是否为入口文件
          let ast ;
          if( isEntry ){
              ast = parser.getAST( filename );
          }else{
              const absolutePath = path.resolve( process.cwd(), "../src", filename );
              ast = parser.getAST( absolutePath );
          }
          return {
              filename ,
              dependencies : parser.getASTdependencies( ast ) ,
              transformCode : parser.transform(ast)
          }
    }

    emitFiles(){
       //输出文件
        const output = path.resolve( this.output.path , this.output.filename );
        console.log(output);
    }
}

const webpackAction = new Compiler( config );
webpackAction.run();
webpackAction.emitFiles();
