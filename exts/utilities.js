(function (util) {
    const TypeInput = util.TypeInput;
    class utilities {
        id = 'utilities';
        blocks = [
            {
                opcode: "isLessOrEqual",
                isOperator: true,
                blockType: util.BlockType.BOOLEAN
            },
            {
                opcode: "isMoreOrEqual",
                isOperator: true,
                blockType: util.BlockType.BOOLEAN
            },
            {
                opcode: "stringToBoolean",
                blockType: util.BlockType.BOOLEAN
            },
            {
                opcode: "ternaryOperator",
                blockType: util.BlockType.REPORTER
            },
        ]
        isLessOrEqual(args) {
            return new TypeInput.Bool('(' + args.A.Num() + '<=' + args.B.Num() + ')');
        }
        isMoreOrEqual(args) {
            return new TypeInput.Bool('(' + args.A.Num() + '>=' + args.B.Num() + ')');
        }
        stringToBoolean(args) {
            util.Tools.setruntime([['fn string_to_boolean <T: AsRef<str>>(input: T) -> bool {',
                'let trimmed_input = input.as_ref().trim();',
                'if trimmed_input.is_empty() || trimmed_input == "0" || trimmed_input.eq_ignore_ascii_case("false") {',
                'false',
                '} else {',
                'true',
                '}',
                '}'].join('\n')]);
            return new TypeInput.Bool(`string_to_boolean(${args.STRING.Stu()})`);
        }
        ternaryOperator(args){
            return new TypeInput.Stri(`if ${util.Cast.SafeBool(args.A)} { ${args.B.Stri()} } else { ${args.C.Stri()} }`)
        }
    }
    util.extensions.register(new utilities());
})(this);