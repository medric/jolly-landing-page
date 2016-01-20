# Dockerfile for jolly landing page
# VERSION 1.0
FROM dockerfile/ubuntu
MAINTAINER medric&mlazzje

# Update repos
RUN apt-get update

# Install supervisor
RUN apt-get install -y supervisor

# Install nodejs and dependencies
RUN apt-get install -y python-software-properties python g++ make
RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get install -y nodejs

# Install redis
RUN apt-get install -y redis-server

# Add Node.js installation to PATH
ENV PATH $PATH:/nodejs/bin

# Bundle app source
WORKDIR /app

# Set ENV Variable for node config
ENV NODE_ENV production

ADD package.json /app/

# Install app dependencies
RUN cd /app; npm install

# Add app source
ADD . /app

EXPOSE 8080

ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["/usr/bin/supervisord"]
