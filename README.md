# FAQ
___
> Al correr `bun setup` me tira `/usr/bin/bash: line 1: ./setup.sh: Permission denied`.

Esto es porque `setup.sh` no tiene los permisos de ejecución. Para dárselos hay que correr:
```
$ chmod +x .-setup.sh
```
Es posible que otras carpetas o archivos tambien tengan permisos insuficientes.

**Esto fue arreglado con un script hook de git que corre al clonar el repo:**
```
$ .git/hooks/post-checkout.sh
```
___