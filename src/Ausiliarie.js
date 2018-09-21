		// FUNZIONI AUSILIARIE
		function randomConRange(min, max){  // restituisce numeri x tali che: min <= x <= max
			var range = (max - min) +1;
			return (Math.floor(Math.random() * range) + min);
		}

		function deg(rad){
			var gradi = rad * 180/Math.PI;
			return gradi;
		}

		function rad(deg){
			var radianti = deg * Math.PI/180;
			return radianti;
		}