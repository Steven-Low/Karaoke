const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/getAudioURL/:videoID', (req, res) => {
    const { videoID } = req.params;
    const url = `https://www.youtube.com/watch?v=${videoID}`;
    const command = `yt-dlp --extract-audio --audio-format mp3 --get-url ${url}`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send('Error fetching audio URL');
            return;
        }
        const audioURL = stdout.trim();
        res.json({ audioURL });
    });
});

// Other necessary routes and configurations...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});