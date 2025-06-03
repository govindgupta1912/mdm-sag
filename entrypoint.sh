 #!/bin/sh

cat <<EOF > /usr/share/nginx/html/env.js
window._env_ = {
  VITE_API_BASE_URL: "${VITE_API_BASE_URL}"
};
EOF

exec "$@"
