import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'General Inquiry',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setErrorMsg(null);

    const nameTrimmed = formData.name.trim();
    const emailTrimmed = formData.email.trim();
    const messageTrimmed = formData.message.trim();

    if (!nameTrimmed) {
      setErrorMsg('Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!messageTrimmed || messageTrimmed.length < 5) {
      setErrorMsg('Please enter a message transmission of at least 5 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'contacts'), {
        name: nameTrimmed,
        email: emailTrimmed,
        service: formData.service,
        message: messageTrimmed,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        service: 'General Inquiry',
        message: '',
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setErrorMsg(
        err?.message || 'Transmission failed. Unable to dispatch your message right now.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section section-z" id="contact">
      <div className="contact-inner reveal">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          INITIATE TELEMETRY
        </div>
        <h2 className="s-heading">
          GET IN <span className="hl">TOUCH</span>
        </h2>
        <p className="s-body" style={{ margin: '0 auto' }}>
          Have a cloud infrastructure project, WebRTC integration, mobile synchronization system, or
          engineering inquiry? Send a message directly.
        </p>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="f-row">
            <div className="f-grp">
              <label htmlFor="c-name" className="f-lbl">
                YOUR NAME
              </label>
              <input
                id="c-name"
                type="text"
                className="f-ctrl"
                placeholder="e.g. Ayush Negi"
                required
                disabled={isSubmitting}
                value={formData.name}
                onChange={(e) => {
                  setErrorMsg(null);
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </div>

            <div className="f-grp">
              <label htmlFor="c-email" className="f-lbl">
                EMAIL ADDRESS
              </label>
              <input
                id="c-email"
                type="email"
                className="f-ctrl"
                placeholder="ayushnegi5328@gmail.com"
                required
                disabled={isSubmitting}
                value={formData.email}
                onChange={(e) => {
                  setErrorMsg(null);
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="f-grp">
            <label htmlFor="c-service" className="f-lbl">
              INQUIRY TYPE
            </label>
            <select
              id="c-service"
              className="f-ctrl"
              disabled={isSubmitting}
              value={formData.service}
              onChange={(e) => {
                setErrorMsg(null);
                setFormData({ ...formData, service: e.target.value });
              }}
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Hire / Job Opportunity">Hire / Job Opportunity</option>
              <option value="Project Collaboration">Project Collaboration</option>
              <option value="Technical Consulting">Technical Consulting</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="f-grp">
            <label htmlFor="c-msg" className="f-lbl">
              MESSAGE TRANSMISSION
            </label>
            <textarea
              id="c-msg"
              className="f-ctrl"
              rows={4}
              placeholder="Describe your infrastructure goals, project timelines, or technical requirements..."
              required
              disabled={isSubmitting}
              value={formData.message}
              onChange={(e) => {
                setErrorMsg(null);
                setFormData({ ...formData, message: e.target.value });
              }}
            />
          </div>

          <button type="submit" className="f-submit" disabled={isSubmitting}>
            {isSubmitting ? 'TRANSMITTING MESSAGE...' : 'SEND MESSAGE TRANSMISSION ↗'}
          </button>

          {submitted && (
            <div className="f-ok" style={{ marginTop: '16px' }}>
              ✓ TELEMETRY RECEIVED: Thank you! Your transmission has been successfully sent to Ayush
              Negi.
            </div>
          )}

          {errorMsg && (
            <div
              className="f-err"
              style={{
                marginTop: '16px',
                padding: '12px 16px',
                background: 'rgba(255, 49, 49, 0.1)',
                border: '1px solid rgba(255, 49, 49, 0.3)',
                color: '#ff4d4d',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.92rem',
              }}
            >
              ⚠ TRANSMISSION ERROR: {errorMsg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
