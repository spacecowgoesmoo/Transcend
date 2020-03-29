// created by weepy from the PIXI.js github
// https://github.com/pixijs/pixi.js/issues/2216

// var src =
//     'precision mediump float;' +
//     'varying vec2 vTextureCoord;' +
//     'varying vec2 vFilterCoord;' +
//     'uniform mat3 mappedMatrix;' +
//     'uniform sampler2D uSampler;' +

//     // start and end colors
//     'uniform vec3 tint1;' +
//     'uniform vec3 tint2;' +

//     'void main(){' +

// 	// vec2 uvs = vTextureCoord.xy;
//     'vec3 mapCoord = vec3(vTextureCoord, 1.0) * mappedMatrix;' +
//     'vec3 mixCol = mix(tint1, tint2, mapCoord.y);' +

//     'vec4 fg = texture2D(uSampler, vTextureCoord);' +

//     'gl_FragColor = fg*vec4(mixCol, 1.0);' +
//     '}';


// New recommendation
// ((vTextureCoord * inputSize.xy) + outputFrame.xy) / outputFrame.zw
// Dumb rewrite for IE compatibility. ` is unsupported
var src =
	// Included data sources
    'precision mediump float;' +
    'varying vec2 vTextureCoord;' +	// The coordinates of the current pixel
    'varying vec2 vFilterCoord;' +
    'uniform mat3 mappedMatrix;' +
    'uniform sampler2D uSampler;' +	// The image data
    'uniform vec4 inputSize;' +
    'uniform vec4 outputFrame;' +
    // Start and end colors
    'uniform vec3 tint1;' +
    'uniform vec3 tint2;' +

    // Actual graphics code
    'void main(){' +
    	// The new patch
   		'vec2 cow = (((vTextureCoord * inputSize.xy) + outputFrame.xy) / outputFrame.zw);' +

		// vec2 uvs = vTextureCoord.xy;
    	'vec3 mapCoord = vec3(vTextureCoord, 1.0) * mappedMatrix;' +
    	'vec3 mixCol = mix(tint1, tint2, mapCoord.y);' +

 		'vec4 fg = texture2D(uSampler, vTextureCoord);' +

    	'gl_FragColor = fg*vec4(mixCol, 1.0);' +
    '}';


const plainGradient = function (start, end) {
    // Get shader code as a string, and create our Pixi filter
    var shader = new PIXI.Filter(null, src, {
        // These are the shader 'uniforms'
        tint1 : { type: 'v3', value: new Float32Array([1.0, 1.0, 1.0]) },
        tint2 : { type: 'v3', value: new Float32Array([0.0, 0.0, 0.0]) },
        mappedMatrix: {
        	type: 'mat3',
			value: new PIXI.Matrix()
        }
    });




    function rgb(x) {
        const r = (x&0xff0000|0)/0xff0000
        const g = (x&0xff00|0)/0xff00
        const b = (x&0xff|0)/0xff

        return new Float32Array([r,g,b])
    }

    shader.apply = function(filterManager, input, output, currentState) {
    	// Deprecated
		// This does: "Multiply vTextureCoord to this matrix to achieve (0,0,1,1) for filterArea"
		// filterManager.calculateNormalizedScreenSpaceMatrix(this.uniforms.mappedMatrix);

		// New recommendation
		// ((vTextureCoord * inputSize.xy) + outputFrame.xy) / outputFrame.zw

		// I think this works, except currentState (below) isn't being fetched properly
		// It's a copypaste of the deprecated function
		// function patch2020(inputMatrix, filterArea, textureSize) {
  //   		const mappedMatrix = inputMatrix.value.identity();
		//     mappedMatrix.translate(filterArea.x / textureSize.width, filterArea.y / textureSize.height);
		//     const translateScaleX = (textureSize.width / filterArea.width);
  //   		const translateScaleY = (textureSize.height / filterArea.height);
		//     mappedMatrix.scale(translateScaleX, translateScaleY);
		//     return mappedMatrix;
		// }

  //   	console.log(currentState)
		// const filterArea = currentState.sourceFrame;
  //   	const textureSize = currentState.destinationFrame;
		// this.uniforms.mappedMatrix = patch2020(this.uniforms.mappedMatrix, filterArea, textureSize);
		filterManager.applyFilter(this, input, output);
    };

    shader.setColors = function(start, end) {
        shader.uniforms.tint1 = rgb(start)
        shader.uniforms.tint2 = rgb(end)
    }    

    if (arguments.length > 0) {
        shader.setColors(start, end)
    }
    return shader
}