// Replace the require statement with dynamic import
import('node-fetch')
  .then((module) => {
    const fetch = module.default;

    const express = require('express');
    const { exec } = require('child_process');
    const fs = require('fs');

    const downloadURL = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp';

    const downloadYTDL = async () => {
      try {
        const response = await fetch(downloadURL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const fileStream = fs.createWriteStream('yt-dlp'); // Save the file as 'yt-dlp' locally
        await new Promise((resolve, reject) => {
          response.body.pipe(fileStream);
          response.body.on('error', reject);
          fileStream.on('finish', resolve);
        });
        console.log('yt-dlp downloaded successfully!');
      } catch (error) {
        console.error('Error downloading yt-dlp:', error.message);
      }
    };

    downloadYTDL();

    // Rest of your code for setting up the Express app and API endpoints...
    const app = express();

    app.get('/getAudioURL/:videoID', (req, res) => {
        const { videoID } = req.params;
        const url = `https://www.youtube.com/watch?v=${videoID}`;
        const command = `yt-dlp --extract-audio --audio-format mp3 --get-url ${url}`;
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
              const errorResponse = {
                error: `An error occurred: ${error.message} for ${url}`,
                stderr: stderr.toString().trim(), // Convert stderr to string and trim whitespace
              };
                res.status(500).send(errorResponse);
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

  })
  .catch((error) => {
    console.error('Error importing node-fetch:', error);
  });