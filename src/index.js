const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let code = expr.split('');
    let code_mem = 0;           // хранилище 10 или 11
    let morse_code = '';        // хранилище кода Морзе
    let result = '';            // результат в виде строки

    for(let i = 0; i < code.length; i += 10) {
        for(let j = 0; j < 10; j++) {
            if((i + j) % 10 === 0) {
                if(code[i + j] === '0') {
                    continue;
                } else if(code[i + j] === '1') {
                    code_mem += 1;
                } else {
                    result += ' ';
                    break;
                }
            } else if(code[i + j] === '0' && code[i + j - 1] === '0') {
                continue;
            } else if(code[i + j] === '0' && code[i + j - 1] === '1') {
                code_mem = 10;
                code_mem = mem_decode(code_mem);
            } else {                            // if(code[i + j] === '1')
                if(code_mem === 1) {
                    code_mem = 11;
                    code_mem = mem_decode(code_mem);
                } else {
                    code_mem += 1;
                    code_mem = mem_decode(code_mem);
                }
            }
        }
        if(morse_code !== '') {
            morse_decode(morse_code);
        }
    }

    function mem_decode(num) {     // декодирование 10 или 11, обнуление code_mem если декодировано или возврат code_mem если еще нечего декодировать
        if(num < 10) {
            return num;
        } else if(num === 10) {
            morse_code += '.';
            return 0;
        } else {
            morse_code += '-';
            return 0;
        }
    }

    function morse_decode(code) {
        result += MORSE_TABLE[morse_code];
        morse_code = '';
    }

    return result;
}

module.exports = {
    decode
}