// Minimal sanitizer for static, trusted docs: strips <script> and event handlers
export function useSanitizedHtml(raw: string) {
  // Remove script tags
  let html = raw.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
  // Remove inline event handlers (on*)
  html = html.replace(/ on[a-z]+="[^"]*"/gi, '')
  html = html.replace(/ on[a-z]+='[^']*'/gi, '')
  return html
}

