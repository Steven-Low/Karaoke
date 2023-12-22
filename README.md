# Music API
## This is an API that is capable of retrieving a JSON file containing the audio URL associated with a specific YouTube video ID.

```html
<div>
  <pre><code id="codeBlock">  
https://music-api-4b3l.onrender.com/getAudioURL/{videoID}  </code></pre>
  <button onclick="copyCodeToClipboard()">Copy to Clipboard</button>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js"></script>
<script>
function copyCodeToClipboard() {
  const codeBlock = document.getElementById('codeBlock');
  const textToCopy = codeBlock.innerText;

  const clipboard = new ClipboardJS('.button', {
    text: function() {
      return textToCopy;
    }
  });

  clipboard.on('success', function(e) {
    console.log('Copied!');
    e.clearSelection();
  });
}
</script>

```
