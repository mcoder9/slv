---
id: general-getting-started
title: SLV - Getting Started
description: SLV - Getting Started
---

![SLV](https://storage.slv.dev/SLVogp.jpg)

## The Toolkit for Solana Devs

SLV is a toolkit for Solana developers. It provides a set of tools to help
developers build, test, and deploy Solana Validators and Solana-based
applications.

In the newly revamped slv, you can complete all configurations from a remote
machine—no more direct node logins required. This approach ensures that only
essential packages are installed on the node, leaving behind no unnecessary
clutter. We’ve also introduced Ansible Playbooks & Jinja Template for Linux
configuration, allowing us to manage and migrate multiple validators with
greater efficiency and security.

Additionally, the new SLV always uses a dummy key (an invalid key named
“unstaked-identity.json”) for its initial startup. Once you confirm everything
is running smoothly, you simply set the actual Identity and switch to the active
key. Following this consistent flow helps prevent double votes and ensures
you’re prepared in case the node ever becomes unreachable.

## Dependencies

### OS

MacOS or Linux

※ Please use WSL2 for Windows users.

Download WSL2 For Windows 10
[https://docs.microsoft.com/en-us/windows/wsl/install](https://docs.microsoft.com/en-us/windows/wsl/install)

### Libraries

- Python3 [Install](https://www.python.org/downloads/)
- Ansible [Install](https://docs.ansible.com/ansible/latest/installation_guide/index.html)

## Installation

```bash
curl -fsSL https://storage.slv.dev/slv/install | sh
```

## Deploying Validators

Enter the necessary settings to launch a validator.

```bash
slv v init
```

### Input Server's Default Username

Most of the time, the default username is `ubuntu` or `root`.

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

※ Please set the path to your RSA key. The default path is `~/.ssh/id_rsa`.

```bash
? What's the path to your RSA key? (~/.ssh/id_rsa) › ~/.ssh/id_rsa
🔍 Checking SSH connection...
✔︎ SSH connection succeeded
```

Then SLV will check the connection to the server. If the connection is successful, the next step will be prompted.

### Set the solv user password

Please set the password for the `solv` user of the server.

**8 characters or more, including numbers, uppercase and lowercase letters**

```bash
? Please enter your password › *********
? Please confirm your password › *********
✔︎ Password saved to ~/.slv/config.pwd.yml
```

Encrypted password will be saved to `~/.slv/config.pwd.yml`.
