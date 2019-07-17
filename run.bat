IF exist node_modules/ ( echo node modules installed ) ELSE (CALL npm install)
CALL node index.js