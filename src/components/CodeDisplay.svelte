<script lang="ts">
  import CodeEditor from './CodeEditor.svelte';
  import { onMount } from 'svelte';
  
  export let html : HTMLElement;
  export let js : HTMLElement;
  let htmlCode;
  let jsCode;

  onMount(async () => {
	jsCode = await fetch(js?.childNodes[1].firstChild.innerText).then((response) => response.text())	
	htmlCode = await fetch(html?.childNodes[1].firstChild.innerText).then((response) => response.text())
	$: console.log(jsCode);
	$: console.log(htmlCode);
  });
  
</script>

<style>
  .code-display {
	display: flex;
	flex-wrap: nowrap;
	justify-content: start;
	align-items: auto;
	align-content: start;
	/* height: 100vh; */
	/* width: 100vw; */
  }

  .code-display > CodeEditor {
	width: 50%;
	height: 100%;
  }
</style>

<!-- <span bind:this={html} style="display: none;"><slot name="html"></slot></span> -->
<!-- <span bind:this={js} style="display: none;"><slot name="js"></slot></span> -->

<div class="code-display">
  <CodeEditor code={htmlCode} lang="html"></CodeEditor>
  <CodeEditor code={jsCode} lang="javascript"></CodeEditor>
</div>
