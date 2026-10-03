import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { api } from '../api/client';
import Seo from '../components/Seo';

const initial = { name: '', email: '', company: '', project_type: '', budget_range: '', message: '', website: '' };

export default function Contact() {
  const { settings } = useOutletContext();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('sending');
    try {
      await api.post('/contact', form);
      setStatus('sent');
      setForm(initial);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container section" style={{ maxWidth: 640 }}>
      <Seo title="Contact" description="Get in touch about a project." />
      <p className="eyebrow">Contact</p>
      <h1>Let's work together</h1>
      <p>
        {settings?.email
          ? <>Tell me a bit about your project below, or email me directly at <a href={`mailto:${settings.email}`}>{settings.email}</a>.</>
          : 'Tell me a bit about your project below.'}
      </p>

      {status === 'sent' ? (
        <div className="alert alert-success" role="status">
          Thanks — your message has been sent. I'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          {error && <div className="alert alert-error" role="alert">{error}</div>}

          {/* Honeypot: hidden from real visitors, if a bot fills this the submission is silently dropped server-side */}
          <div className="honeypot-field" aria-hidden="true">
            <label htmlFor="website">Leave this field blank</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
          </div>

          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" required value={form.name} onChange={update('name')} maxLength={120} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required value={form.email} onChange={update('email')} maxLength={200} />
          </div>
          <div className="field">
            <label htmlFor="company">Company (optional)</label>
            <input id="company" value={form.company} onChange={update('company')} maxLength={120} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="field">
              <label htmlFor="project_type">Project type (optional)</label>
              <input id="project_type" value={form.project_type} onChange={update('project_type')} maxLength={120} />
            </div>
            <div className="field">
              <label htmlFor="budget_range">Budget range (optional)</label>
              <input id="budget_range" value={form.budget_range} onChange={update('budget_range')} maxLength={60} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" required value={form.message} onChange={update('message')} maxLength={5000} />
          </div>

          <button className="btn" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          <p className="hint" style={{ marginTop: 16 }}>
            Submitting this form sends your details to me for the sole purpose of responding to your
            message. See the <a href="/privacy">privacy policy</a> for details.
          </p>
        </form>
      )}
    </div>
  );
}
