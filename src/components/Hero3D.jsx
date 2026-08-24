import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Text, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// ─── Code snippets for orbital rings ──────────────────────────
const CODE_SNIPPETS = [
  'const ai = new Model()',  'import tensorflow as tf',
  'def train(epochs=100):',  'model.fit(X_train)',
  '<div className="neural">','optimizer.step()',
  'loss.backward()',         'for epoch in range(n):',
  'relu(x) = max(0, x)',    'return predictions',
  'async function predict()','const [data, setData]',
  'model.compile()',         'torch.no_grad()',
  'arr.map(x => x * w)',    'if accuracy > 0.95:',
  'layer.Dense(128)',        'useEffect(() => {',
  'export default App',      'SELECT * FROM data',
  'Conv2D(64, (3,3))',       'MaxPooling2D()',
  'confusion_matrix()',      'accuracy_score()',
  'model.evaluate()',        'X_train, y_train',
  'sigmoid(z)=1/(1+e^-z)',  'Flatten() → Dense()',
];

// ═══════════════════════════════════════════════════════════════
// 1. CODE ORBITAL RINGS
// ═══════════════════════════════════════════════════════════════
function CodeOrbitRing({ radius, tilt, speed, snippets, colors, startAngle = 0 }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current)
      groupRef.current.rotation.y = state.clock.getElapsedTime() * speed + startAngle;
  });
  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      {snippets.map((snippet, i) => {
        const angle = (i / snippets.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const color = colors[i % colors.length];
        return (
          <Text key={snippet + i} position={[x, 0, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
            fontSize={0.2} color={color} anchorX="center" anchorY="middle"
            letterSpacing={0.02} fillOpacity={0.9}
            outlineWidth={0.003} outlineColor={color}>
            {snippet}
          </Text>
        );
      })}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// 2. CENTRAL MORPHING CORE — pulsing icosahedron + inner orb
// ═══════════════════════════════════════════════════════════════
function MorphingCore() {
  const icoRef = useRef();
  const icoRef2 = useRef();
  const icoRef3 = useRef();
  const glowRef = useRef();
  const matRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.4;
      icoRef.current.rotation.y = t * 0.6;
    }
    if (icoRef2.current) {
      icoRef2.current.rotation.x = -t * 0.3;
      icoRef2.current.rotation.z = t * 0.5;
    }
    if (icoRef3.current) {
      icoRef3.current.rotation.y = -t * 0.7;
      icoRef3.current.rotation.z = t * 0.2;
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 2.5) * 0.12;
      glowRef.current.scale.setScalar(pulse);
    }

    // Dynamic HSL color cycling for inner orb
    if (matRef.current) {
      const hue = (t * 0.08) % 1; // Cycle through colors
      const color = new THREE.Color().setHSL(hue, 0.9, 0.5);
      const emissive = new THREE.Color().setHSL(hue, 0.9, 0.4);
      matRef.current.color = color;
      matRef.current.emissive = emissive;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      {/* Outer wireframe icosahedron */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981"
          emissiveIntensity={1} wireframe transparent opacity={0.75} />
      </mesh>

      {/* Mid octahedron */}
      <mesh ref={icoRef2}>
        <octahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24"
          emissiveIntensity={0.8} wireframe transparent opacity={0.65} />
      </mesh>

      {/* Inner rotating tetrahedron */}
      <mesh ref={icoRef3}>
        <tetrahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4"
          emissiveIntensity={1.2} wireframe transparent opacity={0.85} />
      </mesh>

      {/* Glowing pulsing sphere core with dynamic HSL color shift */}
      <Sphere ref={glowRef} args={[0.55, 32, 32]}>
        <MeshDistortMaterial ref={matRef} color="#10b981" emissive="#059669"
          emissiveIntensity={2} distort={0.55} speed={4}
          roughness={0} metalness={0.9} transparent opacity={0.9} />
      </Sphere>
    </Float>
  );
}

// ═══════════════════════════════════════════════════════════════
// 3. NEURAL NETWORK — nodes + electric connections
// ═══════════════════════════════════════════════════════════════
function NeuralNetwork() {
  const groupRef = useRef();

  const { nodes, connections } = useMemo(() => {
    const nodeCount = 30;
    const nodePositions = Array.from({ length: nodeCount }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 22,
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 16,
    ));

    // Connect nodes within distance threshold
    const conns = [];
    const threshold = 8;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < threshold) {
          conns.push([i, j]);
        }
      }
    }
    return { nodes: nodePositions, connections: conns };
  }, []);

  // Build line geometry once
  const linePositions = useMemo(() => {
    const arr = [];
    connections.forEach(([i, j]) => {
      arr.push(nodes[i].x, nodes[i].y, nodes[i].z);
      arr.push(nodes[j].x, nodes[j].y, nodes[j].z);
    });
    return new Float32Array(arr);
  }, [nodes, connections]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#10b981" transparent opacity={0.2} />
      </lineSegments>

      {/* Node spheres */}
      {nodes.map((pos, i) => (
        <NeuralNode key={i} position={pos} index={i} />
      ))}

      {/* Active AI Signal Pulses along connections */}
      {connections.slice(0, 15).map(([i, j], idx) => (
        <NeuralSignalPulse
          key={`pulse-${idx}`}
          startNode={nodes[i]}
          endNode={nodes[j]}
          speed={0.3 + (idx % 4) * 0.15}
          color={idx % 3 === 0 ? '#10b981' : idx % 3 === 1 ? '#fbbf24' : '#06b6d4'}
        />
      ))}
    </group>
  );
}

