<script lang="ts">
  import CodeEditor from './CodeEditor.svelte';
  import { onMount } from 'svelte';
  
  let html : HTMLElement;
  let js : HTMLElement;
  let htmlCode;
  let jsCode;

  onMount(() => {
	htmlCode = html?.childNodes[1].firstChild.innerText;
	jsCode = js?.childNodes[1].firstChild.innerText;
  });

  
</script>

<style>
  .code-editor {
	display: flex;
	flex-wrap: nowrap;
	justify-content: start;
	align-items: auto;
	align-content: start;
	height: 100vh;
	width: 100vw;
  }  
</style>

<span bind:this={html} style="display: none;"><slot name="htmlCode"></slot></span>
<span bind:this={js} style="display: none;"><slot name="jsEditor"></slot></span>

<div class="code-editor">
  <CodeEditor code={htmlCode}></CodeEditor>
  <CodeEditor code={jsCode}></CodeEditor>
</div>
