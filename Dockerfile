#Install the latest node dependency
FROM node:12.16.3

# Set the working directory
WORKDIR /Workspace/fec-capstone/service

# Copy root directory into docker root directory
COPY ./ ./

# Command to run upon mounting image
RUN npm install
RUN npm run init-server
RUN npm run init-client

# Command to access the bash of the image
CMD ["/bin/bash"]
