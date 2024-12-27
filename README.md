<p align="center">
  <a href="">
    <img src="https://storage.slv.dev/SLVogp.jpg" alt="SLV" />
  </a>

<a href="https://twitter.com/intent/follow?screen_name=ValidatorsDAO">
    <img src="https://img.shields.io/twitter/follow/ValidatorsDAO.svg?label=Follow%20@ValidatorsDAO" alt="Follow @ValidatorsDAO" />
  </a>
  <br/>
  <!-- <a aria-label="npm version" href="https://www.npmjs.com/package/@epics-dao/solv">
    <img alt="" src="https://badgen.net/npm/v/@epics-dao/solv">
  </a>
  <a aria-label="Downloads Number" href="https://www.npmjs.com/package/@epics-dao/solv">
    <img alt="" src="https://badgen.net/npm/dt/@epics-dao/solv">
  </a> -->
  <a aria-label="License" href="https://github.com/ValidatorsDAO/slv/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/ValidatorsDAO/slv/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

## The Toolkit for Solana Devs

SLV is a toolkit for Solana developers. It provides a set of tools to help
developers build, test, and deploy Solana Validatros and Solana-based
applications.

## Dependencies

- OS MacOS or Linux

※ Please use WSL2 for Windows users.

slv Install script will install the following dependencies.

