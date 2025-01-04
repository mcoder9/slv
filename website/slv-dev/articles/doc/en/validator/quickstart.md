---
id: validator-quickstart
title: Solana Validator Quickstart
description: SLV - Solana Validator Quickstart
---

## Firedancer Setup Support (Frankendancer)

```bash
solv setup --firedancer
```

Please update the `VALIDATOR_TYPE` value to `frankendancer` in the `solv4.config.json` file.
`solv start` will automatically read `firedancer.service` instead of `solv.service`.

Firedancer Doc - https://firedancer-io.github.io/firedancer/
