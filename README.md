# Interactive 3DGraphics / Pellizzari-Baradel-Project

Primo progetto per il corso di Interactive 3D Graphics, anno accademico 2017/2018

## Descrizione del Progetto

Il progetto consiste in una web-app di un gioco di simulazione di guida. In questa applicazione l'utente potrà controllare un veicolo con lo scopo di raggiungere il traguardo cercando di evitare gli ostacoli, generati casualmente.
I comandi disponibili sono quelli di movimenti laterale (Freccia Sinistra, Freccia Destra), oppure le lettere *A e D* (dai tasti *WASD*).

Durante il gioco esiste una variabile punteggio che corrisponde alla distanza percorsa dall'inizio della partita; anche la velocità della macchina dipende dalla distanza percorsa, in particolare questa aumenta di un certo fattore ogni 250 unità di spazio per rendere il gioco più difficile.

Abbiamo inserito nella scena gli Orbit Controls in modo che l'utente durante la partita possa effettuare lo zoom in/out e spostarsi con il mouse per inquadrare la macchina da un'altra angolazione (rispetto a quella che abbiamo impostato di default all'inizio) in modo da aumentare la giocabilità e poter osservare la scena dai vari punti di vista. Abbiamo dovuto disabilitare la possibilità di usare questi controlli dalla tastiera con il metodo: controls.enableKeys = false; altrimenti ogni volta che si usano le frecce per schivare gli ostacoli queste hanno l'effetto di spostare l'inquadratura, di conseguenza è difficile capire se la macchina si sia veramente spostata oppure se sia semplicemente cambiata l'angolazione della camera.

Volendo si può arrivare alla fine del gioco senza dover schivare gli ostacoli; questo l'abbiamo utilizzato in fase di testing per vedere cosa succedeva nella parte finale senza dover per forza schivare ogni volta tutti gli ostacoli. Per farlo è sufficiente commentare la riga 965 che chiama la procedura controllaCollisioni(), disattivando questa procedura non si arriva mai alla situazione di gameOver quindi il gioco prosegue finché la macchina non supera il traguardo.

## Caratteristiche del Progetto

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

### Fuoco dalla vettura

Il fuoco è stato generato esclusivamente con delle BoxGeometry che variano nel tempo per poi tornare al punto iniziale(variazione di colore, scala e posizione).

### Spostamento laterale della macchina

Per lo spostamento laterale della macchina è stata usata una procedura che sfrutta la percentuale di spostamento per rendere il movimento più fluido, in particolare:
```
pivotMacchina.position.x += spostamentoMacchinaX*(xDestra*1.25 - pivotMacchina.position.x);
```
Dove *xDestra * 1,25* rappresenta un fattore di scala del movimento, mentre *pivotMacchina.position.x* rappresenta l'attuale posizione della macchina, in questo modo il valore dello spostamento varia dinamicamente a seconda della posizione attuale della macchina. (Nella procedura per lo spostamento nell'altro verso, *pivotMacchina.position.x* è sommato e non sottratto);

### Animazione delle decorazioni e degli asteroidi

Si è scelto di creare un paesaggio nella scena in modo da rendere più interessante il tragitto, anche gli ostacoli "esterni" (quindi le decorazioni) sono inseriti casualmente, le decorazioni sono:
* un semplice albero;
* un mulino le cui pale ruotano quando la macchina si avvicina;
* un omino che salta "facendo il tifo" per il giocatore;

Inoltre fra gli ostacoli vi è un asteroide che ha una bassa probabilità di apparire rispetto agli altri ostacoli; esso farà il suo ingresso in scena cadendo dal cielo.
All'inizio e alla fine della pista, un gruppo di omini farà il tifo per il giocatore, ogni omino ha una maglietta di un colore casuale;

## Successivo alla consegna

### PowerUps

Durante la partita è possibile trovare fra gli ostacoli alcuni PowerUp che possono essere utili per ottenere un punteggio maggiore. In particolare i diversi tipi di PowerUp disponibili sono:
* una "stella" (cubo giallo) che incrementa il moltiplicatore di punteggio per una certa distanza
* uno scudo (cubo rosso) che fa diventare la macchina dorata e permette di distruggere il prossimo ostacolo senza perdere la partita (ha una durata limitata)
* un cubo blu che rappresenta il bonus inversione comandi: dopo averlo preso bisogna usare la freccia destra per andare a sinistra e quella sinistra per andare a destra finché è presente il punto di domanda sopra la macchina
* un cannone (da implementare), con un certo numero di colpi, che equipaggiato alla macchina permette di sparare, quindi distruggere, alcuni ostacoli

### Istruzioni

Sono state inserite due pagine HTML che precedono l'inizio della partita:
* la prima dice che per muoversi si possono usare le frecce (destra e sinistra) oppure i tasti direzionali (A e D). Inoltre con il tasto P è possibile mettere in pausa la partita
* la seconda mostra in alto i tre tipi di ostacoli che si possono incontrare e che vanno evitati durante la partita e in basso mostra i tre cubi (giallo, rosso, blu) che corrispondono ai Power Up che possiamo raccogliere durante la partita.
Dalla prima pagina dopo 7 secondi si passa alla seconda e da questa dopo 9 secondi si passa alla partita. Prima che questa cominci si aspettano altri 6 secondi in modo che la scena venga caricata e per mostrare all'utente la pista.

## Screenshots del Progetto

![Screenshot1](/screenshots/Screenshot1.jpg)
![Screenshot2](/screenshots/Screenshot3.jpg)
![Screenshot3](/screenshots/FestinaAllaPartenza.jpg)
![Screenshot4](/screenshots/FestoneAlTraguardo.jpg)


## Fonti

Movimento della macchina: https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html
Applicazione delle texture sui vari oggetti: https://stackoverflow.com/questions/17418118/three-js-cube-with-different-texture-on-each-face
Texture: http://www.wildtextures.com/category/free-textures/

## Useful material and references

Sometimes, some feature of the Javascript language can be tricky: [a growing list of quirks](http://bonsaiden.github.io/JavaScript-Garden/)
