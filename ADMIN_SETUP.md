# Configuración de Seguridad - Panel de Administración

## Variables de Entorno en Vercel

Para que el panel de administración funcione correctamente en producción, debes agregar estas variables de entorno en Vercel:

### 1. Ve a tu Dashboard de Vercel
https://vercel.com/dashboard

### 2. Selecciona tu proyecto
`onlyburgers-webpage`

### 3. Ve a Settings → Environment Variables

### 4. Agrega estas variables:

#### `ADMIN_PASSWORD`
- **Valor**: Tu contraseña segura (ej: `MiSuperContraseña123!`)
- **Environments**: Production, Preview, Development

#### `JWT_SECRET` "fa6ffae07a218db54683c2282779869e"
- **Valor**: Un string aleatorio largo (ver abajo cómo generar)
- **Environments**: Production, Preview, Development

#### Generar JWT_SECRET seguro:
```bash
# En tu terminal local (Git Bash, PowerShell, etc):
openssl rand -base64 32
```

O usa un generador online: https://generate-secret.vercel.app/32

Ejemplo: `xK9mP2vN8qL4wR7tY6uI1oP3jH5gF8dS`

---

## Acceso al Panel

### URL del Panel
- Local: `http://localhost:3000/modificarmenu`
- Producción: `https://tu-dominio.vercel.app/modificarmenu`

### Credenciales
- Contraseña: La que configuraste en `ADMIN_PASSWORD`
- Sesión: Válida por 24 horas

---

## Características de Seguridad

✅ **Contraseña en variables de entorno** - No está hardcodeada en el código
✅ **Tokens JWT** - Sesión segura por 24 horas
✅ **Rate Limiting** - Máximo 5 intentos de login por minuto
✅ **HTTPS obligatorio** - Encriptación automática en Vercel
✅ **Token en localStorage** - No necesitas ingresar contraseña cada vez

---

## Cambiar la Contraseña

### En Vercel (Producción)
1. Ve a Settings → Environment Variables
2. Edita `ADMIN_PASSWORD`
3. Cambia el valor
4. Redeploy automático

### En Local
1. Edita `.env.local`
2. Cambia `ADMIN_PASSWORD="tu_nueva_contraseña"`
3. Reinicia el servidor (`npm run dev`)

---

## Problemas Comunes

### "Token inválido o expirado"
**Solución**: Click en "Cerrar Sesión" e ingresa de nuevo. Tu sesión duró 24 horas.

### "Demasiados intentos"
**Solución**: Espera 1 minuto y vuelve a intentar. Esto protege contra hackers.

### No puedo acceder
**Solución**: Verifica que `ADMIN_PASSWORD` esté configurada en Vercel.

---

## Seguridad Adicional (Opcional)

Para mayor seguridad, puedes:
- Usar una contraseña muy larga (20+ caracteres)
- Cambiar la contraseña periódicamente
- Usar un gestor de contraseñas
- Habilitar 2FA en tu cuenta de Vercel
