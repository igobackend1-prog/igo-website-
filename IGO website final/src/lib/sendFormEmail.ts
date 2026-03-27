/**
 * sendFormEmail.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared email utility for all IGO Agritech website forms.
 * Uses Formsubmit.co — free, unlimited, zero API key required.
 *
 * FIRST-TIME SETUP (one time only):
 *   1. Submit any form on the website once.
 *   2. Check bankingbackend.indiagreen@gmail.com for a verification email from Formsubmit.
 *   3. Click "Activate Form" in that email.
 *   4. Done — all future submissions arrive automatically.
 *
 * Formsubmit AJAX docs: https://formsubmit.co/ajax-documentation
 * ─────────────────────────────────────────────────────────────────────────────
 */

const RECIPIENT_EMAIL = "bankingbackend.indiagreen@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

export type FormType =
  | "Contact Enquiry"
  | "Agri Startup Enquiry"
  | "IGO Academy Enrollment"
  | "Career Application";

export interface EmailPayload {
  formType: FormType;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  enquiryType?: string;     // Contact form
  subjectArea?: string;     // Contact form — project/interest area
  interestArea?: string;    // Startup enquiry
  course?: string;          // Academy enrollment
  department?: string;      // Career application
  position?: string;        // Career application
  message?: string;
}

/**
 * Sends a formatted email to bankingbackend.indiagreen@gmail.com via Formsubmit.co.
 * Returns { success: boolean, error?: string }
 */
export async function sendFormEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const subject = buildSubject(payload);
    const messageBody = buildMessageBody(payload);

    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        // Core fields Formsubmit uses
        name: payload.name,
        email: payload.email,
        message: messageBody,

        // Formsubmit control fields
        _subject: subject,
        _captcha: "false",       // Disable captcha (we handle spam at form level)
        _template: "table",      // Clean table format in email
        _replyto: payload.email, // Reply goes back to visitor
      }),
    });

    const result = await response.json();

    if (result.success === "true" || result.success === true) {
      return { success: true };
    } else {
      return { success: false, error: result.message || "Unknown error from email service" };
    }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

// ─── Form type heading config ─────────────────────────────────────────────────

const FORM_HEADERS: Record<FormType, { tag: string; heading: string; icon: string }> = {
  "Contact Enquiry":      { tag: "CONTACT ENQUIRY",       heading: "New Contact / General Enquiry",      icon: "📬" },
  "Agri Startup Enquiry": { tag: "AGRI STARTUP ENQUIRY",  heading: "New Agri Startup Enquiry",           icon: "🚀" },
  "IGO Academy Enrollment":{ tag: "IGO ACADEMY ENROLLMENT",heading: "New Course Enrollment / Enquiry",   icon: "🎓" },
  "Career Application":   { tag: "CAREER APPLICATION",    heading: "New Job Application",                icon: "💼" },
};

// ─── Subject line ─────────────────────────────────────────────────────────────

function buildSubject(p: EmailPayload): string {
  const { tag } = FORM_HEADERS[p.formType] ?? { tag: "WEBSITE SUBMISSION" };
  switch (p.formType) {
    case "Contact Enquiry":
      return `[${tag}] ${p.enquiryType || "General"} — ${p.name}`;
    case "Agri Startup Enquiry":
      return `[${tag}] ${p.interestArea || "General"} — ${p.name}`;
    case "IGO Academy Enrollment":
      return `[${tag}] ${p.course || "Course Enquiry"} — ${p.name}`;
    case "Career Application":
      return `[${tag}] ${p.department || "General"} — ${p.name}`;
    default:
      return `[IGO WEBSITE] New Submission — ${p.name}`;
  }
}

// ─── Message body builder ─────────────────────────────────────────────────────

function buildMessageBody(p: EmailPayload): string {
  const { tag, heading, icon } = FORM_HEADERS[p.formType] ?? { tag: "WEBSITE SUBMISSION", heading: "New Submission", icon: "📋" };
  const line = (label: string, value?: string) =>
    value && value.trim() ? `${label}: ${value.trim()}` : "";

  const rows: string[] = [
    // ── Prominent form-type header ──────────────────────────────────────────
    `${"━".repeat(54)}`,
    `${icon}  ${tag}`,
    `${heading}`,
    `IGO Agritech Farms — igoagritechfarms.com`,
    `${"━".repeat(54)}`,
    ``,
    // ── Sender details ───────────────────────────────────────────────────────
    line("Name",          p.name),
    line("Email",         p.email),
    line("Phone",         p.phone),
    line("Location",      p.location),
    // ── Form-specific fields ─────────────────────────────────────────────────
    line("Enquiry Type",  p.enquiryType),
    line("Interest Area", p.subjectArea || p.interestArea),
    line("Course",        p.course),
    line("Department",    p.department),
    line("Position",      p.position),
    ``,
    `${"─".repeat(54)}`,
    // ── Message / details ────────────────────────────────────────────────────
    p.message ? `${p.message}` : "",
    `${"─".repeat(54)}`,
    ``,
    `Submitted : ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
    `Source    : IGO Agritech Website`,
  ];

  return rows.filter(r => r !== undefined).join("\n");
}
