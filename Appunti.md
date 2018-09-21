# Appunti per la prosecuzione del progetto

## Da fare

Luca B:

* Creare la struttura corretta per il cannone e lo scudo
* Sistemare bordo superiore (html) che può coprire parti della scena
* Inserire e animare piccione come "ostacolo" esterno

Luca P:

* Partenza più "lenta": ad esempio tre pagine HTMl: la prima dice "usa le frecce per muoverti" e mostra due frecce, la seconda elenca i power up e li mostra e la terza è il gioco. 
Nella cartella test_temporanei abbiamo il file index.html che potrebbe essere la prima delle pagine descritte, da lì si passa a Istruzioni.html e poi a Gioco.html (rinominare l'attuale index.html in Gioco.html)
* Shader per power up (e per applicare le texture)
* Aggiungere un bonus "misterioso" o casuale (anche con effetto negativo? es: visuale oscurata/nebbia fitta, inversione comandi)
* Vedere se ci sono altre cose da sistemare nei warnings

Da decidere:

* Provare a mettere gli shader in un file separato(non nell'index)
* Ambient light
* Cube map come background esterno (?)
* Implementare le funzioni per la collisione con un bonus e l'aggiunta degli effetti, in particolare:

  * Comandi del cannone con barra spaziatrice e animazione dell'esplosione di un ostacolo;
  
* Aggiungere come ostacolo la pozzanghera che fa slittare la macchina fuori dalla scena
