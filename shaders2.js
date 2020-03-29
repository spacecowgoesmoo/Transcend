const shaderSourceCode = `
	// Included data sources
	precision mediump float;
	varying vec2 vTextureCoord;		// The coordinates of the current pixel
	uniform sampler2D uSampler;		// The image data

	// Start and end colors
	uniform vec3 tint1;				// Vector3 containg RGB values
	uniform vec3 tint2;



	void main(void) {
		// float yPercent = vTextureCoord.y / 600.0;			// This is a % scaled from 0 to 1
		// vec3 gradientColumn = mix(tint1, tint2, yPercent);

		gl_FragColor = texture2D(uSampler, vTextureCoord);
		gl_FragColor.r += vTextureCoord.y * tint1.x;
		gl_FragColor.g += vTextureCoord.y * tint1.y;
		gl_FragColor.b += vTextureCoord.y * tint1.z;
		gl_FragColor.r += (1.0 - vTextureCoord.y) * tint2.x;
		gl_FragColor.g += (1.0 - vTextureCoord.y) * tint2.y;
		gl_FragColor.b += (1.0 - vTextureCoord.y) * tint2.z;
	}`




const plainGradient = function (start, end) {
	// Get shader code as a string, and create our Pixi filter
	var cowShader = new PIXI.Filter(null, shaderSourceCode, {
		// These are the shader 'uniforms'
		tint1 : { type: 'v3', value: new Float32Array([1.0, 1.0, 1.0]) },
		tint2 : { type: 'v3', value: new Float32Array([0.0, 0.0, 0.0]) },
	});

	if (arguments.length > 0) {
        cowShader.uniforms.tint1 = convertToRGB(start)
		cowShader.uniforms.tint2 = convertToRGB(end)
    }

	function convertToRGB(x) {
		const r = (x&0xff0000|0)/0xff0000
		const g = (x&0xff00|0)/0xff00
		const b = (x&0xff|0)/0xff

		return new Float32Array([r,g,b])
	}

	return cowShader
}