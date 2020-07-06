set -e

mkdir -p public/lib
cp node_modules/three/build/three.module.js public/build/three.module.js
cp node_modules/three/examples/jsm/controls/OrbitControls.js public/build/OrbitControls.js
