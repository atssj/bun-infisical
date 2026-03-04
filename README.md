# sswork/bun-infisical

**Bun runtime with Infisical CLI pre-installed**

A lightweight Docker image combining [Bun](https://bun.sh/) (fast JavaScript runtime) with [Infisical](https://infisical.com/) (secrets management CLI) for secure, modern application deployments.

---

## Tags

| Tag | Description |
|-----|-------------|
| `latest` | Most recent stable build |
| `1.3.10-0.43.58` | Bun 1.3.10 + Infisical 0.43.58 |

---

## Quick Start

```bash
# Pull the image
docker pull sswork/bun-infisical:latest

# Run with Infisical
docker run -it sswork/bun-infisical infisical --version

# Run Bun
docker run -it sswork/bun-infisical bun --version
```

---

## Usage

### Dockerfile

```dockerfile
FROM sswork/bun-infisical:latest

WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install

COPY . .

# Use Infisical to inject secrets
CMD ["infisical", "run", "--", "bun", "start"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    image: sswork/bun-infisical:latest
    environment:
      - INFISICAL_TOKEN=${INFISICAL_TOKEN}
    command: infisical run -- bun start
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `INFISICAL_TOKEN` | Service token for Infisical authentication |
| `INFISICAL_API_URL` | Custom Infisical API URL (optional) |

---

## Software Versions

| Component | Version |
|-----------|---------|
| Bun | 1.3.10 |
| Infisical CLI | 0.43.58 |
| Base Image | Alpine Linux |

---

## Why Use This Image?

- **All-in-one**: Bun runtime + secrets management in a single image
- **Lightweight**: Based on Alpine Linux for minimal size
- **Production-ready**: Secure by default with non-root execution support
- **CI/CD friendly**: Perfect for GitHub Actions, GitLab CI, etc.

---

## Related Images

- `oven/bun` - Official Bun image
- `infisical/cli` - Official Infisical CLI image

---

## License

MIT - See source repository for details.
