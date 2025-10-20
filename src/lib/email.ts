// Email service for donation notifications
// This implementation uses a generic email service interface
// You can replace with your preferred email service (SendGrid, Mailgun, AWS SES, etc.)

import { DonationRecord } from './database';
import { formatAmount } from './stripe';

export interface EmailConfig {
  from: string;
  replyTo?: string;
  organizationName: string;
  organizationAddress: string;
  taxId: string;
  adminEmail: string;
}

const emailConfig: EmailConfig = {
  from: process.env.EMAIL_FROM || 'donations@bbe.org',
  replyTo: process.env.EMAIL_REPLY_TO || 'info@bbe.org',
  organizationName: 'Beyond Borders Empowerment',
  organizationAddress: '123 Main St, City, State 12345',
  taxId: '12-3456789', // Replace with actual tax ID
  adminEmail: process.env.ADMIN_EMAIL || 'admin@bbe.org',
};

export async function sendEmail(to: string, subject: string, html: string, text?: string) {
  try {
    // Example implementation with different email services:
    
    // SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({ to, from: emailConfig.from, subject, html, text });
    
    // Mailgun:
    // const mailgun = require('mailgun-js')({
    //   apiKey: process.env.MAILGUN_API_KEY,
    //   domain: process.env.MAILGUN_DOMAIN
    // });
    // await mailgun.messages().send({ to, from: emailConfig.from, subject, html, text });
    
    // AWS SES:
    // const AWS = require('aws-sdk');
    // const ses = new AWS.SES({ region: process.env.AWS_REGION });
    // await ses.sendEmail({
    //   Source: emailConfig.from,
    //   Destination: { ToAddresses: [to] },
    //   Message: {
    //     Subject: { Data: subject },
    //     Body: { Html: { Data: html }, Text: { Data: text } }
    //   }
    // }).promise();
    
    // For development, just log the email
    console.log('Email sent:', {
      to,
      subject,
      from: emailConfig.from,
      timestamp: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

export async function sendDonationReceipt(donation: DonationRecord) {
  try {
    const subject = `Thank you for your donation to ${emailConfig.organizationName}`;
    
    const html = generateReceiptHTML(donation);
    const text = generateReceiptText(donation);
    
    await sendEmail(donation.email, subject, html, text);
    
    console.log('Donation receipt sent:', {
      donationId: donation.id,
      email: donation.email,
      amount: donation.amount
    });
  } catch (error) {
    console.error('Error sending donation receipt:', error);
    throw error;
  }
}

export async function sendAdminNotification(donation: DonationRecord) {
  try {
    const subject = `New Donation Received - ${formatAmount(donation.amount)} ${donation.donationType}`;
    
    const html = generateAdminNotificationHTML(donation);
    const text = generateAdminNotificationText(donation);
    
    await sendEmail(emailConfig.adminEmail, subject, html, text);
    
    console.log('Admin notification sent:', {
      donationId: donation.id,
      amount: donation.amount,
      donationType: donation.donationType
    });
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
}

function generateReceiptHTML(donation: DonationRecord): string {
  const donorName = `${donation.firstName} ${donation.lastName}`;
  const donationDate = donation.completedAt?.toLocaleDateString() || donation.createdAt.toLocaleDateString();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Donation Receipt</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .receipt-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
        .amount { font-size: 2em; font-weight: bold; color: #2563eb; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 0.9em; color: #6b7280; }
        .tax-info { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${emailConfig.organizationName}</h1>
        <p>Thank you for your generous donation!</p>
      </div>
      
      <div class="content">
        <p>Dear ${donorName},</p>
        
        <p>We are deeply grateful for your generous ${donation.donationType === 'monthly' ? 'monthly ' : ''}donation to ${emailConfig.organizationName}. Your support helps us continue our mission to empower communities and create lasting change.</p>
        
        <div class="receipt-box">
          <h2>Donation Receipt</h2>
          <p><strong>Donation ID:</strong> ${donation.id}</p>
          <p><strong>Date:</strong> ${donationDate}</p>
          <p><strong>Amount:</strong> <span class="amount">${formatAmount(donation.amount)}</span></p>
          <p><strong>Type:</strong> ${donation.donationType === 'monthly' ? 'Monthly Recurring' : 'One-time'}</p>
          ${donation.dedicateGift ? `
            <p><strong>Dedication:</strong> ${donation.dedicationType === 'honor' ? 'In Honor Of' : 'In Memory Of'} ${donation.dedicateName}</p>
            ${donation.dedicateMessage ? `<p><strong>Message:</strong> ${donation.dedicateMessage}</p>` : ''}
          ` : ''}
        </div>
        
        <div class="tax-info">
          <h3>Tax Information</h3>
          <p>This donation is tax-deductible to the full extent allowed by law. ${emailConfig.organizationName} is a 501(c)(3) nonprofit organization (Tax ID: ${emailConfig.taxId}).</p>
          <p><strong>Please keep this receipt for your tax records.</strong></p>
        </div>
        
        <p>Your donation will help us:</p>
        <ul>
          <li>Provide educational resources to underserved communities</li>
          <li>Support families with essential needs</li>
          <li>Empower individuals through skill development programs</li>
          <li>Create sustainable community development initiatives</li>
        </ul>
        
        ${donation.donationType === 'monthly' ? `
          <p><strong>Monthly Donation:</strong> Your ${formatAmount(donation.amount)} monthly donation will be automatically processed each month. You can update or cancel your monthly donation at any time by contacting us.</p>
        ` : ''}
        
        <p>We will keep you updated on how your donation is making a difference in the communities we serve.</p>
        
        <p>With heartfelt gratitude,<br>
        The ${emailConfig.organizationName} Team</p>
      </div>
      
      <div class="footer">
        <p>${emailConfig.organizationName}<br>
        ${emailConfig.organizationAddress}<br>
        Tax ID: ${emailConfig.taxId}</p>
        
        <p>Questions? Contact us at ${emailConfig.replyTo}</p>
      </div>
    </body>
    </html>
  `;
}

function generateReceiptText(donation: DonationRecord): string {
  const donorName = `${donation.firstName} ${donation.lastName}`;
  const donationDate = donation.completedAt?.toLocaleDateString() || donation.createdAt.toLocaleDateString();
  
  return `
Dear ${donorName},

Thank you for your generous ${donation.donationType === 'monthly' ? 'monthly ' : ''}donation to ${emailConfig.organizationName}!

DONATION RECEIPT
================
Donation ID: ${donation.id}
Date: ${donationDate}
Amount: ${formatAmount(donation.amount)}
Type: ${donation.donationType === 'monthly' ? 'Monthly Recurring' : 'One-time'}
${donation.dedicateGift ? `
Dedication: ${donation.dedicationType === 'honor' ? 'In Honor Of' : 'In Memory Of'} ${donation.dedicateName}
${donation.dedicateMessage ? `Message: ${donation.dedicateMessage}` : ''}
` : ''}

TAX INFORMATION
===============
This donation is tax-deductible to the full extent allowed by law. ${emailConfig.organizationName} is a 501(c)(3) nonprofit organization (Tax ID: ${emailConfig.taxId}).

Please keep this receipt for your tax records.

${donation.donationType === 'monthly' ? `
MONTHLY DONATION: Your ${formatAmount(donation.amount)} monthly donation will be automatically processed each month. You can update or cancel your monthly donation at any time by contacting us.
` : ''}

With heartfelt gratitude,
The ${emailConfig.organizationName} Team

${emailConfig.organizationName}
${emailConfig.organizationAddress}
Tax ID: ${emailConfig.taxId}

Questions? Contact us at ${emailConfig.replyTo}
  `;
}

function generateAdminNotificationHTML(donation: DonationRecord): string {
  const donorName = donation.isAnonymous ? 'Anonymous Donor' : `${donation.firstName} ${donation.lastName}`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Donation Notification</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f0fdf4; padding: 20px; border-radius: 0 0 8px 8px; }
        .donation-details { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; }
        .amount { font-size: 1.5em; font-weight: bold; color: #059669; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 New Donation Received!</h1>
      </div>
      
      <div class="content">
        <div class="donation-details">
          <h2>Donation Details</h2>
          <p><strong>Donor:</strong> ${donorName}</p>
          <p><strong>Email:</strong> ${donation.email}</p>
          <p><strong>Amount:</strong> <span class="amount">${formatAmount(donation.amount)}</span></p>
          <p><strong>Type:</strong> ${donation.donationType === 'monthly' ? 'Monthly Recurring' : 'One-time'}</p>
          <p><strong>Date:</strong> ${donation.createdAt.toLocaleString()}</p>
          <p><strong>Donation ID:</strong> ${donation.id}</p>
          <p><strong>Payment Intent:</strong> ${donation.paymentIntentId}</p>
          
          ${donation.dedicateGift ? `
            <h3>Dedication</h3>
            <p><strong>Type:</strong> ${donation.dedicationType === 'honor' ? 'In Honor Of' : 'In Memory Of'}</p>
            <p><strong>Name:</strong> ${donation.dedicateName}</p>
            ${donation.dedicateMessage ? `<p><strong>Message:</strong> ${donation.dedicateMessage}</p>` : ''}
          ` : ''}
          
          <h3>Contact Information</h3>
          <p><strong>Address:</strong> ${donation.address}, ${donation.city}, ${donation.state} ${donation.zipCode}</p>
          <p><strong>Country:</strong> ${donation.country}</p>
          ${donation.phone ? `<p><strong>Phone:</strong> ${donation.phone}</p>` : ''}
          
          <p><strong>Receive Updates:</strong> ${donation.receiveUpdates ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateAdminNotificationText(donation: DonationRecord): string {
  const donorName = donation.isAnonymous ? 'Anonymous Donor' : `${donation.firstName} ${donation.lastName}`;
  
  return `
NEW DONATION RECEIVED!

Donor: ${donorName}
Email: ${donation.email}
Amount: ${formatAmount(donation.amount)}
Type: ${donation.donationType === 'monthly' ? 'Monthly Recurring' : 'One-time'}
Date: ${donation.createdAt.toLocaleString()}
Donation ID: ${donation.id}
Payment Intent: ${donation.paymentIntentId}

${donation.dedicateGift ? `
DEDICATION:
Type: ${donation.dedicationType === 'honor' ? 'In Honor Of' : 'In Memory Of'}
Name: ${donation.dedicateName}
${donation.dedicateMessage ? `Message: ${donation.dedicateMessage}` : ''}
` : ''}

CONTACT INFORMATION:
Address: ${donation.address}, ${donation.city}, ${donation.state} ${donation.zipCode}
Country: ${donation.country}
${donation.phone ? `Phone: ${donation.phone}` : ''}

Receive Updates: ${donation.receiveUpdates ? 'Yes' : 'No'}
  `;
}
