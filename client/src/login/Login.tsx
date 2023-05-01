import { Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core"
//@ts-expect-error
import cloudsImg from "../../assets/clouds.jpg"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const outerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexWrap: 'wrap',
        backgroundImage: `linear-gradient(to right, #005F8F 0%,#FFD2FF 99%), url(${cloudsImg})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'screen'
    }

    const onButtonClick = () => {
        fetch('http://localhost:8081/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            }),
        }).then(async (res) => {
            if (res.status === 200) {
                const token = (await res.json()).JWT
                localStorage.setItem('token', token)
                navigate('/home', { replace: true })
                return 
            } 
            return alert(await res.text())
        })
    }

    return (
        <div style={outerStyle}>
            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    Bienvenido a UMS
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    User Management System
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput 
                        value={email}
                        onChange={(e) => setEmail((e.currentTarget as any).value)}
                        label="Email"
                        placeholder="juanfake@gmail.com"
                        required
                    />
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword((e.currentTarget as any).value)}
                        label="Contraseña"
                        placeholder="tu contraseña"
                        required
                        mt="md"
                    />
                    <Group position="apart" mt="lg">
                        <Checkbox label="Recordar" />
                        <Anchor component="button" size="sm">
                            ¿Olvidaste tu contraseña?
                        </Anchor>
                    </Group>
                    <Button onClick={onButtonClick} fullWidth mt="xl">
                        Iniciar sesión
                    </Button>
                </Paper>
            </Container>
        </div>
    )
}