function NeuralSignalPulse({ startNode, endNode, speed, color }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      const t = (state.clock.getElapsedTime() * speed) % 1;
      meshRef.current.position.lerpVectors(startNode, endNode, t);
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0.9} />
    </mesh>
  );
}

function NeuralNode({ position, index }) {
  const ref = useRef();
  const speed = 0.5 + (index % 5) * 0.2;
  const phase = index * 0.5;

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + phase;
    if (ref.current) {
      ref.current.material.emissiveIntensity = 0.5 + Math.sin(t) * 0.5;
      ref.current.scale.setScalar(0.7 + Math.sin(t * 1.3) * 0.3);
    }
  });

  const color = index % 3 === 0 ? '#10b981' : index % 3 === 1 ? '#fbbf24' : '#34d399';

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.09, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════
// 4. DNA DOUBLE HELIX
// ═══════════════════════════════════════════════════════════════
function DNAHelix() {
  const groupRef = useRef();
  const strandCount = 28;
  const helixRadius = 1.2;
  const helixHeight = 14;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  const strands = useMemo(() => {
    const result = [];
    for (let i = 0; i < strandCount; i++) {
      const t = (i / strandCount) * Math.PI * 4; // 2 full turns
      const y = (i / strandCount) * helixHeight - helixHeight / 2;

      // Strand A
      result.push({
        id: `a-${i}`, strand: 'a',
        position: [Math.cos(t) * helixRadius, y, Math.sin(t) * helixRadius],
        color: '#10b981', phase: t,
      });
      // Strand B (offset by π)
      result.push({
        id: `b-${i}`, strand: 'b',
        position: [Math.cos(t + Math.PI) * helixRadius, y, Math.sin(t + Math.PI) * helixRadius],
        color: '#fbbf24', phase: t + 1,
      });
      // Cross-bridge between strands
      if (i % 3 === 0) {
        result.push({
          id: `bridge-${i}`, strand: 'bridge',
          posA: [Math.cos(t) * helixRadius, y, Math.sin(t) * helixRadius],
          posB: [Math.cos(t + Math.PI) * helixRadius, y, Math.sin(t + Math.PI) * helixRadius],
        });
      }
    }
    return result;
  }, []);

  // Build bridge geometry
  const bridgePositions = useMemo(() => {
    const arr = [];
    strands.filter(s => s.strand === 'bridge').forEach(s => {
      arr.push(...s.posA, ...s.posB);
    });
    return new Float32Array(arr);
  }, [strands]);

  return (
    <group ref={groupRef} position={[-11, 0, -4]}>
      {/* Node orbs */}
      {strands.filter(s => s.strand !== 'bridge').map(s => (
        <DNAOrb key={s.id} position={s.position} color={s.color} phase={s.phase} />
      ))}
      {/* Cross bridges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[bridgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#34d399" transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

function DNAOrb({ position, color, phase }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() + phase;
      ref.current.material.emissiveIntensity = 0.5 + Math.abs(Math.sin(t * 0.8)) * 1.5;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.12, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════
// 5. SHOOTING COMETS
// ═══════════════════════════════════════════════════════════════
function ShootingComets({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Comet key={i} index={i} />
      ))}
    </>
  );
}

function Comet({ index }) {
  const meshRef = useRef();
  const trailRef = useRef();

  const config = useMemo(() => ({
    speed: 4 + Math.random() * 6,
    startX: (Math.random() - 0.5) * 40,
    startY: 10 + Math.random() * 8,
    startZ: (Math.random() - 0.5) * 20,
    dirX: (Math.random() - 0.5) * 2,
    dirZ: (Math.random() - 0.5) * 2,
    delay: index * 1.8,
    color: index % 2 === 0 ? '#10b981' : '#fbbf24',
  }), [index]);

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() + config.delay) % 5;
    if (meshRef.current) {
      meshRef.current.position.set(
        config.startX + config.dirX * t * config.speed,
        config.startY - t * config.speed,
        config.startZ + config.dirZ * t * config.speed,
      );
      // Fade in/out
      const fade = t < 0.3 ? t / 0.3 : t > 4 ? 1 - (t - 4) : 1;
      meshRef.current.material.opacity = fade * 0.9;
    }
    if (trailRef.current) {
      const t2 = (state.clock.getElapsedTime() + config.delay + 0.05) % 5;
      trailRef.current.position.set(
        config.startX + config.dirX * t2 * config.speed,
        config.startY - t2 * config.speed,
        config.startZ + config.dirZ * t2 * config.speed,
      );
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={config.color} emissive={config.color}
          emissiveIntensity={3} transparent opacity={0.9} />
      </mesh>
      <mesh ref={trailRef} scale={[0.3, 2, 0.3]}>
        <sphereGeometry args={[0.15, 4, 4]} />
        <meshStandardMaterial color={config.color} emissive={config.color}
          emissiveIntensity={1} transparent opacity={0.2} />
      </mesh>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// 6. FLOATING BINARY PARTICLES
// ═══════════════════════════════════════════════════════════════
const miniSnippets = ['01', '10', '{}', '=>', '//', '&&', '||', '!=', '==', '[]', '++', '--', '<<', '>>', '**'];

function FloatingCodeDust({ count = 50 }) {
  const groupRef = useRef();

  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      text: miniSnippets[i % miniSnippets.length],
      position: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 35],
      speed: 0.08 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.12 + Math.random() * 0.25,
    })), [count]);

  useFrame((state) => {
    if (groupRef.current)
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <DriftText key={i} {...p} />
      ))}
    </group>
  );
}

function DriftText({ text, position, speed, phase, opacity }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed + phase;
      ref.current.position.y = position[1] + Math.sin(t) * 2;
      ref.current.material.opacity = opacity * (0.4 + 0.6 * Math.abs(Math.sin(t * 0.6)));
    }
  });
  return (
    <Text ref={ref} position={position} fontSize={0.16}
      color="#10b981" fillOpacity={opacity} anchorX="center" anchorY="middle">
      {text}
    </Text>
  );
}

function DynamicLights() {
  const light1 = useRef();
  const light2 = useRef();
  const light3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.8) * 12;
      light1.current.position.y = Math.cos(t * 0.6) * 8;
      light1.current.position.z = Math.sin(t * 0.5) * 6;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.7) * -14;
      light2.current.position.y = Math.sin(t * 0.9) * -10;
      light2.current.position.z = Math.cos(t * 0.4) * 8;
    }
    if (light3.current) {
      light3.current.position.x = Math.sin(t * 0.5) * -10;
      light3.current.position.y = Math.cos(t * 0.8) * 8;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight ref={light1} intensity={5} color="#10b981" distance={30} />
      <pointLight ref={light2} intensity={4.5} color="#fbbf24" distance={30} />
      <pointLight ref={light3} intensity={4} color="#06b6d4" distance={30} />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// 7. INTERACTIVE CAMERA PARALLAX RIG
// ═══════════════════════════════════════════════════════════════
function InteractiveCameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 2.8, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 2.8, 0.04);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// ═══════════════════════════════════════════════════════════════
// 8. QUANTUM CYBER WAVE GRID
// ═══════════════════════════════════════════════════════════════
function CyberGridWave() {
  const meshRef = useRef();
  const gridGeom = useMemo(() => new THREE.PlaneGeometry(45, 45, 35, 35), []);

  useFrame((state) => {
    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position;
      const t = state.clock.getElapsedTime();
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const z = Math.sin(u * 0.3 + t * 1.4) * Math.cos(v * 0.3 + t * 1.4) * 0.7;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -9.5, -4]}>
      <primitive object={gridGeom} attach="geometry" />
      <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.6} wireframe transparent opacity={0.22} />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════
// 9. MOUSE CURSOR SPOTLIGHT
// ═══════════════════════════════════════════════════════════════
function MouseCursorSpotlight() {
  const lightRef = useRef();
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = state.pointer.x * 14;
      lightRef.current.position.y = state.pointer.y * 9;
      lightRef.current.position.z = 7;
    }
  });
  return <pointLight ref={lightRef} intensity={7} color="#34d399" distance={20} />;
}

// ═══════════════════════════════════════════════════════════════
// 10. FLOATING CYBER DATA CUBES
// ═══════════════════════════════════════════════════════════════
function FloatingCyberCubes() {
  const cubes = useMemo(() => [
    { pos: [11.5, 4.5, -2], color: '#10b981', scale: 0.75, speed: 0.4 },
    { pos: [-12.5, -4, -3], color: '#fbbf24', scale: 0.65, speed: 0.3 },
    { pos: [12, -5.5, 2], color: '#06b6d4', scale: 0.6, speed: 0.5 },
    { pos: [-10.5, 5, 1], color: '#a855f7', scale: 0.7, speed: 0.35 },
  ], []);

  return (
    <>
      {cubes.map((c, i) => (
        <CyberCube key={i} {...c} />
      ))}
    </>
  );
}

function CyberCube({ pos, color, scale, speed }) {
  const groupRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (groupRef.current) {
      groupRef.current.rotation.x = t * 0.8;
      groupRef.current.rotation.y = t * 1.2;
      groupRef.current.position.y = pos[1] + Math.sin(t * 1.5) * 0.5;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.6}>
      <group ref={groupRef} position={pos} scale={scale}>
        <mesh>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} wireframe transparent opacity={0.6} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} />
        </mesh>
      </group>
    </Float>
  );
}

// ═══════════════════════════════════════════════════════════════
// 11. HOLOGRAPHIC MATRIX CODE RAIN
// ═══════════════════════════════════════════════════════════════
const MATRIX_CHARS = ['0', '1', '101', '010', 'AI', 'ML', 'fit()', 'def', 'var', '=>', '{}', '[]', 'tf', 'cv2'];

function MatrixCodeRain({ count = 22 }) {
  const columns = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 48,
      z: -4 - Math.random() * 18,
      speed: 2.2 + Math.random() * 3.5,
      chars: Array.from({ length: 5 }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]),
      delay: Math.random() * 6,
      color: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#fbbf24' : '#06b6d4',
    })), [count]);

  return (
    <>
      {columns.map((col, i) => (
        <MatrixColumn key={i} {...col} />
      ))}
    </>
  );
}

function MatrixColumn({ x, z, speed, chars, delay, color }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() + delay) * speed;
    if (groupRef.current) {
      groupRef.current.position.y = 16 - (t % 32);
    }
  });

  return (
    <group ref={groupRef} position={[x, 16, z]}>
      {chars.map((ch, idx) => (
        <Text
          key={idx}
          position={[0, -idx * 0.75, 0]}
          fontSize={0.2}
          color={color}
          fillOpacity={Math.max(0.1, 0.85 - idx * 0.16)}
          anchorX="center"
          anchorY="middle"
        >
          {ch}
        </Text>
      ))}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// 12. HOLOGRAPHIC ENERGY PULSE SHOCKWAVES
// ═══════════════════════════════════════════════════════════════
function HolographicEnergyPulse() {
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Wave 1
    const s1 = (t * 1.4) % 4.5;
    if (ringRef1.current) {
      ringRef1.current.scale.set(s1 * 2.2, s1 * 2.2, s1 * 2.2);
      ringRef1.current.material.opacity = Math.max(0, 1 - s1 / 4.5) * 0.45;
    }

    // Wave 2 (offset)
    const s2 = ((t + 2.25) * 1.4) % 4.5;
    if (ringRef2.current) {
      ringRef2.current.scale.set(s2 * 2.2, s2 * 2.2, s2 * 2.2);
      ringRef2.current.material.opacity = Math.max(0, 1 - s2 / 4.5) * 0.45;
    }
  });

  return (
    <>
      <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.02, 64]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringRef2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <ringGeometry args={[0.9, 1.02, 64]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN SCENE
// ═══════════════════════════════════════════════════════════════
export default function Hero3D() {
  const ring1 = CODE_SNIPPETS.filter((_, i) => i % 4 === 0);
  const ring2 = CODE_SNIPPETS.filter((_, i) => i % 4 === 1);
  const ring3 = CODE_SNIPPETS.filter((_, i) => i % 4 === 2);
  const ring4 = CODE_SNIPPETS.filter((_, i) => i % 4 === 3);

  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 16], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}>

        {/* 3D Mouse Parallax Rig */}
        <InteractiveCameraRig />

        {/* Interactive Mouse Spotlight */}
        <MouseCursorSpotlight />

        {/* Dynamic Orbiting Lights */}
        <DynamicLights />

        {/* Starfield */}
        <Stars radius={130} depth={70} count={8000} factor={3} saturation={0} fade speed={0.5} />

        {/* 1. Central morphing geometric core */}
        <MorphingCore />

        {/* 2. Holographic Shockwave Energy Pulses */}
        <HolographicEnergyPulse />

        {/* 3. Code orbital rings */}
        <CodeOrbitRing radius={4.8} tilt={0} speed={0.18} snippets={ring1}
          colors={['#10b981', '#34d399', '#6ee7b7']} startAngle={0} />
        <CodeOrbitRing radius={6.5} tilt={Math.PI / 3} speed={-0.13} snippets={ring2}
          colors={['#fbbf24', '#f59e0b', '#fcd34d']} startAngle={Math.PI / 4} />
        <CodeOrbitRing radius={8.2} tilt={Math.PI / 1.5} speed={0.21} snippets={ring3}
          colors={['#06b6d4', '#22d3ee', '#67e8f9']} startAngle={Math.PI / 2} />
        <CodeOrbitRing radius={10.0} tilt={-Math.PI / 4} speed={-0.16} snippets={ring4}
          colors={['#a855f7', '#c084fc', '#e879f9']} startAngle={Math.PI / 3} />

        {/* 4. Neural network with electric connections */}
        <NeuralNetwork />

        {/* 5. DNA double helix on the side */}
        <DNAHelix />

        {/* 6. Shooting comets */}
        <ShootingComets count={8} />

        {/* 7. Floating binary code dust */}
        <FloatingCodeDust count={50} />

        {/* 8. Quantum Cyber Wave Grid */}
        <CyberGridWave />

        {/* 9. Floating Holographic Data Cubes */}
        <FloatingCyberCubes />

        {/* 10. 3D Matrix Code Rain Streams */}
        <MatrixCodeRain count={22} />

      </Canvas>
    </div>
  );
}
