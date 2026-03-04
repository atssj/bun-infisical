FROM oven/bun:1.3.10-alpine

LABEL maintainer="Your Name"
LABEL description="Bun 1.3.10 with Infisical CLI 0.43.58"

# Install dependencies
RUN apk add --no-cache \
    curl \
    bash \
    ca-certificates

# Install Infisical CLI v0.43.58
RUN curl -1sLf \
    'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.alpine.sh' \
    | bash && \
    apk add infisical=0.43.58

# Verify installations
RUN bun --version && infisical --version

# Set working directory
WORKDIR /app

# Default command
CMD ["bun"]
