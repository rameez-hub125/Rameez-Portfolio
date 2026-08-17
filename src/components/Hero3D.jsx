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
      const pulse = 1 + Math.sin(t * 2) * 0.08;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      {/* Outer wireframe icosahedron */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981"
          emissiveIntensity={0.8} wireframe transparent opacity={0.6} />
      </mesh>

      {/* Mid octahedron */}
      <mesh ref={icoRef2}>
        <octahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24"
          emissiveIntensity={0.6} wireframe transparent opacity={0.5} />
      </mesh>

      {/* Inner rotating tetrahedron */}
      <mesh ref={icoRef3}>
        <tetrahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399"
          emissiveIntensity={1} wireframe transparent opacity={0.8} />
      </mesh>

      {/* Glowing pulsing sphere core */}
      <Sphere ref={glowRef} args={[0.55, 32, 32]}>
        <MeshDistortMaterial color="#10b981" emissive="#059669"
          emissiveIntensity={1.5} distort={0.5} speed={3}
          roughness={0} metalness={0.9} transparent opacity={0.9} />
      </Sphere>
    </Float>
  );
}

// ═══════════════════════════════════════════════════════════════
// 3. NEURAL NETWORK — nodes + electric connections
// ═══════════════════════════════════════════════════════════════
function NeuralNetwork() {
  const linesRef = useRef();
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
        <lineBasicMaterial color="#10b981" transparent opacity={0.15} />
      </lineSegments>

      {/* Node spheres */}
      {nodes.map((pos, i) => (
        <NeuralNode key={i} position={pos} index={i} />
      ))}
    </group>
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
function FloatingCodeDust({ count = 50 }) {
  const groupRef = useRef();
  const miniSnippets = ['01', '10', '{}', '=>', '//', '&&', '||', '!=', '==', '[]', '++', '--', '<<', '>>', '**'];

  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      text: miniSnippets[i % miniSnippets.length],
      position: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 35],
      speed: 0.08 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.12 + Math.random() * 0.25,
    })), []);

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

// ═══════════════════════════════════════════════════════════════
// MAIN SCENE
// ═══════════════════════════════════════════════════════════════
export default function Hero3D() {
  const ring1 = CODE_SNIPPETS.filter((_, i) => i % 3 === 0);
  const ring2 = CODE_SNIPPETS.filter((_, i) => i % 3 === 1);
  const ring3 = CODE_SNIPPETS.filter((_, i) => i % 3 === 2);

  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 16], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}>

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[0, 0, 6]} intensity={3} color="#10b981" />
        <pointLight position={[-10, -5, -8]} intensity={2} color="#fbbf24" />
        <pointLight position={[10, 8, 0]} intensity={1} color="#34d399" />

        {/* Starfield */}
        <Stars radius={130} depth={70} count={8000} factor={3} saturation={0} fade speed={0.5} />

        {/* 1. Central morphing geometric core */}
        <MorphingCore />

        {/* 2. Code orbital rings */}
        <CodeOrbitRing radius={5} tilt={0} speed={0.18} snippets={ring1}
          colors={['#10b981', '#34d399', '#6ee7b7']} startAngle={0} />
        <CodeOrbitRing radius={6.8} tilt={Math.PI / 3} speed={-0.13} snippets={ring2}
          colors={['#fbbf24', '#f59e0b', '#fcd34d']} startAngle={Math.PI / 4} />
        <CodeOrbitRing radius={8.5} tilt={Math.PI / 1.5} speed={0.21} snippets={ring3}
          colors={['#34d399', '#10b981', '#a7f3d0']} startAngle={Math.PI / 2} />

        {/* 3. Neural network with electric connections */}
        <NeuralNetwork />

        {/* 4. DNA double helix on the side */}
        <DNAHelix />

        {/* 5. Shooting comets */}
        <ShootingComets count={8} />

        {/* 6. Floating binary code dust */}
        <FloatingCodeDust count={50} />

      </Canvas>
    </div>
  );
}
