# SLV Remote Build with Ansible

This directory contains Ansible playbooks for setting up a remote build server
and compiling SLV on it.

## Overview

The Ansible playbooks in this directory are designed to:

1. Set up a remote Ubuntu server with all the necessary dependencies for
   building SLV
2. Compile SLV on the remote server
3. Upload the compiled artifacts to the storage
4. Copy the artifacts back to the local machine

This approach is particularly useful for heavy compilation tasks that might be
resource-intensive or platform-specific.

## Prerequisites

- Ubuntu 24.04 LTS server with SSH access
- Ansible installed on your local machine
- SSH key for accessing the remote server

## Setup

1. Update the `inventory.yml` file with your server's IP address and SSH key
   path:

```yaml
build_servers:
  hosts:
    build1:
      ansible_host: <YOUR_SERVER_IP>
      ansible_user: ubuntu
      ansible_ssh_private_key_file: ~/.ssh/id_rsa
```

2. Run the setup playbook to install dependencies on the remote server:

```bash
ansible-playbook -i inventory.yml setup-build-server.yml
```

## Usage

### Manual Compilation

To compile SLV manually on the remote server:

```bash
ansible-playbook -i inventory.yml compile-slv.yml \
  -e "version=0.6.0" \
  -e "github_token=YOUR_GITHUB_TOKEN" \
  -e "aws_access_key_id=YOUR_AWS_ACCESS_KEY_ID" \
  -e "aws_secret_access_key=YOUR_AWS_SECRET_ACCESS_KEY"
```

Replace the version and credentials with your own.

### GitHub Actions Integration

The `.github/workflows/slv-remote-build.yml` workflow uses these Ansible
playbooks to automate the build process on GitHub Actions. It requires the
following secrets to be set in your GitHub repository:

- `BUILD_SERVER_SSH_KEY`: The private SSH key for accessing the build server
- `BUILD_SERVER_IP`: The IP address of the build server
- `AWS_ACCESS_KEY_ID`: AWS access key ID for uploading artifacts
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key for uploading artifacts

The workflow can be triggered manually with a specific version or automatically
when a new tag is pushed.

## Playbooks

- `setup-build-server.yml`: Installs all the necessary dependencies on the
  remote server
- `compile-slv.yml`: Clones the repository, compiles the code, and uploads the
  artifacts

## Directory Structure

```
ansible/
├── README.md
├── inventory.yml
├── setup-build-server.yml
└── compile-slv.yml
```
