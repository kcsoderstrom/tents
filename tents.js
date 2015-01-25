document.addEventListener("DOMContentLoaded", function() {
	var tent;
	var graphCtx = document.getElementById("graph").getContext("2d");

	var tentMap = function(a, k, b) {
		var slope1 = (1 - a) / k;
		var int1 = a;
		var slope2 = (1 - b) / (k - 1);
		var int2 = b - slope2;

		var tent = function(x) {
			if(x < k) {
				return slope1 * x + int1;
			} else {
				return slope2 * x + int2;
			}
		};

		return tent;
	};

	var iteratedTentMap = function(tent, n) {
		var i = 0;
		var iterated = function(x) {
			return x;
		};

		while(i < n) {
			(function() {
				var tempIterated = iterated;
				iterated = function(x) {
					return tent(tempIterated(x));
				};
			})();
			i += 1;
		}

		return iterated;
	};

	document.getElementById("draw-button").addEventListener("click", function(event) {
		var a = parseFloat(document.getElementById("a-input").value);
		var k = parseFloat(document.getElementById("k-input").value);
		var b = parseFloat(document.getElementById("b-input").value);
		var n = parseInt(document.getElementById("n-input").value);

		if(a + 1 && k + 1 && b + 1 && n + 1) {
			tent = iteratedTentMap(tentMap(a, k, b), n);
			draw();
		}
	});

	var draw = function() {
		graphCtx.clearRect(0,0,500,500);
		var i = 0;
		var delta = 0.0001;
		while(i < 1) {
			drawLine(i * 500, 500 - tent(i) * 500, (i + delta) * 500, 500 - (tent(i + delta) * 500), "black");
			i += delta;
		}

		drawLine(0, 500, 500, 0, "red");
    graphCtx.stroke();
	};

	var drawLine = function(x1, y1, x2, y2, color) {
    graphCtx.beginPath();
    graphCtx.moveTo(x1, y1);
    graphCtx.lineTo(x2, y2);
    graphCtx.lineWidth = 3;
		graphCtx.strokeStyle = color;
    graphCtx.stroke();
	};

});