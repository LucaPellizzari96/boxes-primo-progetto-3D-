# Progetto Interactive 3D Graphics: Pellizzari Luca & Baradel Luca

Anno accademico 2017/2018, primo progetto del corso.

## Idea Generale

L'idea di base del progetto è creare un mini-gioco basato esclusivamente su cubi.
L'obiettivo è portare la macchina fino in fondo al tragitto.
Lungo il tragitto verranno generati ostacoli casualmente che intralceranno il cammino,
la macchina per raggiungere la fine del percorso dovrà evitarli tramite degli spostamenti. Per semplicità, gli unici spostamenti
consentiti saranno destra e sinistra, utilizzabili con i tasti direzionali o con la classica combinazione *WASD*;

## Risoluzione del progetto

Per la risoluzione del progetto si è adottato il metodo Divide et Impera, dividendo il problema in sottoproblemi meno complessi e
il lavoro è stato diviso fra i due studenti.
Al momento i sottoproblemi individuati sono i seguenti:

* Generazione della pista con ostacoli casuali;
* Movimento della macchina tramite input dei tasti direzionali;
* Collisione fra macchina e ostacoli;
* Gestione di inizio della simulazione, fine e schermata *hai perso*;

## Risoluzione del sistema di collisioni

L'idea centrale per la gestione di collisioni è creare un array al momento della disposizione degli ostacoli nella scena. Gli indici dell'array rappresentano la numerazione dell'ostacolo, ad esempio *ostacoli[0]* rappresenta l'ostacolo a distanza 50, mentre *ostacoli[1]* rappresenta l'ostacolo a distanza 100. L'array è numerico, con una convenzione sui possibili valori, *ostacoli[i]* assume il valore della posizione su *X* (quindi +3 o -3); per capire di quale ostacolo si tratta basta semplicemente moltiplicare il valore di ostacoli[i] per lo spazio occupato dall'ostacolo su *Z*, in modo che, quando successivamente verrà diviso per 3, si otterrà la distanza su *Z* dove la macchina non deve trovarsi.
Una **collisione** è il momento in cui la parte anteriore del veicolo "colpisce" un ostacolo, quindi quando le coordinate Z della parte frontale della macchina coincidono con quelle di Z dell'ostacolo (che coincidono con *50*indice*);

## Problematiche riscontrate

In varie fasi (movimento della macchina, gestione delle collisioni) la problematica principale riscontrata è che durante il controllo della posizione della macchina utilizzare *==* sembra non dare nessun responso, ad esempio:

```
if(pivotMacchina.position.z == 50*(i+1) && pivotMacchina.position.x == ostacoli[i]){
  [...]
```  
Questo esempio è la parte di codice di controllo delle collisioni. Ogni ostacolo è posizionato 50 unità meno dell'altro, e in ostacoli[i] è memorizzata la posizione x dell'ostacolo.

**Soluzione del problema**
La soluzione consiste nell'utilizzare intervalli anziché numeri fissi, presi a seconda dell'ostacolo, in modo da capirne la tipologia e quindi la zona di influenza in termini di profondità sull'asse *Z*, assumendo come centro di corsia sull'asse delle *X* *3* per la posizione centrale della corsia di destra e *-3* per la corsia centrale della corsia di sinistra. Ad esempio un tronco occupa uno spazio su *Z* di 1 unità (Lo spazio fra *Z = -10*, *Z = -11*), un asteroide invece uno spazio di 4 unità (Lo spazio fra *Z = -20*, *Z = -24*);

```
if(pivotMacchina.position.z >= 50*(i+1) && pivotMacchina.position.z <= 50*(i+1)+ ostacoli[i]/3 && uguaglianzaSegno(pivotMacchina.position.x, ostacoli[i])){
  [...]
```
Succesivamente si è optato per rendere ancora più semplice la procedura aggiungendo un array.
Abbiamo quindi ottenuto due array, uno *posizioneOstacoli* che rappresenta la posizione sull'asse delle *X* degli ostacoli, quindi se posizionati a destra o sinistra, e l'altro *tipoOstacoli*, un array di stringhe che viene utilizzato per il controllo della profondità in modo che sia considerata "collisione" tutta l'area dell'ostacolo e non solo la parte centrale;
Il controllo attuale della collisone è:
```
if(offsetMacchina <= 50*(i+1) + distanzaZ && offsetMacchina >= (50*(i+1) - distanzaZ) && pivotMacchina.position.x == posizioneOstacoli[i])
```
Dove *offsetMacchina* serve a considerare come elemento di collisione la parte frontale della macchina, e *distanzaZ* è  la distanza fra il centro dell'ostacaolo e un lato (quindi sia positivo, ossia verso la macchina, sia negativo ossia verso il tragurdo);

