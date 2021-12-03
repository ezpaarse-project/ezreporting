const path = require('path');
const fs = require('fs');
const nunjucks = require('nunjucks');
const mjml2html = require('mjml');
const nodemailer = require('nodemailer');
import { getConfig } from '../config';

const templatesDir = path.resolve(__dirname, 'templates');
const imagesDir = path.resolve(templatesDir, 'images');

const transporter = nodemailer.createTransport({
  host: getConfig('smtp.host'),
  port: getConfig('smtp.port'),
  secure: JSON.parse(getConfig('smtp.secure')),
  ignoreTLS: JSON.parse(getConfig('smtp.ignoreTLS')),
  tls: {
    rejectUnauthorized: JSON.parse(getConfig('smtp.tls.rejectUnauthorized')),
  },
});

nunjucks.configure(templatesDir);

const images = fs.readdirSync(imagesDir);

export async function sendMail(options: object = {}) {
  const mailOptions = options || {};
  mailOptions.attachments = mailOptions.attachments || [];

  images.forEach((image) => {
    mailOptions.attachments.push({
      filename: image,
      path: path.resolve(imagesDir, image),
      cid: image,
    });
  });

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

export function generateMail(templateName: string, locals: object = {}) {
  if (!templateName) { throw new Error('No template name provided'); }

  const text = nunjucks.render(`${templateName}.txt`, locals);
  const mjmlTemplate = nunjucks.render(`${templateName}.mjml`, locals);
  const { html, errors } = mjml2html(mjmlTemplate);

  return { html, text, errors };
};

