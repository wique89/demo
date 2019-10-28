#base image
FROM centos:7

#MAINTAINER
MAINTAINER yunjian.bian@ai-research.cn

WORKDIR /app
COPY . /app/

EXPOSE 9000

RUN curl -sL https://rpm.nodesource.com/setup_11.x | bash - 
RUN yum -y install nodejs
RUN npm install -g n
RUN node -v

ENV DUI afr.duiopen.com

RUN chmod +x /app/start.sh

