// created by weepy from the PIXI.js github
// https://github.com/pixijs/pixi.js/issues/2216

// var src =`
//     precision mediump float;
//     varying vec2 vTextureCoord;
//     varying vec2 vFilterCoord;
//     uniform mat3 mappedMatrix;
//     uniform sampler2D uSampler;
//
//     // start and end colors
//     uniform vec3 tint1;
//     uniform vec3 tint2;
//
//     void main(){
//
// //  vec2 uvs = vTextureCoord.xy;
//     vec3 mapCoord = vec3(vTextureCoord, 1.0) * mappedMatrix;
//     vec3 mixCol = mix(tint1, tint2, mapCoord.y);
//
//     vec4 fg = texture2D(uSampler, vTextureCoord);
//
//     gl_FragColor = fg*vec4(mixCol, 1.0);
//     }`


// Fucking bullshit archaic rewrite for IE compatibility. ` is banned
var src =
    'precision mediump float;' +
    'varying vec2 vTextureCoord;' +
    'varying vec2 vFilterCoord;' +
    'uniform mat3 mappedMatrix;' +
    'uniform sampler2D uSampler;' +

    // start and end colors
    'uniform vec3 tint1;' +
    'uniform vec3 tint2;' +

    'void main(){' +

	// vec2 uvs = vTextureCoord.xy;
    'vec3 mapCoord = vec3(vTextureCoord, 1.0) * mappedMatrix;' +
    'vec3 mixCol = mix(tint1, tint2, mapCoord.y);' +

    'vec4 fg = texture2D(uSampler, vTextureCoord);' +

    'gl_FragColor = fg*vec4(mixCol, 1.0);' +
    '}';


const plainGradient = function (start, end) {
    //Get shader code as a string
    
      //Create our Pixi filter using our custom shader code
    var shader = new PIXI.Filter(null, src, {
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

    shader.apply = function(filterManager, input, output) {
      filterManager.calculateNormalizedScreenSpaceMatrix(this.uniforms.mappedMatrix);
      filterManager.applyFilter(this, input, output);
    };


    shader.setColors = function(start, end) {
        shader.uniforms.tint1 = rgb(start)
        shader.uniforms.tint2 = rgb(end)
    }    

    if(arguments.length > 0) {
        shader.setColors(start, end)
    }
    return shader
}