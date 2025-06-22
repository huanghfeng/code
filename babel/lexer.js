// 定义 token 类型常量
const TOKEN_TYPES = {
    KEYWORD: 'keyword',
    IDENTIFIER: 'identifier',
    OPERATOR: 'operator',
    NUMBER: 'number'
};

// 词法分析器函数
export default function lexer(input) {
    let tokens = [];
    let i = 0;

    while (i < input.length) {
        const char = input[i];

        // 匹配关键字 'let'
        if (char === 'l' && input.slice(i, i + 3) === 'let') {
            tokens.push({ type: TOKEN_TYPES.KEYWORD, value: 'let' });
            i += 3;
            continue;
        }

        // 匹配标识符（变量名等，由字母、下划线组成）
        if (/[a-zA-Z_]/.test(char)) {
            let identifier = '';
            while (i < input.length && /[a-zA-Z_]/.test(input[i])) {
                identifier += input[i];
                i++;
            }
            tokens.push({ type: TOKEN_TYPES.IDENTIFIER, value: identifier });
            continue;
        }

        // 匹配操作符和符号（这里简单匹配单个字符的操作符，可扩展）
        if (/[+\-*/%=]/.test(char)) {
            tokens.push({ type: TOKEN_TYPES.OPERATOR, value: char });
            i++;
            continue;
        }

        // 匹配数字（整数，可扩展支持小数等）
        if (/[0-9]/.test(char)) {
            let num = '';
            while (i < input.length && /[0-9]/.test(input[i])) {
                num += input[i];
                i++;
            }
            tokens.push({ type: TOKEN_TYPES.NUMBER, value: num });
            continue;
        }

        // 忽略空白字符
        if (/\s/.test(char)) {
            i++;
            continue;
        }

        // 遇到未知字符，这里简单抛出错误，可根据需求调整处理逻辑
        throw new Error(`Unexpected character '${char}' at position ${i}`);
    }

    return tokens;
}

// 测试用例
const input = 'let num = 123 + abc';
const result = lexer(input);
console.log(result);