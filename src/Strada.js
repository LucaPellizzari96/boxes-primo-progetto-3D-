// FUNZIONI PER INSERIRE LA STRADA E GLI ALTRI OGGETTI (oltre alla macchina gia inserita)
		function inserisciStrada(){
			var altezzaStrada = 2;
			var larghezzaStrada = 10;
			xDestra = larghezzaStrada/4;  // il centro della metà della strada a dx dell'origine
			xSinistra = -larghezzaStrada/4;  // il centro della metà della strada a sx dell'origine
			var geometriaStrada = new THREE.BoxGeometry(larghezzaStrada, altezzaStrada, lunghezzaStrada);

			var texture = new THREE.TextureLoader().load('../textures/asfalto.png'); 
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 4, 2000 );

			var materialeStrada = new THREE.MeshPhongMaterial({map: texture});
			var strada = new THREE.Mesh(geometriaStrada, materialeStrada);
			var yStrada = yFineRuote -(altezzaStrada/2 + 0.2);  // la strada e' 0.2 + in basso delle ruote
			strada.position.set(0, yStrada, -(lunghezzaStrada/2));  // la strada parte dall'origine e va fino a z = -lunghezzaStrada
			//strada.castShadow = true;
			strada.receiveShadow = true;
			scene.add(strada);

			aggiungiBloccoFine(altezzaStrada, yStrada, -lunghezzaStrada);
			inserisciMezzeria(altezzaStrada, lunghezzaStrada, yStrada);
			inserisciErba(larghezzaStrada, altezzaStrada, lunghezzaStrada, yStrada);
		}

		function aggiungiBloccoFine(altezzaStrada, yStrada, z){
			var geometriaBlocco = new THREE.BoxGeometry(70, altezzaStrada, 60);
			var materialeBlocco = new THREE.MeshPhongMaterial({color: 0x824200});
			var blocco = new THREE.Mesh(geometriaBlocco, materialeBlocco);
			blocco.position.set(0, yStrada, z - 30 - 0.05);  // 30 = lunghezzaBlocco/2, 0.05 per staccarlo dalla strada
			//blocco.castShadow = true;
			blocco.receiveShadow = true;
			scene.add(blocco);
		}

		function inserisciMezzeria(altezzaStrada, lunghezzaStrada, yStrada){
			var zPrimaRiga = -2.5;
			var altezzaRiga = 0.01;
			var lunghezzaRiga = 5;
			var geometriaMezzeria = new THREE.BoxGeometry(1, altezzaRiga, lunghezzaRiga);
			var materialeMezzeria = new THREE.MeshPhongMaterial({ color: "white"});
			for(var i = 0; i < lunghezzaStrada/(2*lunghezzaRiga); i++){
				var riga = new THREE.Mesh(geometriaMezzeria, materialeMezzeria);
				riga.position.set(0, yStrada + altezzaStrada/2 + altezzaRiga/2 + 0.05, zPrimaRiga);  // le righe sono a 0.05 dalla strada (quindi a 0.05 anche dalle ruote)
				//riga.castShadow = true;
				riga.receiveShadow = true;
				scene.add(riga);
				zPrimaRiga -= (2*lunghezzaRiga);
			}
		}

		function aggiungiCartelloArrivo(x,z){
			// Aggiungo i due pali esterni
			var altezzaPalo = 6;
			var lunghezzaPalo = 1;
			var geometriaPalo = new THREE.BoxGeometry(lunghezzaPalo, altezzaPalo, lunghezzaPalo);
			var materialePalo = new THREE.MeshPhongMaterial({ color:"brown"});
			var palo1 = new THREE.Mesh(geometriaPalo, materialePalo);
			var yPalo = yFineRuote + altezzaPalo/2 - 0.15;  // le ruote sono a 0.2 dalla strade quindi così i pali sono a 0.05 dalla strada
			palo1.position.set(x, yPalo, z + lunghezzaPalo/2);
			palo1.receiveShadow = true;
			palo1.castShadow = true;
			scene.add(palo1);
			var palo2 = new THREE.Mesh(geometriaPalo, materialePalo);
			palo2.position.set(-x, yPalo, z + lunghezzaPalo/2);
			palo2.receiveShadow = true;
			palo2.castShadow = true;
			scene.add(palo2);
			// Aggiungo il cartello centrale
			aggiungiCartello(z + lunghezzaPalo/2, altezzaPalo, yPalo);
		}

		function aggiungiCartello(z, altezzaPalo, yPalo){
			var texture = new THREE.TextureLoader().load('../textures/cartelloFinish.png'); 
			var materials = [
			   new THREE.MeshPhongMaterial({ color: "black" }),  // faccia a destra
			   new THREE.MeshPhongMaterial({ color: "black" }),  // faccia a sinistra
			   new THREE.MeshPhongMaterial({ color: "black" }),  // faccia in alto
			   new THREE.MeshPhongMaterial({ color: "black" }),  // faccia in basso
			   new THREE.MeshPhongMaterial({ map: texture }),  // faccia davanti, a cui devo apllicare la texture
			   new THREE.MeshPhongMaterial({ color: "black" }) 	];
			var geometriaCartello = new THREE.BoxGeometry(10, 4, 1);
			var cartello = new THREE.Mesh(geometriaCartello, new THREE.MultiMaterial(materials));
			cartello.position.set(0, yPalo + altezzaPalo/2 + 2 + 0.05, z);  // + 2 = altezzaCartello/2, +0.05 per staccarlo dalla superficie dei pali
			cartello.castShadow = true;
			cartello.receiveShadow = true;
			scene.add(cartello);
		}

		function inserisciErba(larghezzaStrada, altezzaStrada, lunghezzaStrada, yStrada){
			var larghezzaErba = 30;
			var geometriaErba = new THREE.BoxGeometry(larghezzaErba, altezzaStrada, lunghezzaStrada);
			var texture = new THREE.TextureLoader().load('../textures/erba.png');
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 10, 1500 );
			var materialeErba = new THREE.MeshPhongMaterial({map: texture});
			var erbaDestra = new THREE.Mesh(geometriaErba, materialeErba);
			var erbaSinistra = new THREE.Mesh(geometriaErba, materialeErba);
			var xErbaDestra = larghezzaStrada/2 + larghezzaErba/2 + 0.05;  // posiziono l'erba a lato della strada staccata di 0.05
			erbaDestra.position.set(xErbaDestra, yStrada, -(lunghezzaStrada/2));
			erbaSinistra.position.set(-xErbaDestra, yStrada, -(lunghezzaStrada/2));

			//erbaDestra.castShadow = true;
			erbaDestra.receiveShadow = true;
			//erbaSinistra.castShadow = true;
			erbaSinistra.receiveShadow = true;
			scene.add(erbaDestra);
			scene.add(erbaSinistra);
		}
		
		function inserisciLuceEmisferica(){
			hemiLight = new THREE.HemisphereLight( 0xffffff, 0x0033ff, 0.3 );
			hemiLight.color.setHSL( 0.6, 1, 0.6 );
			hemiLight.position.set( 0, 500, 0 );
			scene.add( hemiLight );
		}
