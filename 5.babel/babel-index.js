import parser from '@babel/parser';
import trarverse from '@babel/traverse';
import generator from '@babel/generator';
const code = 'const name = coder';

const ast = parser.parse(code);

const vistor = {
    VariableDeclaration(path) {
        if (path.node.kind === 'const') {
            path.node.kind = 'var';
        }
    }
};
trarverse.default(ast, vistor);

const res = generator.default(ast, {}, code);

console.log(code, res.code);



