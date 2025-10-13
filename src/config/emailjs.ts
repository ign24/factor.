// EmailJS Configuration for Factor AI Contact Form
// 
// INSTRUCCIONES PARA CONFIGURAR EMAILJS:
// 
// 1. Ir a https://www.emailjs.com/ y crear una cuenta
// 2. Crear un Service:
//    - Elegir "Gmail" o "Outlook" (recomendado para ignacio_zu@outlook.com)
//    - Configurar con las credenciales de ignacio_zu@outlook.com
//    - Copiar el Service ID
// 
// 3. Crear un Template:
//    - Usar las variables que se muestran abajo
//    - El template debe enviar a {{to_email}} (ignacio_zu@outlook.com)
//    - Configurar reply-to como {{reply_to}} para responder directamente al cliente
// 
// 4. Obtener Public Key desde la página de Account
//
// 5. Reemplazar los valores en este archivo

export const EMAILJS_CONFIG = {
  // ✅ Configuración completa de EmailJS
  SERVICE_ID: 'service_tzzunti',
  TEMPLATE_ID: 'template_p4jnm7g',
  PUBLIC_KEY: 'Dzfp8dTfn8_Ts-St2',
  
  // Template variables que se usarán:
  // {{to_email}} - ignacio_zu@outlook.com
  // {{from_name}} - Nombre del cliente
  // {{from_email}} - Email del cliente
  // {{company}} - Empresa del cliente
  // {{project_description}} - Descripción del proyecto
  // {{budget}} - Presupuesto seleccionado
  // {{reply_to}} - Email del cliente para respuestas
  // {{subject}} - Asunto del email
  // {{message}} - Mensaje formateado completo
}

// Template sugerido para EmailJS:
/*
Asunto: {{subject}}

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
*/
