`#!/bin/bash`

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
    echo "> Docker ya está instalado."
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
echo "> Listo el pollo."