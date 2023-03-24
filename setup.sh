`#!/bin/bash`
node_version="$(node -v)"
bun_version="$(bun -v)"
docker_version="$(docker -v)"

if [ -z "$bun_version" ]
then
    echo "Instalando Bun..."
    curl -fsSL https://bun.sh/install | bash
else
    echo "Bun ya está instalado."
fi

if [ -z "$node_version" ]
then
    echo "instalando NodeJS..."
    curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
    sudo apt-get install -y nodejs
else
    echo "Node ya está instalado."
fi
if [ -z "$docker_version"]
then
    echo "Descargando imagen más nueva de mongodb/mongodb-community-server ..."
    docker pull mongodb/mongodb-community-server
else
    echo "Puede que Docker no esté instalado o \"WSL Integration\" no esté activado en Docker Desktop."
echo "Listo el pollo."