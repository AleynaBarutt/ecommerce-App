
import React from 'react';
import ProductList from './components/ProductList';
import './App.css';

//App ana bileşeni. Tarayıcıya gösterilecek ana yapı burada.
function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>React E-Commerce Demo</h1>
      </header>

      <ProductList />
    </main>
  );
} 

//Bu bileşeni dışa aktarıyoruz ki index.js render edebilsin.
export default App;

