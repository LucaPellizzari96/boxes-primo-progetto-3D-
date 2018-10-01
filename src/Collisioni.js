// FUNZIONI PER GESTIRE LE COLLISIONI

// Controlla se la macchina collide con un bersaglio, in caso affermativo
// cambia il valore di gameOver a true e la partita termina
function controllaCollisioni(){
	// controllo con il prossimo ostacolo, ovvero con il primo ostacolo che si trova + avanti della macchina
	var i = Math.floor(-pivotMacchina.position.z/50);
	var posOstacoloZ = (50*(i+1));
	var distanzaZ = calcolaDistanzaZ(i); // Meta' della "lunghezza" dell'ostacolo (dipende dal tipo dell'ostacolo)
	var distanzaX = calcolaDistanzaX(i); // Meta' della "larghezza" dell'ostacolo (dipende dal tipo dell'ostacolo)
	if(collisioneAsseZ("avanti", posOstacoloZ, offsetMacchinaZ, distanzaZ) && collisioneAsseX(i, offsetMacchinaX, distanzaX) && i != rimuoviOstacolo){
		gameOver = true;
		rimuoviOstacolo = controllaScudo(i);
	}  // altrimenti gameOver = false (valore assegnato all'inizio, quindi rimane inalterato)

	// controllo anche con l'ostacolo "precedente" (la macchina potrebbe aver superato di poco un ostacolo ma potrebbe ancora colpirlo)
	i--;  // prendo l'indice dell'ostacolo precedente
	if(i >= 0){  // se ha senso
		var posOstacoloZ = (50*(i+1));
		var distanzaZ = calcolaDistanzaZ(i); // Meta' della "lunghezza" dell'ostacolo (dipende dal tipo dell'ostacolo)
		var distanzaX = calcolaDistanzaX(i); // Meta' della "larghezza" dell'ostacolo (dipende dal tipo dell'ostacolo)
		if(collisioneAsseZ("indietro", posOstacoloZ, offsetMacchinaZ, distanzaZ) && collisioneAsseX(i, offsetMacchinaX, distanzaX) && i != rimuoviOstacolo){
			gameOver = true;
			rimuoviOstacolo = controllaScudo(i);
		}  // altrimenti gameOver = false (valore assegnato all'inizio, quindi rimane inalterato)
	}
}

function controllaScudo(i){
	if(powerUpAttivi[2] > -pivotMacchina.position.z){  // se avrei perso ma ho lo scudo
		gameOver = false;  // non ho perso
		powerUpAttivi[2] = 0;  // ma perdo lo scudo
		return i; // numero dell'ostacolo che ho appena colpito (con lo scudo), quindi se al frame successivo la variabile rimuoviOstacolo = indice del prossimo ostacolo ignoro la collisione
	}else {
		return -1; // -1 sara sempre != dall'indice del prossimo ostacolo
	}
}


// Controlla se la macchina ha una collisione con un bonus, in tal caso aggiorna i dati relativi al bonus e lo elimina dalla scena
function controllaCollisioniBonus(){
	if(powerUpInScena.length > 0){  // se ha senso
		var prossimoBonus = powerUpInScena[0];
		var distanzaZ = 1; // Valore predefinito per il bonus, sono cubi di lato 2 (quindi distanza dal centro e' 1)
		var distanzaX = 1;
		var tipoProssimoBonus = powerUpInScenaTipo[0]; // Stringa che rappresenta il prossimo bonus;
		if(-pivotMacchina.position.z - 5 >= -powerUpInScena[0].position.z){ // Se la macchina ha superato completamente il bonus passa al successivo;
			powerUpInScena.shift();
			powerUpInScenaTipo.shift();
			prossimoBonus = powerUpInScena[0];
			tipoProssimoBonus = powerUpInScenaTipo[0];
		}else{ // Se la macchina non ha superato il bonus controllo l'eventuale collisione
			if(collisioneAsseZ("avanti", -prossimoBonus.position.z, offsetMacchinaZ, 1) && collisioneAsseXPowerUp(prossimoBonus, offsetMacchinaX)){  // collisione avanti
				aggiungiBonus(tipoProssimoBonus); // aggiunge il bonus alla macchina quando questa li raccoglie
				scene.remove(powerUpInScena[0]); // rimuovo il bonus dalla scena (l'ho preso)
				powerUpInScena.shift(); // rimuovo il bonus dagli array
				powerUpInScenaTipo.shift();
			}else if(collisioneAsseZ("indietro", -prossimoBonus.position.z, offsetMacchinaZ, 1) && collisioneAsseXPowerUp(prossimoBonus, offsetMacchinaX)){  // collisione indietro
				aggiungiBonus(tipoProssimoBonus); // aggiunge il bonus alla macchina quando questa li raccoglie
				scene.remove(powerUpInScena[0]); // rimuovo il bonus dalla scena (l'ho preso)
				powerUpInScena.shift(); // rimuovo il bonus dagli array
				powerUpInScenaTipo.shift();
			}
		}
	}
}

