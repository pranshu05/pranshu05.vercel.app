module.exports = [
    ...require("eslint-config-next/core-web-vitals"),
    {
        rules: {
            "react-hooks/set-state-in-effect": "off",
            "react-hooks/immutability": "off",
            "react-hooks/preserve-manual-memoization": "off",
        },
    },
];