const EMAIL_DESTINO = 'educaccionyaccionporlaamazonia@gmail.com';

function submitViaForm(url, data) {
  return new Promise((resolve, reject) => {
    const iframeName = 'formsubmit_iframe_' + Date.now();
    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    form.target = iframeName;
    form.style.display = 'none';

    const fields = {
      _captcha: 'false',
      _template: 'table',
      ...data,
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });

    document.body.appendChild(form);

    iframe.onload = () => {
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
        resolve();
      }, 1000);
    };

    iframe.onerror = () => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
      reject(new Error('Error al enviar'));
    };

    form.submit();
  });
}

export async function sendReviewEmail({ name, email, title, category, content }) {
  await submitViaForm(`https://formsubmit.co/${EMAIL_DESTINO}`, {
    _subject: `[REVISION] Nueva noticia: ${title}`,
    nombre_autor: name,
    email_autor: email,
    titulo_noticia: title,
    categoria: category,
    contenido: content,
    mensaje: `El usuario "${name}" (${email}) ha enviado la noticia "${title}" en categoria "${category}" a revision editorial. Entre a /admin para revisarla.`,
  });
}

export async function sendConfirmationEmail({ name, email, title }) {
  await submitViaForm(`https://formsubmit.co/${EMAIL_DESTINO}`, {
    _subject: `[CONFIRMACION] Tu noticia "${title}" fue recibida`,
    _replyto: email,
    mensaje: `Hola ${name}, tu noticia "${title}" ha sido recibida por Sembrando Huellas Perú. Nuestro equipo editorial la revisara pronto.`,
  });
}
