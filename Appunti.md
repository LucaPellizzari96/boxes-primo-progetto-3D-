# Appunti per la prosecuzione del progetto

## Da fare

Luca B:

* Creare la struttura corretta per il cannone
* Sistemare bordo superiore (html) che può coprire parti della scena
* Inserire e animare piccione come "ostacolo" esterno

Luca P:

* Scudo attivo, macchina diventa trasparente (o dorata)
* Possibilità di mettere in pausa la partita, tasto P
* Aggiungere come ostacolo la pozzanghera che fa slittare la macchina fuori dalla scena (nuovo ostacolo, poco frequente)
* Aggiungere pioggia dove ci sono le pozzanghere (sistema di particelle, come il fuoco dietro la macchina)
* Partenza più "lenta": ad esempio tre pagine HTML: la prima dice "usa le frecce per muoverti" e mostra due frecce, la seconda elenca i power up e li mostra e la terza è il gioco. 
Nella cartella test_temporanei abbiamo il file index.html che potrebbe essere la prima delle pagine descritte, da lì si passa a Istruzioni.html e poi a Gioco.html (rinominare l'attuale index.html in Gioco.html)
* Vedere se ci sono altre cose da sistemare nei warnings

Da decidere:

* Ambient light (?)
* Shader per power up (e per applicare le texture) (?)
* Cube map come background esterno (?)
* Implementare le funzioni per la collisione con un bonus e l'aggiunta degli effetti, in particolare:

  * Comandi del cannone con barra spaziatrice e animazione dell'esplosione di un ostacolo;
