// The full code for the file: api/index.js

export default function handler(req, res) {
  // The base URL of your deployed Vercel project
  const appUrl = 'https://philosophers-farcasters.vercel.app'; 
  
  // The external image URL you provided
  const imageUrl = 'https://i.ibb.co/DgWBs8rM/app-logo-4.png';

  // This is the HTML that will be sent to the Farcaster client
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>The Philosophers Frame</title>

        <!-- Farcaster Frame Meta Tags -->
        <meta property="og:title" content="The Philosophers: A Daily Question" />
        <meta property="og:image" content="${imageUrl}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="fc:frame:button:1" content="Yes" />
        <meta property="fc:frame:button:2" content="No" />
        
        <!-- URL to handle button clicks. We will create this file next. -->
        <meta property="fc:frame:post_url" content="${appUrl}/api/vote" /> 

      </head>
      <body>
        <h1>The Philosophers Farcaster Frame</h1>
        <p>This is a Farcaster Frame. To use it, share this page's URL in a Farcaster client like Warpcast.</p>
        <p><a href="https://philosophers-farcasters.vercel.app/">Click here to view the main web application.</a></p>
      </body>
    </html>
  `;

  // Send the HTML response
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
