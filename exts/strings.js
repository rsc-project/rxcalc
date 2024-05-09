(function (util) {
    const TypeInput = util.TypeInput;
    class strings {
        id = "strings";
        blocks = [
            {
                opcode: "letters_of",
                blockType: util.BlockType.REPORTER
            },
            {
                opcode: "split",
                blockType: util.BlockType.REPORTER
            },
            {
                opcode: "count",
                blockType: util.BlockType.REPORTER
            },
            {
                opcode: "indexof",
                blockType: util.BlockType.REPORTER
            },
            {
                opcode: "replace",
                blockType: util.BlockType.REPORTER
            },
            {
                opcode: "repeat",
                blockType: util.BlockType.REPORTER
            },
            {
                opcode: "unicodeof",
                blockType: util.BlockType.REPORTER
            },
            {
                opcode: "unicodefrom",
                blockType: util.BlockType.REPORTER
            },
            {
                opcode: "identical",
                isOperator: true,
                blockType: util.BlockType.BOOLEAN
            }
        ]
        letters_of(args) {
            util.Tools.setruntime([`fn get_char_at<T: AsRef<str>>(s: T, index: f64) -> String {\ns.as_ref().chars().nth((index - 1.0) as usize).map(|c| c.to_string()).unwrap_or_default()\n}`]);
            return new TypeInput.Stri(`if ${args.LETTER1.Usize()} != ${args.LETTER2.Usize()} {if let Some(substring) = ${args.STRING.Stu()}.get((${args.LETTER1.i32()} - 1) as usize..=(${args.LETTER2.i32()} - 1) as usize) {substring.to_string()} else{String::new()}} else {get_char_at(${args.STRING.Stu()},${args.LETTER1.Num()})}`);
        }
        split(args) {
            util.Tools.setruntime([[
                'fn split <T: AsRef<str>>(input_string: T,separator: T,index: usize) -> String{',
                'if index == 0 {',
                'return String::new()',
                '}',
                'let parts: Vec<&str> = input_string.as_ref().split(separator.as_ref()).collect();',
                'if let Some(second_part) = parts.get(index - 1) {',
                'second_part.to_string()',
                '} else {',
                'String::new()',
                '}',
                '}'
            ].join('\n')]);
            return new TypeInput.Stri(`split(${args.STRING.Stu()},${args.SPLIT.Stu()},${args.ITEM.Usize()})`);
        }
        count(args) {
            return new TypeInput.Num(`(${args.STRING.Stu()}.matches(${args.SUBSTRING.Stu()}).count() as f64)`);
        }
        indexof(args) {
            return new TypeInput.Usize(`match ${args.STRING.Stu()}.find(${args.SUBSTRING.Stu()}) {Some(index) => {index},None => {0}}`);
        }
        replace(args) {
            return new TypeInput.Stri(`${args.STRING.Stu()}.replace(${args.SUBSTRING.Stu()}, ${args.REPLACE.Stu()})`);
        }
        repeat(args) {
            util.Tools.setruntime([['fn repeat <T: AsRef<str>>(s: T, times: usize) -> String {',
                'let mut result = String::new();',
                'for _ in 0..times {',
                'result.push_str(s.as_ref());',
                '}',
                'result',
                '}'].join('\n')]);
            return new TypeInput.Stri(`repeat(${args.STRING.Stu()},${args.REPEAT.Usize()})`);
        }
        unicodeof(args) {
            util.Tools.setruntime([['fn unicodeof <T: AsRef<str>>(input: T) -> String {',
                'let unicode_values: Vec<String> = input.as_ref().chars()',
                '.map(|c| c as u32)',
                '.map(|unicode| unicode.to_string())',
                '.collect();',
                'unicode_values.join(" ")',
                '}'].join('\n')]);
            return new TypeInput.Stri(`unicodeof(${args.STRING.Stu()})`);
        }
        unicodefrom(args) {
            util.Tools.setruntime([['fn unicodefrom(input: f64) -> String {',
                'if let Some(unicode) = std::char::from_u32(input as u32) {',
                'unicode.to_string()',
                '} else {',
                'String::new()',
                '}',
                '}',].join('\n')]);
            return new TypeInput.Stri(`unicodefrom(${args.NUM.Num()})`);
        }
        identical(args) {
            return new TypeInput.Bool('(' + args.OPERAND1.Stri() + '==' + args.OPERAND2.Stri() + ')');
        }
    }
    util.extensions.register(new strings());
})(this);