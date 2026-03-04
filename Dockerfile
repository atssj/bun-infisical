FROM oven/bun:1.3.10-alpine

LABEL maintainer="S Saha (atssj)"
LABEL description="Bun 1.3.10 with Infisical CLI 0.43.58"

# Install dependencies
RUN apk add --no-cache \
    curl \
    bash \
    sudo \
    wget \
    ca-certificates

# Install Infisical CLI v0.43.58
RUN wget -qO- 'https://artifacts-cli.infisical.com/setup.apk.sh' | sudo sh && \
    apk add infisical=0.43.58

# Verify installations
RUN bun --version && infisical --version

# Set working directory
WORKDIR /app

# Default command
CMD ["bun"]
