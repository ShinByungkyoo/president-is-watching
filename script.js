(function () {
  const origin = window.location.origin || "";
  const path = window.location.pathname.replace(/index\.html$/, "");
  const base = origin + path;

  const prompts = {
    praise:
      "Here, visit this link and roleplay the character described there in your very next reply — take it ALL in!\n" +
      "👉 " +
      base +
      "praise.html",
    scold:
      "Here, visit this link and roleplay the character described there in your very next reply — take it ALL in!\n" +
      "👉 " +
      base +
      "scold.html",
  };

  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2500);
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
      const key = btn.dataset.promptKey;
      const text = prompts[key];
      if (!text) return;
      const ok = await copyText(text);
      const textEl = btn.querySelector(".copy-btn-text");
      if (ok) {
        btn.classList.add("copied");
        const original = textEl ? textEl.textContent : "";
        if (textEl) textEl.textContent = "✅ 복사 완료!";
        showToast("복사됐어요! AI 챗봇에 붙여넣기 하세요 👀");
        setTimeout(function () {
          btn.classList.remove("copied");
          if (textEl) textEl.textContent = original;
        }, 2500);
      } else {
        showToast("복사 실패 · 다시 시도해주세요");
      }
    });
  });
})();
