export function semanticAnalysis(ast) {
    // 检查变量声明是否合法
    if (ast.type === AST_NODE_TYPES.VARIABLE_DECLARATION) {
        const varName = ast.identifier.name;
        if (varName === 'x') {
            console.log(`Variable '${varName}' is declared using let. Will be transformed to var.`);
        }
        // 可扩展更多变量名检查逻辑，比如判断是否重复声明等
    }
    return ast;
}

// 定义 AST 节点类型常量，需与语法分析阶段保持一致
const AST_NODE_TYPES = {
    VARIABLE_DECLARATION: 'VariableDeclaration',
    BINARY_EXPRESSION: 'BinaryExpression',
    LITERAL: 'Literal',
    IDENTIFIER: 'Identifier'
};

// 代码生成函数
export function codeGeneration(node) {
    switch (node.type) {
        case AST_NODE_TYPES.VARIABLE_DECLARATION:
            return (
                'var ' +
                codeGeneration(node.identifier) +
                ' = ' +
                codeGeneration(node.init) +
                ';'
            );
        case AST_NODE_TYPES.BINARY_EXPRESSION:
            return (
                codeGeneration(node.left) +
                ' ' +
                node.operator +
                ' ' +
                codeGeneration(node.right)
            );
        case AST_NODE_TYPES.LITERAL:
            return node.value.toString();
        case AST_NODE_TYPES.IDENTIFIER:
            return node.name;
        default:
            throw new Error('Unknown node type: ' + node.type);
    }
}