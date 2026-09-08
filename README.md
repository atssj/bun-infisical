# sswork/bun-infisical

**Bun runtime with Infisical CLI pre-installed**

A lightweight Docker image combining [Bun](https://bun.sh/) (fast JavaScript runtime) with [Infisical](https://infisical.com/) (secrets management CLI) for secure, modern application deployments.

---

## Registries

This image is available on both Docker Hub and GitHub Container Registry (GHCR):

| Registry | Pull Command |
|----------|-------------|
| Docker Hub | `docker pull sswork/bun-infisical:latest` |
| GHCR | `docker pull ghcr.io/sswork/bun-infisical:latest` |

---

## Tags

| Tag              | Description                    |
| ---------------- | ------------------------------ |
| `latest`         | Most recent stable build       |
| `1.3.10-0.43.58` | Bun 1.3.10 + Infisical 0.43.58 |

---

## Quick Start

```bash
# Pull the image (Docker Hub)
docker pull sswork/bun-infisical:latest

# Or pull from GHCR
docker pull ghcr.io/sswork/bun-infisical:latest

# Run with Infisical
docker run -it sswork/bun-infisical infisical --version

# Run Bun
docker run -it sswork/bun-infisical bun --version
```

---

## Usage

### Dockerfile

```dockerfile
# Use either registry:
FROM sswork/bun-infisical:latest
# or
# FROM ghcr.io/sswork/bun-infisical:latest

WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install

COPY . .

# Use Infisical to inject secrets
CMD ["infisical", "run", "--", "bun", "start"]
```

### Docker Compose

```yaml
version: "3.8"
services:
  app:
    # Use either registry:
    image: sswork/bun-infisical:latest
    # or
    # image: ghcr.io/sswork/bun-infisical:latest
    environment:
      - INFISICAL_TOKEN=${INFISICAL_TOKEN}
    command: infisical run -- bun start
```

---

## Environment Variables

| Variable            | Description                                |
| ------------------- | ------------------------------------------ |
| `INFISICAL_TOKEN`   | Service token for Infisical authentication |
| `INFISICAL_API_URL` | Custom Infisical API URL (optional)        |

---

## Software Versions

| Component     | Version      |
| ------------- | ------------ |
| Bun           | 1.3.10       |
| Infisical CLI | 0.43.58      |
| Base Image    | Alpine Linux |

---

## Why Use This Image?

- **All-in-one**: Bun runtime + secrets management in a single image
- **Lightweight**: Based on Alpine Linux for minimal size
- **Production-ready**: Secure by default with non-root execution support
- **CI/CD friendly**: Perfect for GitHub Actions, GitLab CI, etc.

---

## Development

### Local Development

#### Prerequisites

- Docker Desktop
- Bun v1.4.2 (for package management and script execution)
- hadolint, shellcheck (can be installed via package.json scripts)

#### Install Development Tools

```bash
# Install dependencies using Bun
bun install
```

#### Linting

```bash
# Run all linters
bun run lint

# Run specific linters
bun run lint:dockerfile  # Lint Dockerfile
bun run lint:shell       # Lint shell scripts
bun run lint:js          # Lint JavaScript files
```

#### Formatting

```bash
# Format all files
bun run format

# Check formatting without modifying files
bun run format:check

# Format specific file types
bun run format:yaml
bun run format:json
bun run format:md
```

#### Testing

```bash
# Run all CI checks locally
bun run ci

# Run Docker image tests
bun run test
```

#### Changesets

```bash
# Create a new changeset
bun run changeset

# Version packages (for release)
bun run version
```

---

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Workflow Triggers

- **Pull requests**: Runs linting, formatting checks, and Docker build tests
- **Push to main**: Runs all checks and pushes to GitHub Container Registry
- **Tags**: Creates versioned builds and pushes to GHCR
- **Changesets**: Automated versioning and release management

### CI Checks

- **hadolint**: Dockerfile best practices and security checks
- **shellcheck**: Shell script linting
- **oxlint**: JavaScript file linting
- **oxfmt**: Code formatting verification (YAML, JSON, Markdown, JS)
- **Docker build**: Image build verification
- **Container tests**: Runtime validation of Bun and Infisical CLI

### CI Performance Optimizations

- **Bun v1.4.2**: Fast package management and execution
- **Parallel linting**: Multiple linters run simultaneously
- **Docker layer caching**: Accelerated image builds
- **GitHub Actions cache**: Reusable dependencies across runs

### Local CI Simulation

To simulate the CI pipeline locally:

```bash
# Run the full CI check
bun run ci

# Run individual components
bun run lint
bun run format:check
docker build -t bun-infisical:test .
docker run --rm bun-infisical:test bun --version
docker run --rm bun-infisical:test infisical --version
```

### Changeset Workflow

For versioning and release management:

1. **Create a changeset** when making significant changes:

   ```bash
   bun run changeset
   ```

2. **Commit the changeset** file created in `.changeset/`

3. **Push to main** - the changeset workflow will:
   - Create a release PR with version bumps
   - Update the changelog
   - Generate GitHub release on merge

4. **Docker image** will be automatically rebuilt with new tags

---

## Related Images

- `oven/bun` - Official Bun image
- `infisical/cli` - Official Infisical CLI image

---

## License

MIT - See source repository for details.
