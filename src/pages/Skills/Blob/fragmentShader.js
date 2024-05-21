const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
uniform float u_r;
uniform float u_g;
uniform float u_b;


varying vec2 vUv;



void main() {
  vec3 colorA = vec3(u_r, u_g, u_b);
  vec3 colorB = vec3(u_r, u_g, u_b);
  
  
  // "Normalizing" with an arbitrary value
  // We'll see a cleaner technique later :)   
  vec2 normalizedPixel = gl_FragCoord.xy/600.0;
  vec3 color = mix(colorA, colorB, normalizedPixel.x);

  gl_FragColor = vec4(color ,1.0);
  
  
}

`


export default fragmentShader