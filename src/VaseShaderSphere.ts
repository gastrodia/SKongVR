import * as Type from './type';
import MultiMaterialObject from './MultiMaterialObject';
var vertexShader = `
      varying vec2 vUv;

      void main()
      {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
      }
`;

var fragmentShader= `

			// uniform float time;
			// uniform vec2 resolution;
      //
			// varying vec2 vUv;
      //
			// void main( void ) {
      //
			// 	vec2 position = -1.0 + 2.0 * vUv;
      //
			// 	float red = abs( sin( position.x * position.y + time / 5.0 ) );
			// 	float green = abs( sin( position.x * position.y + time / 4.0 ) );
			// 	float blue = abs( sin( position.x * position.y + time / 3.0 ) );
			// 	gl_FragColor = vec4( red, green, blue, 1.0 );
      //
			// }


      // uniform float time;
      // uniform vec2 resolution;
      //
      // varying vec2 vUv;
      //
      // void main( void ) {
      //
      //   vec2 position = vUv;
      //
      //   float color = 0.0;
      //   color += sin( position.x * cos( time / 15.0 ) * 80.0 ) + cos( position.y * cos( time / 15.0 ) * 10.0 );
      //   color += sin( position.y * sin( time / 10.0 ) * 40.0 ) + cos( position.x * sin( time / 25.0 ) * 40.0 );
      //   color += sin( position.x * sin( time / 5.0 ) * 10.0 ) + sin( position.y * sin( time / 35.0 ) * 80.0 );
      //   color *= sin( time / 10.0 ) * 0.5;
      //
      //   gl_FragColor = vec4( vec3( color, color * 0.5, sin( color + time / 3.0 ) * 0.75 ), 1.0 );
      //
      // }


      uniform float time;
			uniform vec2 resolution;

			uniform sampler2D texture;

			varying vec2 vUv;

			void main( void ) {

				vec2 position = -1.0 + 2.0 * vUv;

				float a = atan( position.y, position.x );
				float r = sqrt( dot( position, position ) );

				vec2 uv;
				uv.x = cos( a ) / r ;
				uv.y = sin( a ) / r;
				uv /= 10.0;
				uv += time * 0.05;

				vec3 color = texture2D( texture, uv ).rgb;

				gl_FragColor = vec4( color * r * 1.5, 1.0 );

			}
`

export default class VaseShaderSphere extends MultiMaterialObject implements Type.IDynamic{

  uniforms;

  constructor(size){
    var geometry = new THREE.SphereGeometry(1000,48,48);


    //var material = new THREE.MeshBasicMaterial( { color: color } );
    this.uniforms = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
        texture: { type: "t", value: THREE.ImageUtils.loadTexture( "resource/textures/terrain/grasslight-big.jpg" ) }
    };
			this.uniforms.texture.value.wrapS = this.uniforms.texture.value.wrapT = THREE.RepeatWrapping;
      /*
      new THREE.ShaderMaterial( {

        uniforms: this.uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader

      } )
      */

		var materials =[

//    new THREE.MeshLambertMaterial( { color:new THREE.Color(0.911504,0.818866,0.639576).getHex() } ),
    new THREE.MeshPhongMaterial({
        color:new THREE.Color(0.911504,0.818866,0.639576).getHex() ,
				specular: new THREE.Color(1,1,1).getHex(),
				//shininess: 50,
				side: THREE.DoubleSide,
				vertexColors: THREE.VertexColors,
				shading: THREE.SmoothShading}),
    //new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1, side: THREE.DoubleSide } )
  ];

    super( geometry, materials );


  }
  update(delta:number,clock:THREE.Clock){

    //this.uniforms.time.value += delta * 5;
    //this.uniforms.time.value = clock.elapsedTime;
    //
    //this.rotation.x += 0.1;
    this.rotation.z += 0.01;
  };
}
