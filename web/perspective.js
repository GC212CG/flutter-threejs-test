
var canvas;
var gl;

var NumVertices  = 36;

var points = [];
var colors = [];

var modelView
var modelViewMatrix
var projection
var projectionMatrix

var eye;

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

var near = 0.3
var far = 4
var radius = 4.0
var theta = 0.0
var phi = 0.0

var fovy = 45
var aspect = 1.0



window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);

    
    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

	colorCube();

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelView = gl.getUniformLocation( program, "modelView" );
    projection = gl.getUniformLocation( program, "projection" );

    
    // Sliders to change viewing parameters
    document.getElementById("nearSlider").oninput = function(event){
        near = event.target.value
        render();
    };
    document.getElementById("farSlider").oninput = function(event){
        far = event.target.value
        render();
    };
    document.getElementById("radiusSlider").oninput = function(event){
        radius = event.target.value
        render();
    };
    document.getElementById("thetaSlider").oninput = function(event){
        theta = event.target.value*Math.PI/180
        render();
    };
    document.getElementById("phiSlider").oninput = function(event){
        phi = event.target.value*Math.PI/180
        render();
    };
    document.getElementById("aspectSlider").oninput = function(event){
        aspect = event.target.value
        render();
    };
    document.getElementById("fovySlider").oninput = function(event){
        fovy = event.target.value
        render();
    };

    render();

}


// Build ColorCube
function colorCube() {
    quad( 1, 0, 3, 2 ); 
    quad( 2, 3, 7, 6 ); 
    quad( 3, 0, 4, 7 ); 
    quad( 6, 5, 1, 2 ); 
    quad( 4, 5, 6, 7 ); 
    quad( 5, 4, 0, 1 ); 
}

function quad(a, b, c, d) {
    var vertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ), // 0
        vec4( -0.5,  0.5,  0.5, 1.0 ), // 1
        vec4(  0.5,  0.5,  0.5, 1.0 ), // 2
        vec4(  0.5, -0.5,  0.5, 1.0 ), // 3
        vec4( -0.5, -0.5, -0.5, 1.0 ), // 4 
        vec4( -0.5,  0.5, -0.5, 1.0 ), // 5
        vec4(  0.5,  0.5, -0.5, 1.0 ), // 6
        vec4(  0.5, -0.5, -0.5, 1.0 ),  // 7
    ];

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
    ];
    
    //vertex color assigned by the index of the vertex
    var indices = [ a, b, c, a, c, d ]; // 1 0 3, 1 3 2 // 4 5 6, 4 6 7

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]]);
        colors.push( vertexColors[a] )
    }
    
}


// Render function
function render(thetaInput) {

    if(thetaInput != undefined) theta = thetaInput;

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // eye point
    eye = vec3(radius*Math.cos(theta)*Math.sin(phi), radius*Math.sin(theta), radius*Math.cos(theta)*Math.cos(phi));
	
    modelViewMatrix = lookAt(eye, at , up);
    // Perspective view camera
    projectionMatrix = perspective(fovy, aspect, near, far)

	gl.uniformMatrix4fv( modelView, false, flatten(modelViewMatrix) )
    gl.uniformMatrix4fv( projection, false, flatten(projectionMatrix) )

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

