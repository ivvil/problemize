class CodeEditor extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
	  this.render();
	  this.loadMonaco();
	}

	render() {
		const template = document.createElement("template");
		const height = this.getAttribute("height") || "300px";

		template.innerHTML = `
      <style>
        .code-editor-wrapper {
          margin-bottom: 20px;
        }

        #editor {
          height: calc(${height} - 50px);
          border: 1px solid #ccc;
        }

        iframe {
          width: 100%;
          height: ${height};
          border: 1px solid;
        }
      </style>
      <div class="code-editor-wrapper">
        <div id="editor"></div>
        <button id="runButton">Run</button>
        <iframe id="output"></iframe>
      </div>
`;
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
	}

	loadMonaco() {
		const script = document.createElement('script');
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs/loader.min.js';
		script.onload = () => {
			// Configure Monaco loader
			window.require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs' } });
			window.require(['vs/editor/editor.main'], () => {
				this.initMonaco();
			});
		};
	  this.shadowRoot.appendChild(script);	  
	}

	initMonaco() {
		const initialCode = this.innerHTML.trim();

		this.editor = monaco.editor.create(this.shadowRoot?.getElementById("editor"), {
			value: initialCode,
			language: this.getAttribute("mode") || "javascript",
			theme: this.getAttribute("theme") || window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "vs-dark" : "vs-light",
			automaticLayout: true,
		});

		this.shadowRoot?.getElementById("runButton")?.addEventListener("click", () => {

		});
	}

	runCode() {
		const output = this.shadowRoot?.getElementById("output")?.contentWindow;

		output.document.open();
		output.doument.write("<script>" + this.editor.getValue() + "<\/script>");

		output.document.close();
	}
}

customElements.define("code-editor", CodeEditor);