- Python3 [https://www.python.org/downloads/](https://www.python.org/downloads/)
- Ansible [https://docs.ansible.com](https://docs.ansible.com/)

Please install the following dependencies manually if install script fails.

## Installation

Install slv CLI

```bash
curl -fsSL https://storage.slv.dev/slv/install | sh
```

## Deploy Solana Validator Testnet with Firedancer

You must have Ubuntu 24.04 LTS clean installed on your server.

This command will prompt you to provide necessary information to deploy.

New slv Deployment is always use `unstaked-keypair.json` for the identity key.
This is the best practice to avoid double voting, and etc.

So Please make sure to set the aurhorized identity key with `identity.json`
after the deployment.

### Input Server's Default Username

Most of the time, the default username is `ubuntu`.

```bash
slv v init
? What's the user for the server? (ubuntu) › ubuntu
```

### Input Server's IP Address

Input the IP address of the server.

```bash
? What's the IP address of the server? ›
```

### Set RSA Key for SSH

※ Please set the path to your RSA key. The default path is `~/.ssh/id_rsa`. ※
Currently, only the default path is supported.Please set the path to your RSA
key. The default path is `~/.ssh/id_rsa`.

```bash
? What's the path to your RSA key? (~/.ssh/id_rsa) › ~/.ssh/id_rsa
🔍 Checking SSH connection...
✔︎ SSH connection succeeded
```

Then slv will check the connection to the server. If the connection is
successful, the next step will be prompted.

### Set the solv user password

Please set the password for the `solv` user of the server.

**8 characters or more, including numbers, uppercase and lowercase letters**

```bash
? Please enter your password › *********
? Please confirm your password › *********
✔︎ Password saved to ~/.slv/config.pwd.yml
```

Encrypted password will be saved to `~/.slv/config.pwd.yml`.

### Select the Solana Network

Select the Solana Network you want to deploy. ※ Currently, only the testnet is
supported.

```bash
? Select Solana Network (testnet)
❯ testnet
  mainnet
```

### Generate or Set the Solana Validator Identity

You can generate a new identity key or set an existing identity key. This
example shows how to set an existing identity key.

```bash
? Do you want to create a new identity key now? (Y/n) › No
? Please Enter Your Identity Public Key › EjDwu2Czy8eWEYRuNwtjniYks47Du3KNJ6JY9rs3aFSV
⚠️ Please place your identity key in 
        
  ~/.slv/keys/EjDwu2Czy8eWEYRuNwtjniYks47Du3KNJ6JY9rs3aFSV.json
.
.
✔︎ Success
✔ Inventory updated to ~/.slv/inventory.yml
✔ Successfully created solv user on x.x.x.x
```

Please place your identity key in `~/.slv/keys/<your-pubkey>.json`. Then, slv
will create solv user with your password.

### Generate or Set the Solana Vote Account

You can generate a new vote account key or set an existing vote account key.
This example shows how to set an existing vote account key.

```bash
? Do you want to create a new vote account key now? (Y/n) › No
? Please Enter Your Vote Account Public Key > <your-vote-account>
⚠️ Please place your voteAccount pubkey in 
        
  ~/.slv/keys/<your-vote-account>.json
```

Please place your vote account key in `~/.slv/keys/<your-vote-account>.json`.

### Set Your Authority Public Key

Please input your authority public key. This key is used to withdraw rewards
from the vote account.

```bash
? Please Enter Your Vote Account's Authrority Key › <your-authority-pubkey>
✔︎ Validator testnet config saved to /Users/fumi/.slv/config.validator.testnet.yml
```

### Confirm the Configuration and Deploy

Once you confirm the configuration, the deployment will start.

```bash
Your Testnet Validators Settings:
┌────────────────┬──────────────────────────────────────────────┐
│ Identity Key   │ EjDwu2Czy8eWEYRuNwtjniYks47Du3KNJ6JY9rs3aFSV │
├────────────────┼──────────────────────────────────────────────┤
│ Vote Key       │ EwoVPLUhdhm722e7QWk8GMQ43917qRXiC9HFyefEMiSV │
├────────────────┼──────────────────────────────────────────────┤
│ Authority Key  │ EcT4NsMPwxanusdy3dza5nznqwuKo9Pz3GzW5GPD32SV │
├────────────────┼──────────────────────────────────────────────┤
│ IP             │ x.x.x.x                                      │
├────────────────┼──────────────────────────────────────────────┤
│ Validator Type │ firedancer                                   │
├────────────────┼──────────────────────────────────────────────┤
│ Version        │ 0.302.20104                                  │
└────────────────┴──────────────────────────────────────────────┘
Now you can deploy with:

$ slv v deploy -n testnet
```

All set! You can deploy the Solana Validator with the following command.

```bash
slv v deploy -n testnet
```

It's done! Your Solana Validator is now deployed. It will take some time to
catch up with the Solana network.

Next, You need to change the identity key from the unstaked key to the
authorized identity key.

### Change the Identity Key from Unstaked Key to Authorized Identity Key

After the deployment, you need to change the identity key from the unstaked key

to the authorized identity key.

```bash
slv v set:identity -n testnet --pubkey <your-identity-pubkey>
```

Then, the identity key will be changed to the authorized identity key. This
command will stop firedancer, change the identity key, and restart the
firedancer.

※ Nodowntime Migration is not available with Firedancer yet. We will updated as
soon as it's available.

### Restart Firedancer

If you have any issues with the validator, you can restart the firedancer with
the following command.

If you use the `--rm` option, the validator will be stopped and removed ledger
and snapshot dirs, and Download Snapshot with the snapshot finder and start the
validator.

```bash
slv v restart -n testnet --pubkey <your-identity-pubkey> --rm
```

### Community Support

If you have any questions or need help, please join our Discord community.

[Validators DAO Discord](https://discord.gg/X4BgkBHavp)

## Roadmap

- [] Add `slv rpc init` for Solana RPC Build (in progress)
- [x] Add `slv validator init` for Solana Validator Deploy (in progress)
- [] Add `slv validator setup --relayer` for Solana Validator Relayer Build (in
  progress)
- [] Add `slv validator setup --shredstream` for ShredStream Node Build (in
  progress)
- [] add `slv validator migrate` for Solana Validator Migration from `solv4` (in
  progress)
- [] Add CI/CD pipeline (Github Actions) for `slv` Release (in progress)
- [] Add `slv bot` for gRPC Geyser Client (in progress)
- [] Add `slv swap` for Solana Token Swap (in progress)
- [] Add `slv cloud` for configuring Solana App on Cloud (in progress)
- [] Add `slv app` for Solana App Development (in progress)
- [] Add `slv app create --blinks` for Solana Blinks App Development (in
  progress)
- [] Add `slv ai` Fine-tuning AI Models for Solana Validator/RPC Debugging (in
  progress)
- [] Add `test` for keeping the codebase stable (in progress)

## For Developers

Install Deno

```bash
curl -fsSL https://deno.land/install.sh | sh
```

Run slv CLI

```bash
git clone https://github.com/ValidatorsDAO/slv.git
deno task dev --help
```

Run Build

```bash
deno task build
```

Run Test

```bash
deno test -A
```

## elSOL - Solana Liquid Staking Token (LST)

✨ The elSOL pool is simple. ✨

The elSOL staking pool exclusively includes validators with;

✅ - 0% vote commission

✅ - 0% Jito MEV commission

Plus, elSOL offers;

✅ - 0% pool management fee,

For enhanced security, we have set

Sol Withdrawal Fee & Stake Withdrawal Fee of 0.10%.

This fee helps prevent misuse and ensures the stability and reliability of the
service, safeguarding both the system and our users.

thus, elSOL offers higher True APY in long-term staking.

website: [https://elsol.app](https://elsol.app)

## Enhanced Solana RPC

The Enhanced Solana RPC is a high-performance Solana RPC API service that
provides a reliable and scalable infrastructure for Solana developers and
validators.

- New! Geyser gRPC Connection Free Trial is now available!

website: [https://erpc.validators.solutions](https://erpc.validators.solutions)

## Contributing

Bug reports and pull requests are welcome on GitHub at
https://github.com/ValidatorsDAO/slv This project is intended to be a safe,
welcoming space for collaboration, and contributors are expected to adhere to
the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Dependencies for Development

- deno 2.x.x

## License

The package is available as open source under the terms of the
[Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the solv project’s codebases, issue trackers, chat rooms
and mailing lists is expected to follow the
[code of conduct](https://github.com/ValidatorsDAO/slv/blob/master/CODE_OF_CONDUCT.md).
