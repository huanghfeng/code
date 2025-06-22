const TOKEN_TYPES = {
    KEYWORD: 'keyword',
    IDENTIFIER: 'identifier',
    OPERATOR: 'operator',
    NUMBER: 'number'
};

const AST_NODE_TYPES = {
    VARIABLE_DECLARATION: 'VariableDeclaration',
    BINARY_EXPRESSION: 'BinaryExpression',
    LITERAL: 'Literal',
    IDENTIFIER: 'Identifier'
};


export default function parse(tokens) {
    let i = 0;

    function parseVariableDeclaration() {
        const token = tokens[i];
        // 校验是否是 let 关键字
        if (token.type === TOKEN_TYPES.KEYWORD && token.value === 'let') {
            i++;
            const identifier = tokens[i];
            i++;
            const operator = tokens[i];
            i++;
            const expression = parseExpression();
            return {
                type: AST_NODE_TYPES.VARIABLE_DECLARATION,
                identifier: {
                    type: AST_NODE_TYPES.IDENTIFIER,
                    name: identifier.value
                },
                init: expression
            };
        }
        throw new Error(`Expected 'let' keyword at position ${i}`);
    }

    function parseExpression() {
        let left = parsePrimary();

        // 处理二元表达式（只要后续是操作符，就继续组合）
        while (i < tokens.length && tokens[i].type === TOKEN_TYPES.OPERATOR) {
            const operator = tokens[i].value;
            i++;
            const right = parsePrimary();
            left = {
                type: AST_NODE_TYPES.BINARY_EXPRESSION,
                operator,
                left,
                right
            };
        }

        return left;
    }

    function parsePrimary() {
        const token = tokens[i];
        if (token.type === TOKEN_TYPES.NUMBER) {
            i++;
            return {
                type: AST_NODE_TYPES.LITERAL,
                value: Number(token.value)
            };
        }
        if (token.type === TOKEN_TYPES.IDENTIFIER) {
            i++;
            return {
                type: AST_NODE_TYPES.IDENTIFIER,
                name: token.value
            };
        }
        throw new Error(`Unexpected token type '${token.type}' at position ${i}`);
    }

    // 从解析变量声明开始（可扩展支持更多语法入口）
    return parseVariableDeclaration();
}
