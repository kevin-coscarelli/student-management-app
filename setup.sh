`#!/bin/bash`

docker_volume_check() {
    if docker volume ls | grep -q "$1";
    then
        echo "> El volumen $1 ya existe."
    else
        echo "> Creando volumen $1..."
        docker volume create "$1"
    fi
}

if command -v bun &>/dev/null;
then
    echo "> Bun ya está instalado."
else
    echo "> Instalando Bun..."
    curl -fsSL https://bun.sh/install | bash
fi

if command -v node &>/dev/null;
then
    echo "> Node ya está instalado."
else
    echo "> instalando NodeJS..."
    curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
    sudo apt-get install -y nodejs
fi
if command -v docker &>/dev/null;
then
    echo "> Puede que Docker no esté instalado o \"WSL Integration\" no esté activado en Docker Desktop."
else
    echo "> Descargando imagen más nueva de mongodb/mongodb-community-server ..."
    docker pull mongodb/mongodb-community-server
fi

if [ -f "$(dirname "$0")/server.key" ] && [ -f "$(dirname "$0")/server.crt" ];
then
    echo "> Los archivos de certificados ya existen."
else
    echo "> Generando certificados..."
    ./keygen.sh
fi

docker_volume_check "local_mongo_volume"

echo "> Listo el pollo."
