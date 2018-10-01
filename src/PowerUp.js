// AGGIUNGO I POWER UP ALLA SCENA (come cubi/oggetti presenti sulla strada da raccogliere per ottenere i potenziamenti)
function aggiungiPowerUp(){
  // dichiaro e inizializzo i tre vettori
  powerUpAttivi = new Array();
  powerUpInScena = new Array();
  powerUpInScenaTipo = new Array();
  powerUpAttivi.push(0); // per indicare la z dove terminera'
  powerUpAttivi.push(0); // per indicare i colpi di cannone restanti
  powerUpAttivi.push(0); // per indicare la z dove terminera'
  powerUpAttivi.push(0); // per indicare la presenza o meno dell'inversione dei comandi
  // aggiungo i power up alla macchina (ma finche non vengono "presi" non sono visibili)
  aggiungiCannoneMacchina(); // TODO da implementare
  //aggiungiScudoMacchina(); // non c'e' + la rappresentazione dello scudo come oggetto sulla macchina
  aggiungiIndicatoreMacchina();
  // inserisco i power up "a caso" sulla strada
  var distanzaPowerUp = 10000 / (numeroPowerUp+1);
  for(var i = 0; i < numeroPowerUp - 1; i++){ // -2 perche' 48+1*200+25 = 9825, non ce ne starebbero altri;
    var prossimoPowerUp = scegliPowerUp();
    switch (prossimoPowerUp){
      case 0:
        aggiungiStella((i+1)*distanzaPowerUp + 25); // Aggiungo il powerUp a 200*i + 25 per evitare gli ostacoli
        break;
      case 1:
        aggiungiCannone((i+1)*distanzaPowerUp + 25);
        break;
      case 2:
       aggiungiScudo((i+1)*distanzaPowerUp + 25);
       break;
	  case 3:
	   aggiungiInversioneComandi((i+1)*distanzaPowerUp + 25);
	   break;
    }
  }
}

function scegliPowerUp(){
	var x = randomConRange(0,100);
	if(x < 33){
		return 0;  // stella
	}
	// TODO aggiungere return 1 per il cannone (dopo che sara implementato)
	else if(x < 67){
		return 2; // scudo
	}else{
		return 3; // inversione comandi
	}
}

// Aggiunge la stella (moltiplicatore) alla scena e agli array
function aggiungiStella(z){
  var x = scegliLato();
  var geometriaStella = new THREE.BoxGeometry(2,2,2);
  var materialeStella = new THREE.MeshPhongMaterial({color:"yellow"});
  var stellaMesh = new THREE.Mesh(geometriaStella, materialeStella);

  stellaMesh.position.set(x/7.2, 1, -z);
  scene.add(stellaMesh);
  powerUpInScena.push(stellaMesh);
  powerUpInScenaTipo.push("stella");
}

// Aggiunge il cannone alla scena e agli array
function aggiungiCannone(z){
  var x = scegliLato();
  var geometriaCannone = new THREE.BoxGeometry(2,2,2); //TEMP per testare;
  var materialeCannone = new THREE.MeshPhongMaterial({color: 0x555555});
  var cannoneMesh = new THREE.Mesh(geometriaCannone, materialeCannone);

  cannoneMesh.position.set(x/7.2, 1, -z);

  scene.add(cannoneMesh);
  powerUpInScena.push(cannoneMesh);
  powerUpInScenaTipo.push("cannone");
}

// Aggiunge lo scudo alla scena e agli array
function aggiungiScudo(z){
  var x = scegliLato();
  var geometriaScudo = new THREE.BoxGeometry(2,2,2); //TEMP per testare;
  var materialeScudo = new THREE.MeshPhongMaterial({color: 0xff0000}); // TEMP di colore rosso per test;
  var scudoMesh = new THREE.Mesh(geometriaScudo, materialeScudo);

  scudoMesh.position.set(x/7.2, 1, -z);

  scene.add(scudoMesh);
  powerUpInScena.push(scudoMesh);
  powerUpInScenaTipo.push("scudo");
}
// Aggiunge il bonus inversione comandi alla scena
function aggiungiInversioneComandi(z){
  var x = scegliLato();
  var geometriaInversione = new THREE.BoxGeometry(2,2,2); //TEMP per testare;
  var materialeInversione = new THREE.MeshPhongMaterial({color: "blue"});
  var inversioneMesh = new THREE.Mesh(geometriaInversione, materialeInversione);

  inversioneMesh.position.set(x/7.2, 1, -z);

  scene.add(inversioneMesh);
  powerUpInScena.push(inversioneMesh);
  powerUpInScenaTipo.push("inversione");
}

