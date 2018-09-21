// FUNZIONI PER IL MOVIMENTO DELLA MACCHINA

	function scegliSpostamentoMacchina(posizioneZMacchina){
		if(posizioneZMacchina < -(10000 + offsetMacchinaZ)){ // se arrivo alla fine
			spostamentoMacchinaZ = 0;  // fermo la macchina
		}else if(posizioneZMacchina <= fasciaPosizioneMacchina){  // quando raggiungo la fascia successiva
			fasciaPosizioneMacchina -= 250 + 250*(-posizioneZMacchina/2500);  // incremento il valore della fascia
			spostamentoMacchinaZ += 0.04;  // incremento la "velocita" della macchina
		}
	}

	function muoviMacchinaDx(pivotMacchina){
		if(pivotMacchina.position.x + spostamentoMacchinaX > xDestra){  // se superassi il limite destro non consento il movimento
			muoviDx = false;
			pivotMacchina.position.x = xDestra;
		}else{  // se sono ancora nel range di movimento valido
			pivotMacchina.position.x += spostamentoMacchinaX*(xDestra*1.25 - pivotMacchina.position.x); // Movimento della macchina su X piu' fluido
		}
	}

	function muoviMacchinaSx(pivotMacchina){
		if(pivotMacchina.position.x - spostamentoMacchinaX < xSinistra){ // se superassi il limite sinistro non consento il movimento
			muoviSx = false;
				pivotMacchina.position.x = xSinistra;
			}else{  // se sono ancora nel range di movimento valido
				pivotMacchina.position.x -= spostamentoMacchinaX*(xDestra*1.25 + pivotMacchina.position.x); // Movimento della macchina su X piu' fluido
			}
	}