Siccome nemmeno questo metodo ha dato buoni risultati, si è scelto di riorganizzare il tutto dall'inizio;
Sono state create due procedure, *collisioneAsseX* e *collisioneAsseZ*, che verificano rispettivamente la collisione in uno dei due casi, questa procedura è effettuata due volte, una per la parte frontale della macchina e una per il retro.

### Fuoco dalla vettura

Aggiunta l'animazione del fuoco in un file a sé stante a scopo di test, a breve verrà implementata nel file del progetto principale.
Il fuoco è stato generato esclusivamente con delle BoxGeometry che variano nel tempo per poi tornare al punto iniziale. (Variazione di colore, scala e posizione);

### Spostamento laterale della macchina

Per lo spostamento laterale della macchina è stata usata una specie di procedura che sfruttasse la percentuale di spostamento per rendere il movimento più fluido, in particolare:
```
pivotMacchina.position.x += spostamentoMacchinaX*(xDestra*1.25 - pivotMacchina.position.x);
```
Dove *xDestra * 1,25* rappresenta un fattore di scala del movimento, mentre *pivotMacchina.position.x* rappresenta l'attuale posizione della macchina, in questo modo il valore dello spostamento varia dinamicamente a seconda della posizione attuale della macchina. (Nella procedura per lo spostamento nell'altro verso, *pivotMacchina.position.x* è sommato e non sottratto);

### Aggiunta texture

* Aggiunte texture erba e asfalto;
* Modificate alcune misure e data trasparenza alle particelle del fuoco;

### Aggiunti nuovi elementi al progetto

* Aggiunto un mulino con le pale che si muovono, verrà messo come ostacolo "esterno" quindi come decorazione della scena;
* Aggiunto un omino che salta e muove le braccia, per il salto è stato usato il principio di fisica aggiungendo velocità e gravità;
* Modificato il cielo e aggiunti i fari alla macchina e inserito il tasto di "Nuova Partita" in caso di vittoria o game over;
* Aggiunti i testi di vittoria e sconfitta

### Ultime modifiche al progetto e sistemazione del readme.md

# Successivo alla consegna

### 10/4/2018

* Aggiunti omini inizio gara e al traguardo;
* Aggiunti due screenshots;
* Modificati gli omini in modo che la maglietta abbia un colore casuale

### 11/04/2018

* Aggiunte 3 mesh cubiche temporanee per 3 tipologie di power up, un moltiplicatore punti, un cannone per abbattere gli ostacoli e uno scudo (rappresentati rispettivamente con un cubo giallo, uno grigio e uno rosso);
* Aggiunte le animazioni idle delle 3 tipologie di power up mentre sono sulla pista

### 21/04/2018

Aggiunti alcuni effetti sonori:

* una musica di sottofondo;
* un suono quando viene preso un PowerUp;
* un suono che indica il gameover a fine partita;
* un applauso a fine partita in caso di vittoria.

### 25/04/2018

Risolto un bug che generava un errore (superata la dimensione massima dell'array) dopo aver superato l'ultimo powerUp presente sulla scena e aggiunte diverse dimensioni per gli alberi

### 06/05/2018

Nuova idea sulla struttura:

* il file index.html è una pagina in cui è contenuta la descrizione dei comandi di gioco, ad esempio: per muoverti usa le frecce o i tasti A, D. Dopo 6 secondi da questo file parte un collegamento che visualizza il contenuto del file istruzioni.html;
* il file istruzioni.html mostra tramite una rappresentazione grafica i vari tipi di powerUp o ostacoli che si possono incontrare durante il gioco (da decidere), dopo 6 secondi viene caricato il file Gioco.html che permette di iniziare una partita.

Questi due file per ora hanno solo il collegamento al file successivo nella sequenza, le rappresentazioni testuali/grafiche devono ancora essere implementate.

### 26/07/2018

Alcuni fix generali e update appunti

### 21/09/2018

* Implementato bonus inversione comandi
* Aggiornata versione three.js
* Inserita SpotLight invece della PointLight, fps aumentati da 40 a 58-60
* Texture potenze di due quindi niente più warnings

### 23/09/2018

* Rimosso shader per il bonus moltiplicatore (è un progetto con i cubi, era una sfera)
* Inserita la possibilità di mettere in pausa la partita con il tasto P
* Refactoring del codice per animare la scena (index.html)
* 7 secondi di pausa prima che inizi la partita, in modo da poter vedere la scena e non iniziare subito

### Sito delle Texture

http://www.wildtextures.com/category/free-textures/

### Fonti

Movimento della macchina: https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html
Applicazione delle texture sui vari oggetti: https://stackoverflow.com/questions/17418118/three-js-cube-with-different-texture-on-each-face