// Aggiungo i bonus alla macchina quando li "prende" colpendoli
function aggiungiBonus(tipoProssimoBonus){
  audioPowerUp.play();
  switch( tipoProssimoBonus ){
    case "stella":
      powerUpAttivi[0] = -pivotMacchina.position.z + 150;  // posizione in cui finira l'effetto del bonus
	  document.getElementById("punteggio").style.color = "yellow";
      break;
    case "cannone":
      powerUpAttivi[1] = 3;  // 3 colpi disponibili
      cannoneBonus.visible = true;
      break;
    case "scudo":
      powerUpAttivi[2] = -pivotMacchina.position.z + 300;  // posizione in cui finira l'effetto del bonus
      //scudoBonus.visible = true;
	  cambiaColoreMacchina();
      break;
    case "inversione":
      powerUpAttivi[3] = -pivotMacchina.position.z + 300;  // posizione in cui finira l'effetto del bonus
	  indicatore.visible = true;
	  comandiInvertiti = true;
      break;
  }
}
// AGGIUNGO I POWER UP ALLA MACCHINA (la stella non serve aggiungerla, il colore del punteggio diventa giallo per indicare che e' attivo il moltiplicatore)
function aggiungiCannoneMacchina(){ 
  var geometriaCannone = new THREE.BoxGeometry(0.5, 0.5, 0.5); // TEMP per testare;
  var materialeCannone = new THREE.MeshBasicMaterial({color: 0x333333});
  cannoneBonus = new THREE.Mesh(geometriaCannone, materialeCannone);
  cannoneBonus.position.set(0, 2, 0);
  cannoneBonus.visible = false;

  pivotMacchina.add(cannoneBonus);
}

/*
function aggiungiScudoMacchina(){
  var geometriaScudo = new THREE.BoxGeometry(1, 1, 0.1); // TEMP per testare;
  var materialeScudo = new THREE.MeshPhongMaterial({color: 0x555555});
  scudoBonus = new THREE.Mesh(geometriaScudo, materialeScudo);
  scudoBonus.position.set(0, 0.5, -2.5);
  scudoBonus.visible = false;

  pivotMacchina.add(scudoBonus);
}
*/

function aggiungiIndicatoreMacchina(){
	var fontLoader = new THREE.FontLoader();
		fontLoader.load('../font/helvetiker_bold.typeface.json', function(font) {
			var geometriaIndicatore = new THREE.TextGeometry("?", {
				font: font,
				size: 1,
				height: 0.125,
				curveSegments: 4
			});

			geometriaIndicatore.computeBoundingBox();
			var materialeIndicatore = new THREE.MeshPhongMaterial({color: "blue"});
			indicatore = new THREE.Mesh(geometriaIndicatore, materialeIndicatore );
			//indicatore.castShadow = true;
			//indicatore.receiveShadow = true;
			indicatore.position.set(-0.4, 2, 0);
			indicatore.visible = false;
			pivotMacchina.add(indicatore);
		});
}
// CONTROLLO SE I BONUS SONO ANCORA VALIDI ALTRIMENTI LI RIMUOVO DALLA MACCHINA
function aggiornaBonus(){
  // Controllo per il bonus stella (moltiplicatore)
  if((powerUpAttivi[0] <= -pivotMacchina.position.z || gameOver == true) && document.getElementById("punteggio").style.color == "yellow"){ // (l'effetto del bonus è finito OPPURE game over) E bonus ancora attivo
	document.getElementById("punteggio").style.color = "black";  // riporto il punteggio al suo colore originale
  }else if(powerUpAttivi[0] > -pivotMacchina.position.z){  // se e' ancora attiva applico l'effetto del suo bonus
    punteggioBonus += Math.round(3 * spostamentoMacchinaZ);
  }
  // Controllo per il bonus cannone (TODO da implementare)
  if(powerUpAttivi[1] == 0 || gameOver == true){ // finito i colpi o game over
    cannoneBonus.visible = false;
  }
  // Controllo per il bonus scudo
  if(powerUpAttivi[2] <= -pivotMacchina.position.z || gameOver == true){ // effetto scaduto o game over
    //scudoBonus.visible = false;
	ripristinaColoreMacchina();
  }
  // Controllo per il bonus inversioneComandi
  if((powerUpAttivi[3] <= -pivotMacchina.position.z || gameOver == true) && comandiInvertiti == true){
	  comandiInvertiti = false;
	  indicatore.visible = false;
  }
}

// Quando prendo lo scudo (cubo rosso) la macchina diventa dorata con questa funzione
function cambiaColoreMacchina(){
  pivotMacchina.getObjectByName("Corpo macchina").material.color = new THREE.Color(0xffd700);
  pivotMacchina.getObjectByName("Tetto macchina").material.color = new THREE.Color(0xffd700);
  for(var k = 0; k < 4; k++){
	var name = "Ruota " + k;
	pivotMacchina.getObjectByName(name).material.color = new THREE.Color(0xffd700);
  }
}

// Quando perdo lo scudo il colore della macchina ritorna quello di partenza
function ripristinaColoreMacchina(){
  pivotMacchina.getObjectByName("Corpo macchina").material.color = coloreMacchina;
  pivotMacchina.getObjectByName("Tetto macchina").material.color = coloreMacchina;
  for(var k = 0; k < 4; k++){
	var name = "Ruota " + k;
	pivotMacchina.getObjectByName(name).material.color = new THREE.Color("black");
  }
}
