'use client'

import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

import { extend, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

import {
  useGLTF,
  MeshTransmissionMaterial,
  OrbitControls,
  Environment,
  Lightformer,
  Text3D,
  Center,
  Float,
} from '@react-three/drei'

export function Cap({ children, ...props }) {
  const { nodes } = useGLTF('/keycap2-transformed.glb')
  return (
    <Float speed={2.5} distance={0.5} factor={0.5}>
      <group {...props} dispose={null} rotation={[Math.PI / 5, 0.2, 0]}>
        <mesh geometry={nodes.cap.geometry}>
          <MeshTransmissionMaterial
            backside
            backsideEnvMapIntensity={5}
            backsideThickness={0}
            anisotropicBlur={0.2}
            chromaticAberration={1}
          />
          <Center scale={0.75} rotation={[-Math.PI / 2, 0, 0]}>
            <Text3D curveSegments={64} font='/inter.json'>
              {children}
              <meshBasicMaterial color={[10, 10, 20]} roughness={0} />
            </Text3D>
          </Center>
        </mesh>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />{' '}
        <Environment resolution={1024}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={10} />
            <Lightformer intensity={1} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={10} />
            <Lightformer
              color='white'
              intensity={1}
              position={[10, 0, 0]}
              scale={10}
              onUpdate={(self) => self.lookAt(0, 0, 0)}
            />
          </group>
        </Environment>
      </group>
    </Float>
  )
}

const BasicShaderMaterial = shaderMaterial(
  // Uniforms
  { uProgress: 0, uResolution: new THREE.Vector2() },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
  }`,
  // Fragment Shader
  /*glsl*/ `
  precision mediump float;
  varying vec2 vUv;

  uniform float uProgress;
  uniform vec2 uResolution;

  #define iResolution uResolution
  #define time uProgress
  const float arrow_density = 1.5;
  const float arrow_length = .45;
  const vec3 luma = vec3(0.2126, 0.7152, 0.0722);

  float f(in vec2 p) {
      return sin(p.x+sin(p.y+time*0.1)) * sin(p.y*p.x*0.1+time*0.2);
  }

  vec2 field(in vec2 p) {
    vec2 ep = vec2(.05,0.);
    vec2 rz= vec2(0);
    for( int i=0; i<7; i++ ) {
      float t0 = f(p);
      float t1 = f(p + ep.xy);
      float t2 = f(p + ep.yx);
      vec2 g = vec2((t1-t0), (t2-t0))/ep.xx;
      vec2 t = vec2(-g.y,g.x);
      
      p += 0.8*t + g*0.7;
      rz= t;
    }
    return rz;
  }

  float segm(in vec2 p, in vec2 a, in vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa,ba)/dot(ba,ba), 0., 1.);
    return length(pa - ba*h)*20.*arrow_density;
  }

  void grayscale( inout vec3 color ) {
    // float avg = (color.r + color.g + color.b) / 3.0;
    float avg = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;
	color.rgb = vec3(avg);
}

  float fieldviz(in vec2 p) {
    vec2 ip = floor(p*arrow_density)/arrow_density + .5/arrow_density;   
    vec2 t = field(ip);
    float m = pow(length(t),0.5)*(arrow_length/arrow_density);
    vec2 b = normalize(t)*m;
    float rz = segm(p, ip, ip+b);
    vec2 prp = (vec2(-b.y,b.x));
    rz = min(rz,segm(p, ip+b, ip+b*0.65+prp*0.3));
    return clamp(min(rz,segm(p, ip+b, ip+b*0.65-prp*0.3)),0.,1.);
  }


  float udRoundBox( vec2 p, vec2 b, float r ){
    return length(max(abs(p)-b+r,0.0))-r;
}

float roundCorners(vec2 planeRes, vec2 uv, float radius) {
    float iRadius = min(planeRes.x, planeRes.y) * radius;
    vec2 halfRes = 0.5 * planeRes.xy;
    float b = udRoundBox( (uv * planeRes) - halfRes, halfRes, iRadius );
    return clamp(1.0 - b, 0.0, 1.0);
}

  void main() {
    vec2 p = gl_FragCoord.xy / iResolution.xy-0.5;
    p.x *= iResolution.x/iResolution.y;
    p *= 6.7;

    vec2 fld = field(p);
    vec3 col = sin(vec3(.1,0.1,0.4)+fld.x-fld.y)*0.95+0.35;
    col = mix(col,vec3(fld.x  + 0.1,-fld.x - 0.1,fld.y + 0.2),1.0) *1.35+0.15;
    grayscale(col);
    float roundC = roundCorners(uResolution, vUv, .03);
    gl_FragColor = vec4(col,1.0);

    gl_FragColor.a *= roundC;
  }
  `,
)

extend({ BasicShaderMaterial })

export const Quad = () => {
  const { viewport } = useThree()
  const { width, height } = viewport

  const ref = useRef()

  useFrame((_, delta) => {
    ref.current.material.uniforms.uProgress.value += delta
  })
  return (
    <mesh scale={[width, height, 1]} ref={ref}>
      <planeGeometry args={[1, 1]} />
      <basicShaderMaterial uResolution={new THREE.Vector2(1200, 1200)} />
    </mesh>
  )
}