// Funzione per calcolare la misura su X dell'oggetto
function calcolaDistanzaX(i){
	switch(tipoOstacoli[i]){
		case "tronco":
			return 1.5;
		case "masso":
			return 1;
	  case "asteroide":
			return 2;
	}
}

// Controlla che ci sia collisione sull'asse delle X
function collisioneAsseX(i, offsetMacchinaX, distanzaX){
	if(posizioneOstacoli[i] > 0){ // Se l'ostacolo si trova a destra
		if((pivotMacchina.position.x + offsetMacchinaX) >= (posizioneOstacoli[i] - distanzaX)){
			return true;
		}else{
			return false;
		}
	}else{ // Se l'ostacolo si trova a sinistra
		if((pivotMacchina.position.x - offsetMacchinaX) <= (posizioneOstacoli[i] + distanzaX)){
			return true;
		}else{
			return false;
		}
	}
}

function collisioneAsseXPowerUp(prossimoBonus, offsetMacchinaX){
	var xProssimoBonus = prossimoBonus.position.x ;
	var xMacchina = pivotMacchina.position.x;
	if(xProssimoBonus > 0){ // Bonus sul lato destro
		if((xMacchina + offsetMacchinaX) >= (xProssimoBonus - 1)){
			return true;
		}else{
			return false;
		}
	}else{ // Bonus sul lato sinistro
		if((xMacchina - offsetMacchinaX) <= (xProssimoBonus + 1)){
			return true;
		}else{
			return false;
		}
	}
}

// Funzione per calcolare la misura su Z dell'oggetto
function calcolaDistanzaZ(i){
	switch(tipoOstacoli[i]){
		case "tronco":
			return 0.5;
		case "masso":
			return 1;
		case "asteroide":
			return 2;
	}
}

// Controlla se la faccia della macchina passata come argomento collide, sull'asse Z, con l'ostacolo
function collisioneAsseZ(faccia, posOstacoloZ, offsetMacchinaZ, distanzaZ){
	if(faccia == "avanti"){
		var facciaAvanti = -pivotMacchina.position.z + offsetMacchinaZ;
		var collisioneAvanti = collisioneAvantiAsseZ(facciaAvanti, posOstacoloZ, distanzaZ);
		return collisioneAvanti;
	}else if(faccia == "indietro"){
		var facciaDietro = -pivotMacchina.position.z - offsetMacchinaZ;
		var collisioneIndietro = collisioneDietroAsseZ(facciaDietro, posOstacoloZ, distanzaZ);
		return collisioneIndietro;
	}
}

function collisioneAvantiAsseZ(facciaAvanti, posOstacoloZ, distanzaZ){
	var facciaAvantiOstacolo = posOstacoloZ - distanzaZ;
	var facciaDietroOstacolo = posOstacoloZ + distanzaZ;
	if(facciaAvanti <= facciaDietroOstacolo   //  parte davanti della macchina non ha ancora superato la faccia dietro dell'oggetto AND...
			&& facciaAvanti >= facciaAvantiOstacolo){  // parte davanti della macchina ha "superato" la faccia avanti dell'oggetto
		return true;
	}else{
		return false;
	}
}

function collisioneDietroAsseZ(facciaDietro, posOstacoloZ, distanzaZ){
	var facciaAvantiOstacolo = posOstacoloZ - distanzaZ;
	var facciaDietroOstacolo = posOstacoloZ + distanzaZ;
	if(facciaDietro <= facciaDietroOstacolo   //  parte dietro della macchina non ha ancora superato la faccia dietro dell'oggetto AND...
			&& facciaDietro >= facciaAvantiOstacolo){  // parte dietro della macchina ha "superato" la faccia avanti dell'oggetto
		return true;
	}else{
		return false;
	}
}
