import logo from './logo.svg';

function App() {
  return (
    <div className="text-center">
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-white text-xl">
        <img src={logo} className="h-[40vmin] pointer-events-none my-10 animate-pulse" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] my-5"
          href="https://tailwindcss.com/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Tailwind
        </a>
      </header>
    </div>
  );
}

export default App;
