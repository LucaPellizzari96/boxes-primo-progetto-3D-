# Interactive 3DGraphics / Pellizzari-Baradel-Project

Primo progetto per il corso di Interactive 3D Graphics, anno accademico 2017/2018

## Descrizione del Progetto

Il progetto consiste in una web-app di un gioco di simulazione di guida. In questa applicazione l'utente potrà controllare un veicolo con lo scopo di raggiungere il traguardo cercando di evitare gli ostacoli, generati casualmente.
I comandi disponibili sono quelli di movimenti laterale (Freccia Sinistra, Freccia Destra), oppure le lettere *A e D* (dai tasti *WASD*).

Durante il gioco esiste una variabile punteggio che corrisponde alla distanza percorsa dall'inizio della partita; anche la velocità della macchina dipende dalla distanza percorsa, in particolare questa aumenta di un certo fattore ogni 250 unità di spazio per rendere il gioco più difficile.

Abbiamo inserito nella scena gli Orbit Controls in modo che l'utente durante la partita possa effettuare lo zoom in/out e spostarsi con il mouse per inquadrare la macchina da un'altra angolazione (rispetto a quella che abbiamo impostato di default all'inizio) in modo da aumentare la giocabilità e poter osservare la scena dai vari punti di vista. Abbiamo dovuto disabilitare la possibilità di usare questi controlli dalla tastiera con il metodo: controls.enableKeys = false; altrimenti ogni volta che si usano le frecce per schivare gli ostacoli queste hanno l'effetto di spostare l'inquadratura, di conseguenza è difficile capire se la macchina si sia veramente spostata oppure se sia semplicemente cambiata l'angolazione della camera.

Volendo si può arrivare alla fine del gioco senza dover schivare gli ostacoli; questo l'abbiamo utilizzato in fase di testing per vedere cosa succedeva nella parte finale senza dover per forza schivare ogni volta tutti gli ostacoli. Per farlo è sufficiente commentare la riga 965 che chiama la procedura controllaCollisioni(), disattivando questa procedura non si arriva mai alla situazione di gameOver quindi il gioco prosegue finché la macchina non supera il traguardo.

## Risultato del Progetto

### Generazione degli ostacoli e decorazioni

Dopo la costruzione della scena di base, gli ostacoli vengono inseriti casualmente in base alla distanza fra ostacoli seguenti grazie alla funzione
```
function scegliLato(posizione){
	var random = randomConRange(0,1); // Ritorna un numero casuale intero fra 0 e 1;
	if(posizione == "interno"){       // La posizione "esterno" invece indica un "ostacolo" esterno alla strada, ossia una decorazione
	 if(random == 0){
	  return xDestra;                 // Posizione centrale della corsia di destra, centro dell'ostacolo
   } else {
	  return xSinistra;               // Posizione centrale della corsia di sinistra, centro dell'ostacolo
   }
   [...]
```
Le decorazioni invece sono state inserite analogamente agli ostacoli, però la funzione *scegliLato(posizione)* viene chiamata con
```
posizione = "esterno";
scegliLato("esterno");
```
Ogni ostacolo viene aggiunto dalla funzione *aggiungiOstacolo(posizione, x, z)* dove posizone è sempre una stringa "interno" o "esterno", x rappresenta la coordinata x del centro dell'ostacolo mentre z rappresenta la distanza su Z dall'origine.

### Gestione delle collisioni

Durante la creazione degli ostacoli vengono aggiornati due array dichiarati globalmente, *posizioneOstacoli* e *tipoOstacoli*.
*posizioneOstacoli* è un array di interi che serve solamente a determinare se l'ostacolo in posizione *(i+1)*50* da Z è a destra o sinistra inserendo rispettivamente un numero maggiore o minore di zero.

*tipoOstacoli* è un array di stringhe dove viene specificato il tipo di ostacolo alla distanza *(i+1)*50* da Z. Questo serva a determinare al momento del controllo delle collisioni l'area occupata dall'ostacolo;

Grazie a questi due array è possibile controllare le collisioni ad ogni iterazione della ricorsione della funzione Render(), in quanto viene chiamata la funzione *controllaCollisioni()* che ha il compito di verificare che la posizione attuale di tutti i vertici della macchina non coincida o sia compresa in nessun ostacolo sulla pista, in caso contrario la variabile globale *gameOver* viene impostata a *true* e il gioco termina.

### Animazione delle decorazioni e degli asteroidi

Si è scelto di creare un paesaggio nella scena in modo da rendere più interessante il tragitto, anche gli ostacoli "esterni" (quindi le decorazioni) sono inseriti casualmente, le decorazioni sono:
* un semplice albero;
* un mulino le cui pale ruotano quando la macchina si avvicina;
* un omino che salta "facendo il tifo" per il giocatore;

Inoltre fra gli ostacoli vi è un asteroide che ha una bassa probabilità di apparire rispetto agli altri ostacoli; esso farà il suo ingresso in scena cadendo dal cielo.
All'inizio e alla fine della pista, un gruppo di omini farà il tifo per il giocatore, ogni omino ha una maglietta di un colore casuale;

### PowerUps

Durante la partita è possibile trovare fra gli ostacoli alcuni PowerUp che possono essere utili per ottenere un punteggio maggiore. In particolare i diversi tipi di PowerUp disponibili sono:
* una "stella" che incrementa il moltiplicatore di punteggio per una certa distanza
* uno scudo che permette di distruggere il prossimo ostacolo senza perdere la partita
* un cannone, con un certo numero di colpi, che equipaggiato alla macchina permette di sparare, quindi distruggere, alcuni ostacoli

## Screenshots e immagini del Progetto

![Screenshot1](/screenshots/Screenshot1.jpg)
![Screenshot2](/screenshots/Screenshot3.jpg)
![Screenshot3](/screenshots/FestinaAllaPartenza.jpg)
![Screenshot4](/screenshots/FestoneAlTraguardo.jpg)


#### Fonti

Movimento della macchina: https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html
Applicazione delle texture sui vari oggetti: https://stackoverflow.com/questions/17418118/three-js-cube-with-different-texture-on-each-face
Texture: http://www.wildtextures.com/category/free-textures/

## Useful material and references

Sometimes, some feature of the Javascript language can be tricky: [a growing list of quirks](http://bonsaiden.github.io/JavaScript-Garden/)
