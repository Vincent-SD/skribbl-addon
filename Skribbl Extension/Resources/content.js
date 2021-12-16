var inputChat = document.getElementById("inputChat");
document.onkeydown = checkKey;

var historyWords = ['ana de armas'];
var currentWord = 1;

function checkKey(e) {

    e.stopPropagation()
    e = e || window.event;
    //enter
    if (e.keyCode === 13) {
        //if the word is not empty
        if(inputChat.value !== "") {
            //add to history
            historyWords.push(inputChat.value);
            //reset currentWord
            currentWord = historyWords.length;
        }
    }
    //up
    else if (e.keyCode === 38) {
        if(currentWord > 0) {
            //get the word before the currentWord
            currentWord = currentWord - 1;
            inputChat.value = historyWords[currentWord];
            focusCursor()
        }
    }
    //down
    else if (e.keyCode === 40) {
        if(currentWord <= historyWords.length - 2) {
            //get the word after the currentWord
            currentWord = currentWord + 1;
            inputChat.value = historyWords[currentWord];
            focusCursor()
        }
        else if(currentWord === historyWords.length - 1) {
            inputChat.value = '';
            //reset currentWord
            currentWord = historyWords.length;
        }
    }
}

function focusCursor(){
    setTimeout(function (){
        const input = document.getElementById("inputChat");
        const len = input.value.length;
        input.focus();
        input.setSelectionRange(len, len);
    },10)
}
