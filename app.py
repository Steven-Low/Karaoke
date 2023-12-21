import yt_dlp
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/getAudioURL/<videoID>')
def get_youtube_audio(videoID):
    # Create yt-dlp options
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '128',
        }],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        url = f"https://www.youtube.com/watch?v={videoID}"
        info = ydl.extract_info(url, download=False)     # Get video info
        audio_url = info['url']                          # Extract audio URL    
        return jsonify({'audioURL': audio_url})


if __name__ == '__main__':
    app.run(host='0.0.0.0')  # Important for Render deployment
