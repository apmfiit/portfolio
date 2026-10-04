# FTP certificate chain

`globalsign-alphassl-r6-2025.pem` is the public GlobalSign GCC R6 AlphaSSL CA
2025 intermediate certificate, not a private key or a server certificate.

Source: https://support.globalsign.com/ssl/products/alphassl/alphassl-root-and-intermediate-certificates

SHA-1 identifier published by GlobalSign: `431955e6e5dabe857f1336c02368e5495f143eed`.
Expires 21 May 2027. Recheck this file when REG.RU rotates its FTP certificate.

On 5 October 2026, `server45.hosting.reg.ru:21` sent only its leaf certificate.
The workflow verifies this intermediate against the runner's existing root
store, then adds it to a temporary CA bundle used only by lftp. Certificate
verification and hostname verification remain enabled. No machine-wide trust
store is modified.
