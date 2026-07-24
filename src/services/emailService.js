const EMAIL_DESTINO = 'educacionaccionamazonia@gmail.com';

export function sendReviewEmail({ name, email, title, category, content }) {
  const subject = encodeURIComponent(`[REVISION] Nueva noticia: ${title}`);
  const body = encodeURIComponent(
    `=== NUEVA SOLICITUD DE REVISION ===\n\n` +
    `Autor: ${name}\n` +
    `Email del autor: ${email}\n` +
    `Categoria: ${category}\n` +
    `Titulo: ${title}\n\n` +
    `--- CONTENIDO ---\n\n${content}\n\n` +
    `--- FIN ---\n\n` +
    `Para aprobar o rechazar, ingresa a /admin`
  );
  window.open(`mailto:${EMAIL_DESTINO}?subject=${subject}&body=${body}`, '_blank');
}

export function sendConfirmationEmail({ name, email, title }) {
  const subject = encodeURIComponent(`[CONFIRMACION] Tu noticia "${title}" fue recibida`);
  const body = encodeURIComponent(
    `Hola ${name},\n\n` +
    `Tu noticia "${title}" ha sido recibida por Sembrando Huellas Peru.\n` +
    `Nuestro equipo editorial la revisara pronto.\n\n` +
    `Gracias por tu contribucion.\n\n` +
    `Equipo Sembrando Huellas Peru`
  );
  window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
}
