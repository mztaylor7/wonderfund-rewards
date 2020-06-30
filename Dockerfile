#Install the latest node dependency
FROM node:12.16.3

# Set the working directory
WORKDIR /app

# Copy root directory into docker root directory
COPY . .

# Command to run upon mounting image
RUN yarn install
RUN yarn build


# Command to access the bash of the image
CMD ["/bin/bash"]
