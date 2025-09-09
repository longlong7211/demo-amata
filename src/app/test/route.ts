export async function GET() {
    return new Response(`
        <html>
            <head><title>Test Proxy</title></head>
            <body style="font-family: Arial, sans-serif; padding: 40px;">
                <h2>🔧 Test Proxy Status</h2>
                <p>Server đang chạy trên port 3000</p>
                <p>API endpoint: <code>/api/solarbk-simple</code></p>
                <hr>
                <h3>Để test proxy:</h3>
                <ol>
                    <li>Mở: <a href="/api/solarbk-simple" target="_blank">http://localhost:3000/api/solarbk-simple</a></li>
                    <li>Kiểm tra console để xem debug info</li>
                </ol>
                <button onclick="window.open('/api/solarbk-simple', '_blank')" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Test Proxy
                </button>
            </body>
        </html>
    `, {
        headers: { 'Content-Type': 'text/html' }
    });
}
