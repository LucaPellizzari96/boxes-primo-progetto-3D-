// FUNZIONI PER COSTRUIRE LA MACCHINA
		function inserisciMacchina(){
			var altezzaMacchina = 1;
			var lunghezzaMacchina = 3;
			var geometriaMacchina = new THREE.BoxGeometry(1,altezzaMacchina,lunghezzaMacchina);
			//var coloreMacchina = new THREE.Color(Math.random() * 0xffffff);
			var materialeMacchina = new THREE.MeshPhongMaterial( { color: coloreMacchina } );
			var macchina = new THREE.Mesh( geometriaMacchina, materialeMacchina );

			// Geometria e materiale Fuoco e pivot di riferimento
			arrFuoco = new Array();
			asseFuoco = new THREE.Object3D();
			asseFuoco.visible = false; // aspetto che la partita inizi

			var particelle = 100;
			for(var i = 0; i < particelle; i++){
				var geometry = new THREE.BoxGeometry(0.2,0.2,0.2);
				var material = new THREE.MeshPhongMaterial( {color: 0xff0000, transparent: true, opacity: 1} );
				particellaFuoco = new THREE.Mesh(geometry, material);
				arrFuoco[i] = particellaFuoco;
				arrFuoco[i].position.y = i*(3/particelle);
				arrFuoco[i].position.x = Math.random()*0.8 - 0.4;
				asseFuoco.add(particellaFuoco);
			}
			// Modificando asseFuoco è possibile modificare interamente la struttura del fuoco;
			pivotMacchina.add(asseFuoco);
			asseFuoco.position.z = 1.55;
			asseFuoco.position.y = -0.2;
			asseFuoco.rotateX(Math.PI/2);
			asseFuoco.scale.x = 0.8;

			macchina.castShadow = true;
			macchina.receiveShadow = true;
			macchina.name = "Corpo macchina"; // TODO
			pivotMacchina.add(macchina);
			inserisciTetto(geometriaMacchina, materialeMacchina);
			inserisciFanali();
			// Inserisco le ruote
			var dimensioneRuota = 0.5;
			var verticiBassi = filtraVertici(geometriaMacchina.vertices, altezzaMacchina/2);
			inserisciRuote(verticiBassi, dimensioneRuota);  // inserisco le quattro ruote nel pivotMacchina
			// Calcolo la posizione del terreno in base a quella della macchina e delle ruote
			var yFineRuote = -(altezzaMacchina/2 + dimensioneRuota);
			return yFineRuote;
		}

		function inserisciTetto(geometriaMacchina, materialeMacchina){
			var geometriaTetto = new THREE.BoxGeometry(geometriaMacchina.parameters.width, geometriaMacchina.parameters.height/2, geometriaMacchina.parameters.depth/1.5);
			var tetto = new THREE.Mesh(geometriaTetto, materialeMacchina);
			var yTetto = geometriaMacchina.parameters.height/2 + geometriaMacchina.parameters.height/4;
			tetto.receiveShadow = true;
			tetto.castShadow = true;
			tetto.position.set(0, yTetto, 0);
			tetto.name = "Tetto macchina";
			pivotMacchina.add(tetto);
			inserisciFinestrino(geometriaTetto, yTetto);
		}

		function inserisciFinestrino(geometriaTetto, yTetto){
			var geometriaFinestrino = new THREE.BoxGeometry(geometriaTetto.parameters.width, geometriaTetto.parameters.height, 0.05);
			var materialeFinestrino = new THREE.MeshPhongMaterial({color: "dodgerblue", opacity: 0.25, transparent: true });
			var finestrino = new THREE.Mesh(geometriaFinestrino, materialeFinestrino);
			var zFinestrino = -(geometriaTetto.parameters.depth/2 + 0.05);  // il finestrino e' a 0.05 dal tetto della macchina
			finestrino.castShadow = true;
			finestrino.receiveShadow = true;
			finestrino.position.set(0, yTetto, zFinestrino);
			pivotMacchina.add(finestrino);
		}

		function filtraVertici(vertici, yVertici){  // tengo solo i vertici inferiori del parallelepipedo che corrisponde alla macchina
			var verticiFiltrati = new Array();
			for(var i = 0; i < vertici.length; i++){
					if(vertici[i].y < yVertici){
						verticiFiltrati.push(new THREE.Vector3(vertici[i]));
					}
			}  // for
			return verticiFiltrati;
		}

		function inserisciRuote(vertici, dimensioneRuota){
			var geometriaRuote = new THREE.BoxGeometry(dimensioneRuota, dimensioneRuota, dimensioneRuota);
			var materialeRuote = new THREE.MeshPhongMaterial({ color: "black" });
			for(var j = 0; j < vertici.length; j++){
				var ruota = new THREE.Mesh(geometriaRuote, materialeRuote);
				ruota.receiveShadow = true;
				ruota.castShadow = true;
				ruota.position.set(vertici[j].x.x, vertici[j].x.y - dimensioneRuota/2, vertici[j].x.z);
				ruota.name = "Ruota " + j;
				pivotMacchina.add(ruota);
			}
		}
		
		function inserisciFanali(){
			tempGeom = new THREE.BoxGeometry(0.1, 0.3, 0.2);
			tempMat = new THREE.MeshBasicMaterial({color: "white"});
			fanaleA = new THREE.Mesh(tempGeom, tempMat);
			fanaleB = new THREE.Mesh(tempGeom, tempMat);

 			fanaleA.position.set(0.4, 0.2, -1.5);
			fanaleB.position.set(-0.4, 0.2, -1.5);
			pivotMacchina.add(fanaleA);
			pivotMacchina.add(fanaleB);

			pivotFanale = new THREE.Object3D();
			pivotFanale.position.z = - 500;
			pivotFanale.position.y = 8;
			
			pivotMacchina.add(pivotFanale);

			var fanale = new THREE.SpotLight( 0xffffff, 5, 20 );
			fanale.position.set(pivotMacchina.position.x, pivotMacchina.position.y + 1, pivotMacchina.position.z - 3);
			fanale.target = pivotFanale;
			//fanale.shadow.camera.fov = 30;
			fanale.castShadow = true;
			pivotMacchina.add( fanale );
			pivotMacchina.add(fanale.target);
		}