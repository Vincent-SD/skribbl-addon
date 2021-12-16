/**
 * On écoute les clics sur les boutons et on envoie
 * un message approprié au script de contenu dans la page
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {


        function getWordList(url, callback) {
            $.get(url, function(response) {
                callback(response)
            });
        }

        function completeWords(tabs) {
             getWordList("https://docs.google.com/document/d/1rDevemdCMza_7PwnkvzeXN_UskDHmQJln3IRsBUITbQ/export?format=txt",function (wordsList){
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "fill",
                    wordsList: wordsList
                });
            });
        }

        function reportError(error) {
            console.error(`Skribbl impossible : ${error}`);
        }


        if (e.target.classList.contains("complete")) {
            browser.tabs.query({active: true, currentWindow: true})
                .then(completeWords)
                .catch(reportError);
        }
        // else if (e.target.classList.contains("reset")) {
        //     browser.tabs.query({active: true, currentWindow: true})
        //         .then(reset)
        //         .catch(reportError);
        // }
    });
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/skribbl.js"})
    .then(listenForClicks)
    .catch(reportExecuteScriptError);