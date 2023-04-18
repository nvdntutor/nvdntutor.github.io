document.addEventListener("keydown", function (e){
    if (e.key == "Enter"){
        decode()
    }
})

function decode(){
    encoded = document.getElementById("input").value;
    encoded = encoded.toUpperCase();
    key = document.getElementById("key").value;
    key = key.toUpperCase();
    type = document.getElementById("type").value;
    console.log(encoded)
    console.log(type)

    switch(type){
        case "caesar":
            decoded = decodeCaesar(encoded)
            break;
        case "atbash":
            decoded = decodeAtbash(encoded)
            break;
        case "a1z26":
            decoded = decodeA1Z26(encoded)
            break;
        case "vigenere":
            decoded = decodeVigenere(encoded, key)
            break;
        case "binary":
            decoded = decodeBinary(encoded)
            break;
        default:
            decoded = ""
            break;
    }

    document.getElementById("output").value = decoded;
}

function onDecodeTypeSelected(element){
    var decodeType = element.value

    /*
    document.getElementById("symbolContainer").style.display = "none"
    */

    document.getElementById("keyContainer").style.display = "none";
    
    if (decodeType == "vigenere"){
        document.getElementById("keyContainer").style.display = "block";
        return
    }
    
    /*
    if (decodeType == "asymbol"){
        document.getElementById("symbolContainer").style.display = "block";
        return
    }
    */
}

function decodeVigenere(encoded, key){
    var decoded = "";
    
    var k = 0;
    for (var i = 0; i < encoded.length; i++){
       
        // if current character isn't a letter, adds it to decoded string as is
        var charIndex = getCharIndex(encoded[i])
        if(charIndex == null){
            decoded += encoded[i]
            continue
        }
        
        if (k == key.length){
            k = 0
        }

        var keyPosition = getCharIndex(key[k])
        decoded += shiftChar(encoded[i], -keyPosition)
        k++;
    }
    
    
    return decoded;
}

function decodeAtbash(encoded){
    var decoded = "";
    
    for (var i = 0; i < encoded.length; i++){
        var charIndex = getCharIndex(encoded[i])

        // if current character isn't a letter, adds it to decoded string as is
        if(charIndex == null){
            decoded += encoded[i]
            continue
        }

        //  Gets the index of the character at the opposite end of the alphabet
        // Eg: A = Z, B = Y
        var reversedIndex = 25 - charIndex

        // Stores reversed letter
        decoded += getLetterAtPosition(reversedIndex)
    }

    return decoded;
}

function decodeBinary(encoded){
    encoded = encoded.replace(/ /g, "") // Remove spaces
    var binCache = ""
    var decoded = ""
    
    for (var i = 0; i < encoded.length; i++){
        binCache += encoded[i]

        if(binCache.length == 8){
            decoded += String.fromCharCode(parseInt(binCache, 2))
            binCache = ""
        }
    }

    return decoded;
}

function shiftChar(char, shift){
    const caesar = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    var charindex = getCharIndex(char);
    if (charindex == null){
        return char;
    }

    charindex += shift
    if(charindex < 0){
        charindex = 26 + charindex
    }
    
    return caesar[charindex];
}

function decodeCaesar(encoded){
    var decoded = ""

    for (var w = 0; w < encoded.length; w++) {
       decoded += shiftChar(encoded[w], -3);
    }

    return decoded;
}

function is_numeric_char(c) { return /\d/.test(c); }

function decodeA1Z26(encoded){
    const a1z26 = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    var decoded = "";

    var numCache = "";
    for (var i = 0; i < encoded.length; i++){
        // if char IS a number
        if (is_numeric_char(encoded[i]) == true){
            numCache += encoded[i];
            if(i == encoded.length - 1){
                decoded += getLetterFromStringNumber(numCache)
            }
            continue
        }

        if (numCache.length > 0){
            decoded += getLetterFromStringNumber(numCache)
        }
        
        numCache = "";

        if (encoded[i] == "-"){
            continue;
        }
        decoded += encoded[i];
    }

    return decoded;
}

function aSymbolKeypress(key){
    var boxContent = document.getElementById("asymbolbox1").value

    if(key == "DEL"){
        boxContent = boxContent.slice(0,-1)
    }
    else{
        boxContent += key
    }
    
    document.getElementById("asymbolbox1").value = boxContent
    document.getElementById("asymbolbox2").value = boxContent
}

function updateASymbolBox(box){
    box1 = document.getElementById("asymbolbox1")
    box2 = document.getElementById("asymbolbox2")
    
    if(box1.value == box2.value){
        return
    }
    
    if(box == 1){
        box2.value = box1.value
        return
    }
    
    box1.value = box2.value
}

function getLetterFromStringNumber(number){
    var charindex = parseInt(number);
    return getLetterAtPosition(charindex - 1)
}

function getLetterAtPosition(position){
    const alphabet = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    return alphabet[position];
}

function getCharIndex(charIndex){
    const alphabet = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    
    for (var i = 0; i < alphabet.length; i++){
        if (alphabet[i] == charIndex){
            return i;
        }
    }

    return null;
}

function clearCrypBox(){
    document.getElementById("input").value = null
    document.getElementById("output").value = null
}

function clearSymBox(){
    document.getElementById("asymbolbox1").value = null
    document.getElementById("asymbolbox2").value = null
}