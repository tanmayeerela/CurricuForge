#!/usr/bin/env python3
"""
Simple HTTP Server for Frontend
Serves the frontend on http://localhost:3000
"""

import http.server
import socketserver
import os

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"✈️  Frontend Server running at http://localhost:{PORT}")
        print(f"📁 Serving files from: {DIRECTORY}")
        print("\nPress CTRL+C to stop the server\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n✓ Server stopped")
