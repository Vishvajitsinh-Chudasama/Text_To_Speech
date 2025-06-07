function getCSRFToken() {
  let name = 'csrftoken';
  let cookieValue = null;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
      break;
    }
  }
  return cookieValue;
}

const form = document.getElementById('ttsForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const response = await fetch('/', {
    method: 'POST',
    body: formData,
    headers: {
      'X-CSRFToken': getCSRFToken()
    }
  });

  const data = await response.json();

  if (data.file_url) {
    resultDiv.innerHTML = `
      <p>✅ Speech generated successfully:</p>
      <audio controls>
        <source src="${data.file_url}" type="audio/mpeg">
        Your browser does not support the audio tag.
      </audio>
    `;
  } else {
    resultDiv.innerHTML = `<p style="color:red;">❌ ${data.error}</p>`;
  }
});
