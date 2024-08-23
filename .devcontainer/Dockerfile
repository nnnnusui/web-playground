ARG VARIANT="22"
FROM node:${VARIANT}

# Install apps
RUN apt update -y
RUN apt install -y git
RUN npm install -g pnpm
RUN npm install -g plop

# Build workspace
ARG workspace
WORKDIR "${workspace}"

# Set environment
RUN git config --system commit.template "${workspace}/.gitmessage"
