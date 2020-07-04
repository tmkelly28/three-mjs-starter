set -e

mkdir -p public/lib
cp node_modules/three/build/three.min.js public/lib/three.min.js
cp node_modules/three/examples/js/controls/OrbitControls.js public/lib/OrbitControls.js
