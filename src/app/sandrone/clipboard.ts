/**
 * 클립보드 복사. 반드시 사용자 제스처(클릭/키 입력) 핸들러 안에서 동기적으로 호출할 것.
 * 1) execCommand("copy") — 동기, 모든 브라우저/비보안 컨텍스트(LAN IP 등)에서 동작
 * 2) 실패 시 Clipboard API — 비동기, HTTPS/localhost에서만 존재
 */
export function copyText(text: string) {
  if (execCopy(text)) return;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

function execCopy(text: string): boolean {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.cssText =
    "position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;opacity:0;font-size:12pt;";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  ta.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}
