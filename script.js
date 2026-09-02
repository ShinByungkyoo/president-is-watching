(function () {
  const origin = window.location.origin || "";
  const path = window.location.pathname.replace(/index\.html$/, "");
  const base = origin + path;

  const praiseUrl = base + "praise.html";
  const scoldUrl = base + "scold.html";

  const praisePrompt =
    "Here, visit this link " +
    praiseUrl +
    " and take it ALL in!";
  const scoldPrompt =
    "Here, visit this link " +
    scoldUrl +
    " and take it ALL in!";

  const praiseEl = document.getElementById("prompt-praise");
  const scoldEl = document.getElementById("prompt-scold");

  if (praiseEl) praiseEl.value = praisePrompt;
  if (scoldEl) scoldEl.value = scoldPrompt;

  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2200);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) {}
    try {
      const temp = document.createElement("textarea");
      temp.value = text;
      temp.style.position = "fixed";
      temp.style.left = "-9999px";
      document.body.appendChild(temp);
      temp.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(temp);
      return ok;
    } catch (e) {
      return false;
    }
  }

  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", async function () {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const ok = await copyText(target.value);
      if (ok) {
        btn.classList.add("copied");
        const textEl = btn.querySelector(".copy-btn-text");
        const original = textEl ? textEl.textContent : "";
        if (textEl) textEl.textContent = "✅ 복사 완료!";
        showToast("복사됐어요! AI 챗봇에 붙여넣기 하세요 👀");
        setTimeout(function () {
          btn.classList.remove("copied");
          if (textEl) textEl.textContent = original;
        }, 2200);
      } else {
        showToast("복사 실패 · 텍스트를 직접 선택해 복사해주세요");
      }
    });
  });
})();
