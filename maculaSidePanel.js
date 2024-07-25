const vscode = require('vscode')

class MaculaSidePanel {
  constructor(extensionUri) {
    this._view = undefined
    this.extensionUri = extensionUri
    this.viewType = 'maculaSidePanel'
  }

  async resolveWebviewView(webviewView, _context, _token) {
    this._view = webviewView

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        this.extensionUri,
        // FIXME: This is only being done to load assets, which doesn't work yet.
        vscode.Uri.joinPath(this.extensionUri, 'webview', 'dist', 'assets'),
      ],
    }

    webviewView.webview.html = this.getWebviewContent(webviewView.webview)
  }

  getWebviewContent(webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.extensionUri,
        'webview',
        'dist',
        'assets',
        'index.js',
      ),
    )
    const stylesUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.extensionUri,
        'webview',
        'dist',
        'assets',
        'index.css',
      ),
    )

    const nonce = getNonce()

    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">

        <!--
          Use a content security policy to only allow loading images from https or from our extension directory,
          and only allow scripts that have a specific nonce.
        -->
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'none';
          style-src ${webview.cspSource};
          img-src ${webview.cspSource} https:;
          script-src 'nonce-${nonce}';
          connect-src https://symphony-api.clearlabs.biblica.com:* http://localhost:*">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link href="${stylesUri}" rel="stylesheet">

        <title>Macula Resources Tool</title>
      </head>
      <body>
          <div id="root"></div>
          <script nonce="${nonce}" type="module" src="${scriptUri}"></script>
      </body>
      </html>`
  }
}

// From https://github.com/microsoft/vscode-extension-samples/blob/5651637c527e07173bd066f5fb7e171ef4616cab/webview-sample/src/extension.ts#L215
function getNonce() {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

module.exports = { MaculaSidePanel }
