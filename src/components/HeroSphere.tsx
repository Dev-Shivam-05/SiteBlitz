import { useRef, Component, ReactNode, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 100, 100]} scale={2.2}>
      <MeshDistortMaterial
        color="#0066FF"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
        emissive="#0066FF"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function CSSFallbackSphere() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="fallback-sphere animate-pulse-soft" />
    </div>
  );
}

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return false;
    const ext = gl as WebGLRenderingContext;
    if (!ext) return false;
    return true;
  } catch {
    return false;
  }
}

export function HeroSphere() {
  const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    setWebGLAvailable(checkWebGLSupport());
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {webGLAvailable === true ? (
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
          <WebGLErrorBoundary fallback={<CSSFallbackSphere />}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.2} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#0066FF" />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#7c3aed" />
              <AnimatedSphere />
            </Canvas>
          </WebGLErrorBoundary>
        </div>
      ) : (
        <CSSFallbackSphere />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.08)_0%,transparent_70%)]" />
    </div>
  );
}
