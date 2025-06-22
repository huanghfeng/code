const TokenType = {
    KEYWORD: '关键字',
    IDENTIFIER: '标识符',
    OPERATOR: '运算符',
    NUMBER_LITERAL: '数字字面量'
};

function lex(code) {
    const tokens = [];
    let i = 0;
    const codeLength = code.length;

    // 定义正则表达式（按优先级排序）
    const rules = [
        // 1. 关键字（优先匹配）
        { regex: /\b(if|else|while|for|let|const|var)\b/g, type: TokenType.KEYWORD },
        // 2. 数字字面量
        { regex: /\d+(\.\d+)?/g, type: TokenType.NUMBER_LITERAL },
        // 3. 运算符（多字符优先）
        { regex: /===|!==|==|!=|>=|<=|&&|\|\|=|!|>|<|\+|-|\*|\/|%/g, type: TokenType.OPERATOR },
        // 4. 标识符（字母开头）
        { regex: /[a-zA-Z_$][a-zA-Z_$0-9]*/g, type: TokenType.IDENTIFIER }
    ];

    while (i < codeLength) {
        let matched = false;
        // 按规则顺序尝试匹配
        for (const rule of rules) {
            rule.regex.lastIndex = i; // 设置正则起始位置
            const match = rule.regex.exec(code);
            if (match && match.index === i) { // 确保从当前位置开始匹配
                tokens.push({ type: rule.type, value: match[0] });
                i = rule.regex.lastIndex;
                matched = true;
                break;
            }
        }
        if (!matched) {
            // 处理非法字符（此处仅跳过，可改为报错）
            i++;
        }
    }

    return tokens;
}

// =====================
// 测试用例 1：let a=10;
// =====================
const testCase1 = 'let a=10;';
const tokens1 = lex(testCase1);
console.log('测试用例 1 结果：');
tokens1.forEach(token => {
    console.log(`{ type: ${token.type}, value: ${token.value} }`);
});
// 预期输出：
// { type: 关键字, value: let }
// { type: 标识符, value: a }
// { type: 运算符, value: = }
// { type: 数字字面量, value: 10 }

// =====================
// 测试用例 2：if (a===b)
// =====================
const testCase2 = 'if (a===b)';
const tokens2 = lex(testCase2);
console.log('\n测试用例 2 结果：');
tokens2.forEach(token => {
    console.log(`{ type: ${token.type}, value: ${token.value} }`);
});
// 预期输出：
// { type: 关键字, value: if }
// { type: 标识符, value: a }
// { type: 运算符, value: === }
// { type: 标识符, value: b }

// =====================
// 测试用例 3：包含非法字符
// =====================
const testCase3 = 'let a＝10;'; // 全角=
const tokens3 = lex(testCase3);
console.log('\n测试用例 3 结果：');
tokens3.forEach(token => {
    console.log(`{ type: ${token.type}, value: ${token.value} }`);
});
// 预期：全角=被跳过（或根据需求修改为报错）