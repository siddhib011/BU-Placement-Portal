const sgMail = require('@sendgrid/mail');
const logger = require('../config/logger');

const apiKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.SENDER_EMAIL;

if (apiKey) {
  sgMail.setApiKey(apiKey);
} else {
  logger.warn('SENDGRID_API_KEY is not set. Email functionality will be disabled.');
}

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const sendEmail = async (to, subject, html) => {
  if (!apiKey || !senderEmail) {
    logger.error('SendGrid API Key or Sender Email is not configured.');
    throw new Error('Email service is not configured.');
  }

  const msg = {
    to,
    from: senderEmail,
    subject,
    html,
  };

  // Retry transient network/DNS errors (EAI_AGAIN, ENOTFOUND, ETIMEDOUT)
  const maxAttempts = 4;
  let attempt = 0;
  while (attempt < maxAttempts) {
    attempt += 1;
    try {
      await sgMail.send(msg);
      logger.info(`Email sent to ${to} with subject "${subject}" (attempt ${attempt})`);
      return;
    } catch (error) {
      const code = error.code || error?.response?.headers?.['x-exception'] || null;
      const msgBody = error.response?.body || error.message || String(error);
      logger.error(`Error sending email (attempt ${attempt}): ${error.message}`, { code, details: msgBody });

      // If this looks like a transient DNS/network error, retry with backoff
      const transient = (error.code && ['EAI_AGAIN', 'ENOTFOUND', 'ETIMEDOUT', 'ECONNRESET'].includes(error.code))
        || /getaddrinfo EAI_AGAIN/.test(error.message || '')
        || /ENOTFOUND/.test(error.message || '')
        || /ETIMEDOUT/.test(error.message || '');

      if (attempt >= maxAttempts || !transient) {
        // Give up and surface a helpful error
        logger.error('Giving up sending email after attempts', { attempt, to });
        throw new Error('Failed to send email.');
      }

      // Exponential backoff
      const backoffMs = 300 * Math.pow(2, attempt - 1);
      logger.info(`Retrying email send in ${backoffMs}ms (attempt ${attempt + 1}/${maxAttempts})`);
      await wait(backoffMs);
    }
  }
  // If we exit loop unexpectedly
  throw new Error('Failed to send email.');
};

module.exports = sendEmail;