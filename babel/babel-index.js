import parser from '@babel/parser';
import trarverse from '@babel/traverse';
import generator from '@babel/generator';
// 自定义简单编译方法
import lexer from './lexer.js';
import {
    codeGeneration,
    semanticAnalysis
} from './generator.js';
import parse from './parser.js';

const code = 'let name = coder';

const ast = parser.parse(code);

const vistor = {
    VariableDeclaration(path) {
        if (path.node.kind === 'let') {
            path.node.kind = 'var';
        }
    }
};
trarverse.default(ast, vistor);

const res = generator.default(ast, {}, code);

console.log(code, res.code);

// 自定义编译 实现'let name = coder' 转换
const tokens = lexer(code);

console.log(tokens, 'tokens');

const AST = parse(tokens);

console.log(AST, 'AST');

const AnalysisAst = semanticAnalysis(AST);

console.log(AnalysisAst, 'AnalysisAst');

const result = codeGeneration(AnalysisAst);

console.log(result, 'result');








