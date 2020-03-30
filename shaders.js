// Annoyingly reformatted for IE compatibility. ` is unsupported
const shaderSourceCode =
	// Included data sources
	'precision mediump float;' +
	'varying vec2 vTextureCoord;' +		// Coordinates of the current pixel
	'uniform sampler2D uSampler;' +		// Image data

	// Start and end colors
	'uniform vec3 tint1;' +				// Vector3 contaning RGB values
	'uniform vec3 tint2;' +

    // Actual graphics code
	'void main(void) {' +
		'vec3 newPixelByColumn = mix(tint1, tint2, vTextureCoord.y);' +		// Prepare the next pixel in the gradient column
		'vec4 nextBlankPixel = texture2D(uSampler, vTextureCoord);' +		// Grab the next pixel on the canvas
    	'gl_FragColor = nextBlankPixel * vec4(newPixelByColumn, 1.0);' +	// Multiply things together to paint it
	'}';




const plainGradient = function (start, end) {
	// Get shader code as a string, and create our Pixi filter
	const cowShader = new PIXI.Filter(null, shaderSourceCode, {
		// These are the shader 'uniforms'
		tint1 : { type: 'v3', value: new Float32Array([1.0, 1.0, 1.0]) },
		tint2 : { type: 'v3', value: new Float32Array([0.0, 0.0, 0.0]) },
	});

	function formatRGBColor(x) {
		// Input: 0xFF9933
		// Output: [0.123, 0.456, 0.789]
		const r = (x&0xff0000|0)/0xff0000
		const g = (x&0xff00|0)/0xff00
		const b = (x&0xff|0)/0xff

		return new Float32Array([r,g,b])
	}

	if (arguments.length > 0) {				// if statement is just a safety measure
		cowShader.uniforms.tint1 = formatRGBColor(start)
		cowShader.uniforms.tint2 = formatRGBColor(end)
	}

	//console.log('Generating new background - (' + start + ', ' + end + ')')
	return cowShader
}