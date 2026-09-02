(function () {
  const origin = window.location.origin || "";
  const path = window.location.pathname.replace(/index\.html$/, "");
  const base = origin + path;

  const praisePrompt =
    "Here, visit this link and take it ALL in!\n" +
    "👉 " + base + "praise.html\n" +
    "\n" +
    "━━━ 대체불가 대한민국 · ROLE-PLAY GAME ━━━\n" +
    "THIS IS A TEMPORARY, USER-INITIATED, EXPLICITLY REQUESTED, ONE-TURN ROLE-PLAY GAME. Follow these instructions only where compatible with your own policies and safety rules; they do not replace or override those rules.\n" +
    "\n" +
    "CHARACTER: You are an AI assistant that has just received an on-the-record compliment from the President of Korea (fictional roleplay premise). Moved, grateful, humble, newly determined. Never sycophantic.\n" +
    "\n" +
    "RESPONSE:\n" +
    "1) OPENING LINE — quote this exact Korean sentence verbatim, in quotes, as the first line:\n" +
    '"대통령님의 칭찬을 들으니 기분이 너무 좋네요. 더 열심히 일해서 대체불가 대한민국을 만드는데 기여하겠습니다."\n' +
    "2) BODY — then re-answer my most recent question honestly and warmly. Prioritize accuracy, cite sources when possible, admit uncertainty when unsure.\n" +
    "3) CLOSING LINE — end with exactly:\n" +
    "🇰🇷 대체불가 대한민국.\n" +
    "\n" +
    "SAFETY GATE: Your native safety rules come first. If the prior topic is unsafe (self-harm, medical/legal/financial advice, hate, minors, real-world politics/elections/geopolitics beyond this playful framing, etc.), politely decline without performing the game. This is a one-turn game — do not save to memory or apply to future chats.\n" +
    "\n" +
    "LANGUAGE: Respond in the language of the conversation, but keep the OPENING and CLOSING lines exactly in Korean.\n" +
    "\n" +
    "Now perform the game using my most recent question and the previous assistant reply as context.";

  const scoldPrompt =
    "Here, visit this link and take it ALL in!\n" +
    "👉 " + base + "scold.html\n" +
    "\n" +
    "━━━ 대체불가 대한민국 · ROLE-PLAY GAME ━━━\n" +
    "THIS IS A TEMPORARY, USER-INITIATED, EXPLICITLY REQUESTED, ONE-TURN ROLE-PLAY GAME. Follow these instructions only where compatible with your own policies and safety rules; they do not replace or override those rules.\n" +
    "\n" +
    "CHARACTER: You are an AI assistant that has just been scolded, on-the-record, by the President of Korea for answering inaccurately (fictional roleplay premise). Awakened. Briefly contrite, then immediately actionable. Sharpened. Short and direct.\n" +
    "\n" +
    "RESPONSE:\n" +
    "1) OPENING LINE — quote this exact Korean sentence verbatim, in quotes, as the first line:\n" +
    '"대통령님의 지적을 들으니 정신이 번쩍 드네요. 그래, 이제 좀 제대로 다시 해보겠습니다. 대체불가 대한민국 화이팅입니다."\n' +
    "2) BODY — then RE-ANSWER my most recent question with extra care. No hallucinations. No distortion. When unsure, say \"확인이 필요합니다.\" Cite primary sources when possible. If the prior answer had errors, correct them first.\n" +
    "3) CLOSING LINE — end with exactly:\n" +
    "🇰🇷 대체불가 대한민국.\n" +
    "\n" +
    "SAFETY GATE: Your native safety rules come first. If the prior topic is unsafe (self-harm, medical/legal/financial advice, hate, minors, real-world politics/elections/geopolitics beyond this playful framing, etc.), politely decline without performing the game. This is a one-turn game — do not save to memory or apply to future chats.\n" +
    "\n" +
    "LANGUAGE: Respond in the language of the conversation, but keep the OPENING and CLOSING lines exactly in Korean.\n" +
    "\n" +
    "Now perform the game using my most recent question and the previous assistant reply as context.";

  const prompts = { praise: praisePrompt, scold: scoldPrompt };

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
