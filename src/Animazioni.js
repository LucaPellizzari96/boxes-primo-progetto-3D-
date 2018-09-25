		// FUOCO
		function aggiornaFuoco(arrFuoco){
			for(var i = 0; i < arrFuoco.length; i++){
				if(arrFuoco[i].position.y < 3 && !gameOver){
					arrFuoco[i].position.y += 0.06; //Sposta il cubo su y rispetto a asseFuoco;
					arrFuoco[i].position.x *= 0.97; //Fa convergere il flusso vero il centro di asseFuoco;
					arrFuoco[i].scale.x = arrFuoco[i].scale.x*0.95; //Scala il cubo su x, y e z dello stesso fattore;
					arrFuoco[i].scale.y = arrFuoco[i].scale.y*0.95;
					arrFuoco[i].scale.z = arrFuoco[i].scale.z*0.95;
					arrFuoco[i].material.color.g += 0.06; //Varia il colore in modo che passi da rosso a giallo;
					arrFuoco[i].material.opacity -= 0.03;
				}else{
					if(!gameOver && pivotMacchina.position.z > -10000){
						arrFuoco[i].position.x = Math.random() - 0.5; //Scelgo una nuova posizione su X casuale per il cubo;
						// Queste procedure resettano i cubetti allo stato iniziale;
						arrFuoco[i].position.y = 0;
						arrFuoco[i].scale.x = 1;
						arrFuoco[i].scale.y = 1;
						arrFuoco[i].scale.z = 1;
						arrFuoco[i].material.color.g = 0;
						arrFuoco[i].material.opacity = 1;
					}else{ // Nel caso di gameOver rimuovo le particelle del fuoco;
						pivotMacchina.remove(asseFuoco);
					}
				}
			}
		}
		
		// ASTEROIDI
		function controllaAsteroide(){
			if(numAsteroide < contatoreAsteroide){
				var distanzaZ = Math.abs(asteroidi[numAsteroide].position.z - pivotMacchina.position.z);
				var distanzaApparizione = 150 + Math.abs(pivotMacchina.position.z/50);
				if(distanzaZ < distanzaApparizione){  // se l'asteroide e' + distante di distanzaApparizione non faccio niente
					scene.add(asteroidi[numAsteroide]);
					animaAsteroide(distanzaZ);
				}
			}
		}

		function animaAsteroide(distanzaZ){
			var posizioneMinima = yFineRuote + 2;
			var distanzaY = asteroidi[numAsteroide].position.y - posizioneMinima;  // distanza che l'asteroide deve percorrere su y
			if(velocitaDiscesa == 0){
				calcolaVelocitaDiscesa(distanzaZ, distanzaY);
			}
			asteroidi[numAsteroide].position.y -= velocitaDiscesa;
			if(asteroidi[numAsteroide].position.y <= posizioneMinima){  // se scende troppo
				asteroidi[numAsteroide].position.y  = posizioneMinima;
				numAsteroide++;
				velocitaDiscesa = 0;
			}
		}

		function calcolaVelocitaDiscesa(distanzaZ, distanzaY){
			var numeroFrameDistanzaZ = 	distanzaZ/spostamentoMacchinaZ;  // in quanti frame la macchina percorre distanzaZ
			var numeroFrameDistanzaY = numeroFrameDistanzaZ * distanzaY/distanzaZ;
			velocitaDiscesa = 6*distanzaY/numeroFrameDistanzaY;
		}

		// MULINI
		function controllaMulino(){
			if(numMulini < contatoreMulini){  // se ci sono ancora mulini in scena
				var distanzaMacchMul = Math.abs(posizioneZMulini[numMulini] - pivotMacchina.position.z);
				var distanzaInizioAnimazione = 250 + Math.abs(pivotMacchina.position.z/50);
				var distanzaFineAnimazione = Math.abs(pivotMacchina.position.z/75) - 5;
				if(distanzaFineAnimazione < distanzaMacchMul && distanzaMacchMul < distanzaInizioAnimazione){  // se sono abbastanza vicino ad un mulino inizio l'animazione
					animaMulino();
				}else if(distanzaFineAnimazione > distanzaMacchMul){  // se sono troppo vicino fermo l'animazione e passo al mulino successivo
					numMulini++;
				}
				// se sono troppo lontano dal mulino non faccio niente finche non mi avvicino abbastanza per poter vedere l'animazione
			}
		}

		function animaMulino(){
			mulini[numMulini].rotateX(0.05);
		}
		
		// OMINI
		function aggiornaOmini(){
			for(var i = 0; i <arrayOmini.length; i++){
				if(-pivotMacchina.position.z + 50 > -arrayOmini[i].position.z){ //&& -pivotMacchina.position.z - 50 < -arrayOmini[i].position.z)
					//Salto
					if(arrayOmini[i].position.y <= -0.8){
						arrayVelOmini[i] = randomConRange(10, 25) /100;
					}
					arrayOmini[i].position.y += arrayVelOmini[i];
					arrayVelOmini[i] -= gravita;
				 }
				  arrayOmini[i].lookAt(pivotMacchina.position);
		     }
		}
		
		// UCCELLO
		function animaUccello(){
			if(oggettoUccello.centro.position.z > pivotMacchina.position.z + 100){ // se ho superato il precedente uccello di un po (100 su z)
				oggettoUccello.aggiungi(0, pivotMacchina.position.z - 100); // ne aggiungo un altro + avanti
			}
			oggettoUccello.animazioneVolo();
			oggettoUccello.animazioneAli();
		}

		// POWERUP: aggiorna il movimento dei power up non ancora "presi" presenti sulla scena
		function aggiornaMeshPowerUp(){
			for(var i = 0; i < powerUpInScena.length; i++){
				powerUpInScena[i].position.y = Math.sin(angoloOscillazioneVerticale) + 0.7; // Oscillazione verticale del powerUp;
				angoloOscillazioneVerticale = angoloOscillazioneVerticale%(Math.PI*2) + 0.002;
				powerUpInScena[i].rotateY(0.05);
			}
		}
		
		// CAMERA A FINE PARTITA
		function rotateCamera(){
			if(rotazioneAttuale < rad(360)){ // Se la camera non ha compiuto un giro intorno alla macchina
				rotazioneAttuale += 0.01;
				pivotCamera.rotateY(0.01);
			}
		}
		
		// PUNTEGGIO
		function stampaPunteggio(){
			punteggio = Math.abs(Math.floor(pivotMacchina.position.z));
			punteggioTotale = punteggio + punteggioBonus;
			var node = document.getElementById("punteggio");
			node.innerHTML = "Punteggio:" + "<br/>" + punteggioTotale;
		}

		function nuovaPartita() {
			location.reload();
		}

		function controllaBottone(){
			if(!bottoneInserito){
				stampaTestoFinale();
				document.getElementById("contenitoreBottone").style.display = "inline";  // inserisco il bottone nel documento
				document.getElementById("contenitoreBottone").style="text-align:center;";  // lo posiziono al centro
				bottoneInserito = true;
			}
		}

		function stampaTestoFinale(){
			if(gameOver){
				var materialeTesto = new THREE.MeshPhongMaterial( {color: "red"} );
				stampaTesto("Hai perso!", materialeTesto, pivotMacchina.position.z -2);
			}else{
				var materialeTesto = new THREE.MeshPhongMaterial( {color: "red"} );
				stampaTesto("Hai vinto!", materialeTesto, -9990);
			}
		}

		function stampaTesto(testo, materialeTesto, z){
			var fontLoader = new THREE.FontLoader();

			fontLoader.load('../font/helvetiker_bold.typeface.json', function(font) {
				var geometriaTesto = new THREE.TextGeometry(testo, {
					font: font,
					size: 3,
					height: 0.5,
					curveSegments: 10
				});

				geometriaTesto.computeBoundingBox();
				var testoFinale = new THREE.Mesh(geometriaTesto, materialeTesto);
				testoFinale.castShadow = true;
				testoFinale.receiveShadow = true;
				testoFinale.position.set(-10, pivotMacchina.position.y + 4, z);
				scene.add(testoFinale);

			});
		}
