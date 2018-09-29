		function inserisciOstacoli(lunghezzaStrada){
		// Inserisco gli ostacoli sulla strada
			for(var i = 1; i <= numeroOstacoli; i++){  // aggiungo un certo numero di ostacoli scelti a caso
				var z = -(i * (spazioFraOstacoli));
				var x = scegliLato("interno");
				aggiungiOstacolo("interno", x, z);
				posizioneOstacoli[i-1] = x;
			}  // for
			// Inserisco gli ostacoli fuori dalla strada
			spazioFraOstacoli = 200;
			numeroOstacoli = (lunghezzaStrada/spazioFraOstacoli) -2;
			for(var i = 1; i <= numeroOstacoli; i++){  // aggiungo un certo numero di ostacoli scelti a caso
				var z = -(i * (spazioFraOstacoli));
				var x = scegliLato("esterno");
				aggiungiOstacolo("esterno", x, z);
			}  // for
			// Aggiungo il cartello finale
			aggiungiCartelloArrivo(4.5, -lunghezzaStrada);  // aggiungo in fondo il cartello di arrivo
			// Creo l'elemento uccello
			inserisciUccello();
			var xPartenza;
			if(randomConRange(0,100) > 50){
				xPartenza = -30;
			}else{
				xPartenza = 30;
			}
			oggettoUccello.aggiungi(xPartenza, -200);
		}

		function scegliLato(posizione){  // scelgo a caso se un oggetto deve stare a destra o a sinistra
			var random = randomConRange(0,1);
			if(posizione == "interno"){  // ostacoli interni
				if(random == 0){
					return xDestra;
				} else {
					return xSinistra;
				}
			} else {  // ostacoli esterni
				if(random == 0){
					return xDestra + 15;  // 15 = larghezzaErba/2
				} else {
					return xSinistra - 15;
				}
			}
		}

		function aggiungiOstacolo(posizione, x, z){
			var tipoOstacolo = scegliOstacolo(posizione);
			switch(tipoOstacolo){
				case "tronco":
					aggiungiTronco(x,z);
					tipoOstacoli[(-z/50) - 1] = "tronco";
					break;
				case  "masso":
					aggiungiMasso(x, z);
					tipoOstacoli[(-z/50) - 1] = "masso";
					break;
				case "asteroide":
					aggiungiAsteroide(x, z);
					tipoOstacoli[(-z/50) - 1] = "asteroide";
					break;
				case "albero":
					aggiungiAlbero(x, z);
					break;
				case "mulino":
					aggiungiMulino(x, z);
					break;
			}
		}

		function scegliOstacolo(posizione){  // scelgo a caso un oggetto fra i possibili ostacoli
			if(posizione == "interno"){  // ostacoli sulla strada
				var random = randomConRange(1,100);
				if(random <= 45){  // 45% tronco
					return "tronco";
				}else if(random > 45 && random <= 90) {  // 45% masso
					return "masso";
				}else{ // 10% asteroide
					return "asteroide";
				}
			} else {  // ostacoli fuori dalla strada
				var random = randomConRange(1,100);
				if(random <= 60){  // 60% albero
					return "albero";
				}else if(random > 60){  // 40% mulino
					return "mulino";
				}
			}
		}

		function aggiungiMasso(x,z){
			var altezzaMasso = 2;
			var geometriaMasso = new THREE.BoxGeometry(2,altezzaMasso,2);
			var texture = new THREE.TextureLoader().load('../textures/masso.png');
			var materialeMasso = new THREE.MeshPhongMaterial( { map: texture } );
			var masso = new THREE.Mesh(geometriaMasso, materialeMasso);
			masso.castShadow = true;
			masso.receiveShadow = true;
			masso.position.set(x,yFineRuote + altezzaMasso/2,z);
			scene.add(masso);
		}

		function aggiungiTronco(x,z){
			var geometriaTronco = new THREE.BoxGeometry(3,1,1);
			var texture = new THREE.TextureLoader().load('../textures/tronco.png'); 
			var materialeTronco = new THREE.MeshPhongMaterial( { map: texture } );
			var tronco = new THREE.Mesh(geometriaTronco, materialeTronco);
			tronco.castShadow = true;
			tronco.receiveShadow = true;
			tronco.position.set(x,yFineRuote + 0.5,z);  // +0.5 = + altezzaTronco/2 cosi ha la stessa y della macchina
			scene.add(tronco);
		}

		function aggiungiAsteroide(x,z){
			var geometriaAsteroide = new THREE.BoxGeometry(4,4,4);
			var texture = new THREE.TextureLoader().load('../textures/asteroide.png'); 
			var materialeAsteroide = new THREE.MeshPhongMaterial( { map: texture } );
			var asteroide = new THREE.Mesh(geometriaAsteroide, materialeAsteroide);
			asteroide.castShadow = true;
			asteroide.receiveShadow = true;
			asteroide.position.set(x,200,z);
			asteroidi[contatoreAsteroide] = asteroide;  // inserisco l'asteroide nel vettore per le animazioni
			contatoreAsteroide++;
		}

		function aggiungiAlbero(x, z){
			var altezzaAlbero = randomConRange(15,30)/10;
			var geometriaAlbero = new THREE.BoxGeometry(1, altezzaAlbero, 1);
			var materialeAlbero = new THREE.MeshPhongMaterial({color:"brown"});
			var tronco = new THREE.Mesh(geometriaAlbero, materialeAlbero);
			tronco.position.set(x, yFineRuote + altezzaAlbero/2, z);
			tronco.receiveShadow = true;
			tronco.castShadow = true;
			scene.add(tronco);
			var dimensioneCuboPartenza = altezzaAlbero*3/2;
			var y = yFineRuote + altezzaAlbero + 0.05;  // y di partenza per le "foglie"
			aggiungiFoglie(dimensioneCuboPartenza, x, y, z);
		}

		function aggiungiFoglie(dim, x, y, z){
			for(var i = 0; i < 4; i++){
				var geometriaFoglie = new THREE.BoxGeometry(dim, dim, dim);
				var materialeFoglie = new THREE.MeshPhongMaterial({color:"green"});
				var foglie = new THREE.Mesh(geometriaFoglie, materialeFoglie);
				foglie.position.set(x, y + dim/2, z);
				foglie.receiveShadow = true;
				foglie.castShadow = true;
				scene.add(foglie);
				y = y + dim;
				dim = 2/3 * dim;
			}
		}

		function aggiungiMulino(x, z){
			var geometriaBase = new THREE.BoxGeometry(4, 2, 4);
			var geometriaCorpo = new THREE.BoxGeometry(2.5, 6, 2.5);
			var geometriaTesta = new THREE.BoxGeometry(2, 1, 1);
			var geometriaPala = new THREE.BoxGeometry(0.1, 8, 0.6);
			var geometriaPerno = new THREE.BoxGeometry(0.4, 0.4, 0.4);

			var materialeBase = new THREE.MeshPhongMaterial({color: "grey"});
			var materialeCorpo = new THREE.MeshPhongMaterial({color: "brown"});
			var materialeTesta = new THREE.MeshPhongMaterial({color: "chocolate"});
			var materialePala = new THREE.MeshPhongMaterial({color: "white"});
			var materialePerno = new THREE.MeshPhongMaterial({color: "brown"});

			var base = new THREE.Mesh(geometriaBase, materialeBase);
			base.castShadow = true;
			base.receiveShadow = true;
			var corpo = new THREE.Mesh(geometriaCorpo, materialeCorpo);
			corpo.castShadow = true;
			corpo.receiveShadow = true;
			var testa = new THREE.Mesh(geometriaTesta, materialeTesta);
			testa.castShadow = true;
			testa.receiveShadow = true;
			var palaA = new THREE.Mesh(geometriaPala, materialePala);
			palaA.castShadow = true;
			palaA.receiveShadow = true;
			var palaB = new THREE.Mesh(geometriaPala, materialePala);
			palaB.castShadow = true;
			palaB.receiveShadow = true;
			var perno = new THREE.Mesh(geometriaPerno, materialePerno);
			perno.castShadow = true;
			perno.receiveShadow = true;

			pivotPerno = new THREE.Object3D();
			pivotMulino = new THREE.Object3D();

			corpo.position.y = yFineRuote + 2 +3; // 2 = altezzaBase, 3 = altezzaCorpo/2
			palaB.rotateX(90*Math.PI/180);
			if(x < 0){  // siamo a sinistra
				testa.position.set(0.5, corpo.position.y +3, 0);
				pivotPerno.position.set(1.7, testa.position.y, 0);
			}else if(x > 0){  // siamo a destra
				testa.position.set(-0.5, corpo.position.y +3, 0);
				pivotPerno.position.set(-1.7, testa.position.y, 0);
			}

			pivotMulino.add(base);
			pivotMulino.add(corpo);
			pivotMulino.add(testa);

			pivotPerno.add(palaA);
			pivotPerno.add(palaB);
			pivotPerno.add(perno);

			pivotMulino.add(pivotPerno);
			pivotMulino.position.x = x / 1.3;
			pivotMulino.position.z = z;

			posizioneZMulini[contatoreMulini] = z;
			mulini[contatoreMulini] = pivotPerno;  // inserisco il perno nel vettore per le animazioni
			contatoreMulini++;

			scene.add(pivotMulino);
		}

		function aggiungiOmino(x, z){
			var geometriaCorpo = new THREE.BoxGeometry(0.5, 1, 0.3);
			var geometriaTesta = new THREE.BoxGeometry(0.25, 0.3, 0.25);
			var geometriaArto = new THREE.BoxGeometry(0.1, 0.6, 0.1);

			var materialeCorpo = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
			var materialeTesta = new THREE.MeshPhongMaterial({color: "pink"});
			var materialeArto = new THREE.MeshPhongMaterial({color: "pink"});

			var corpo = new THREE.Mesh(geometriaCorpo, materialeCorpo);
			corpo.castShadow = true;
			corpo.receiveShadow = true;
			var testa = new THREE.Mesh(geometriaTesta, materialeTesta);
			testa.castShadow = true;
			testa.receiveShadow = true;
			braccioA = new THREE.Mesh(geometriaArto, materialeArto);
			braccioA.castShadow = true;
			braccioA.receiveShadow = true;
			braccioB = new THREE.Mesh(geometriaArto, materialeArto);
			braccioB.castShadow = true;
			braccioB.receiveShadow = true;
			var gambaA = new THREE.Mesh(geometriaArto, materialeArto);
			gambaA.castShadow = true;
			gambaA.receiveShadow = true;
			var gambaB = new THREE.Mesh(geometriaArto, materialeArto);
			gambaB.castShadow = true;
			gambaB.receiveShadow = true;

			pivotBraccioA = new THREE.Object3D();
			pivotBraccioB = new THREE.Object3D();
			pivotOmino = new THREE.Object3D();

			corpo.position.y = 0.75;
			pivotOmino.add(corpo);
			testa.position.y = 1.35;
			pivotOmino.add(testa);
			gambaA.position.x = 0.125;
			gambaB.position.x = -0.125;
			pivotOmino.add(gambaA);
			pivotOmino.add(gambaB);

			pivotBraccioA.position.y = 1.3;
			braccioA.position.set(0.4, 0, 0);
			braccioA.rotateZ(-40*Math.PI/180);

			pivotBraccioB.position.y = 1.3;
			braccioB.position.set(-0.4, 0, 0);
			braccioB.rotateZ(40*Math.PI/180);
			pivotBraccioA.add(braccioA);
			pivotBraccioB.add(braccioB);

			pivotOmino.add(pivotBraccioA);
			pivotOmino.add(pivotBraccioB);
			scene.add(pivotOmino);

			//Aggiustamenti omino
			pivotOmino.scale.x = 1.6;
			pivotOmino.scale.y = 1.6;
			pivotOmino.scale.z = 1.6;
			pivotOmino.position.set(x, -0.8, z);

			velocitaOmino = 0.25; // Variabile per il salto
			gravita = 0.015; // Variabile di gravita per migliorare il salto

			arrayOmini.push(pivotOmino);
			arrayVelOmini.push(velocitaOmino);
		}
		
		function inserisciOmini(){
			for (var i = 0; i < 83; i++){
				var posizioneOminoZ = 75+(120*i);
				aggiungiOmino(scegliLato()/2.5, -posizioneOminoZ);
			}
		}
		
		function inserisciOminiStart(){
			for(var i = 0; i < 20; i++){
				var posizioneOminoX = randomConRange(-15, 15);
				var posizioneOminoZ = -randomConRange(0, 20);
				if(posizioneOminoX < 0){
					posizioneOminoX -= 6;
				}else{
					posizioneOminoX += 6;
				}
				aggiungiOmino(posizioneOminoX, posizioneOminoZ);
			}
		}
		
		function inserisciOminiEnd(){
			for(var i = 0; i < 75; i++){
				var posizioneOminoX = randomConRange(-20, 20);
				var posizioneOminoZ = -(randomConRange(0, 60)+9980);
				if(posizioneOminoX < 0){
					posizioneOminoX -= 6;
				}else{
					posizioneOminoX += 6;
				}
				aggiungiOmino(posizioneOminoX, posizioneOminoZ);
			}
		}
		
		function inserisciUccello(){
			var geometriaCorpo = new THREE.BoxGeometry(2, 1, 1);
			var geometriaTesta = new THREE.BoxGeometry(0.7, 0.7, 0.7);
			var geometriaAla = new THREE.BoxGeometry(0.7, 0.2, 2);
			var geometriaBecco = new THREE.BoxGeometry(0.5, 0.1, 0.4);
			var pivotAlaA = new THREE.Object3D();
			var pivotAlaB = new THREE.Object3D();
			var uccello = new THREE.Object3D();

			var materialeCorpo = new THREE.MeshPhongMaterial({color: 0xdddddd});
			var materialeTesta = new THREE.MeshPhongMaterial({color: 0xbbbbbb});
			var materialeBecco = new THREE.MeshPhongMaterial({color: 0xff8800});

			var corpo = new THREE.Mesh(geometriaCorpo, materialeCorpo);
			var testa = new THREE.Mesh(geometriaTesta, materialeTesta);
			var alaA = new THREE.Mesh(geometriaAla, materialeCorpo);
			var alaB = new THREE.Mesh(geometriaAla, materialeCorpo);
			var becco = new THREE.Mesh(geometriaBecco, materialeBecco);

			testa.position.set(1, 0.75, 0);
			alaA.position.set(0, 0.2, -1);
			alaB.position.set(0, 0.2, 1);
			becco.position.set(1.6, 0.8, 0);

			pivotAlaA.add(alaA);
			pivotAlaB.add(alaB);
			uccello.add(corpo);
			uccello.add(testa);
			uccello.add(becco);
			uccello.add(pivotAlaA);
			uccello.add(pivotAlaB);
			
			uccello.scale.multiplyScalar(0.5); // riduco le dimensioni dell'uccello

			oggettoUccello = {
				mesh:uccello,
				pivotA:pivotAlaA,
				pivotB:pivotAlaB,
				visibile:false,
				angoloAli:0,
				velocita:0,
				posizioneInizialeX:0, 
			};

			oggettoUccello.aggiungi = function(x, z){
				this.posizioneInizialeX = x;
				this.centro = new THREE.Object3D();
				this.mesh.position.z = -5;
				this.centro.add(this.mesh);
				scene.add(this.centro);
				this.centro.position.set(x, 4, z);
				if(x > 0) this.centro.rotateY(deg(180)); // se si trova a dx devo ruotare il corpo in modo che guardi verso sx
			};

			oggettoUccello.animazioneAli = function(){
				this.pivotA.rotation.x += 0.05*Math.cos(this.angoloAli*Math.PI/180);
				this.pivotB.rotation.x -= 0.05*Math.cos(this.angoloAli*Math.PI/180);
				this.angoloAli = this.angoloAli%360;
				this.angoloAli += 5;
			};

			oggettoUccello.animazioneVolo = function(){
				//this.centro.rotateY(-0.02);
				if(this.posizioneInizialeX > 0){ // parto da dx
					this.centro.position.x -= 0.1 + 0.1*spostamentoMacchinaZ; // vado verso sx
				}else{ // parto da sx
					this.centro.position.x += 0.1 + 0.1*spostamentoMacchinaZ; // vado verso dx
				}
				this.mesh.position.y += Math.sin(this.velocita) * 0.05;
				this.velocita = this.velocita%360 + 0.05;
			};
		}
