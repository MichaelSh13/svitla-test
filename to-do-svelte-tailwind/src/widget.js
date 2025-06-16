import App from './App.svelte';

const target = document.getElementById('svelte-widget');
if (target) {
  new App({ target });
}