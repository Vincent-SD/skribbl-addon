 (function() {
     /**
      * On vérifie et on initialise une variable globale
      * permettant de s'assurer que le script ne fera rien
      * s'il est injecté plusieurs fois sur la page.
      */
     if (window.hasRun) {
         return;
     }
     window.hasRun = true;


     function test(words){
         document.getElementById("lobbySetCustomWords").value = words;
         document.getElementById("lobbyCustomWordsExclusive").setAttribute("checked","checked")
         document.getElementById("lobbyCustomWordsExclusive").checked = true;
         document.getElementById("lobbySetRounds").value = 5;
     }

     /**
      * On écoute les messages du script d'arrière-plan pour
      * déclencher "insertBeast()" ou "removeExistingBeasts()".
      */
     browser.runtime.onMessage.addListener((message) => {
         document.getElementById("buttonLoginCreatePrivate").click();
         document.getElementById("lobbyCustomWordsExclusive").click();
         if (message.command === "fill") {
             test(message.wordsList);
         }
     });
 })();
