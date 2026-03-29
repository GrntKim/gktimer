import './style.css';
import './components/scramble';

const app = document.querySelector('#app');

app.innerHTML = `
    <main style="max-width: 800px; margin: 0 auto; padding: 2rem;">
        <cube-scramble></cube-scramble>
    </main>
`