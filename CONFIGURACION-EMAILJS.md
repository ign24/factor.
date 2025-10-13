# 📧 Configuración EmailJS para Factor AI

## 🎯 Objetivo
Configurar el envío de emails del formulario de contacto hacia `ignacio_zu@outlook.com` usando EmailJS.

## 📋 Pasos de Configuración

### 1. Crear Cuenta en EmailJS
1. Ir a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crear cuenta gratuita (permite 200 emails/mes)
3. Verificar email

### 2. Configurar Servicio de Email
1. En el dashboard, ir a **"Email Services"**
2. Click **"Add New Service"**
3. Seleccionar **"Outlook"** (para ignacio_zu@outlook.com)
4. Configurar:
   - **Service Name**: `Factor AI Contact`
   - **User**: `ignacio_zu@outlook.com`
   - **Password**: [Password de la cuenta]
5. **Guardar** y copiar el **Service ID** generado

### 3. Crear Template de Email
1. Ir a **"Email Templates"**
2. Click **"Create New Template"**
3. Configurar:
   - **Template Name**: `Contact Form Factor AI`
   - **Subject**: `{{subject}}`
   - **Content**: 
   ```
   Nueva consulta desde Factor AI

   Datos del cliente:
   - Nombre: {{from_name}}
   - Email: {{from_email}}
   - Empresa: {{company}}
   - Presupuesto: {{budget}}

   Descripción del proyecto:
   {{project_description}}

   ---
   Este mensaje fue enviado desde el formulario de contacto de factor.com.ar
   Para responder directamente al cliente, usa Reply.
   ```

4. En **Settings**:
   - **To Email**: `ignacio_zu@outlook.com`
   - **Reply To**: `{{reply_to}}`
   - **From Name**: `Factor AI Website`

5. **Guardar** y copiar el **Template ID**

### 4. Obtener Public Key
1. Ir a **"Account"** > **"General"**
2. Copiar el **Public Key**

### 5. Actualizar Configuración
Editar el archivo `src/config/emailjs.ts`:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_xxxxxxx', // Tu Service ID de paso 2
  TEMPLATE_ID: 'template_xxxxxxx', // Tu Template ID de paso 3  
  PUBLIC_KEY: 'xxxxxxxxxxxxxxx', // Tu Public Key de paso 4
}
```

## ✅ Verificación
1. Ejecutar `npm run dev`
2. Ir al formulario de contacto
3. Enviar un mensaje de prueba
4. Verificar que llega el email a `ignacio_zu@outlook.com`

## 🔧 Troubleshooting

### Error: "EmailJS no está configurado"
- Verificar que los valores en `src/config/emailjs.ts` son correctos
- Asegurarse que no hay espacios extra en las claves

### Error: "Failed to send email"
- Verificar credenciales de Outlook
- Comprobar que el servicio está activo en EmailJS
- Revisar la consola del navegador para más detalles

### No llegan los emails
- Revisar carpeta de spam de `ignacio_zu@outlook.com`
- Verificar que el template tiene `{{to_email}}` configurado correctamente
- Comprobar limits de EmailJS (200 emails/mes en plan gratuito)

## 💡 Tips
- El plan gratuito de EmailJS permite 200 emails/mes
- Para más volumen, considera upgradearse al plan pago
- Mantener las credenciales seguras y no commitearlas al repositorio

## 🆘 Soporte
Si hay problemas con la configuración:
1. Revisar la documentación de EmailJS
2. Verificar logs en la consola del navegador
3. Contactar soporte de EmailJS si es necesario
