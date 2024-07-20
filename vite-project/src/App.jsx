import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('telefono');
  const [offset, setOffset] = useState(0);
  const [input, setInput] = useState('')


  useEffect(() => {
    fetchMLApi()
    scroll(0, 0)
    console.log(products)
  }, [searchTerm, offset]);

  function fetchMLApi() {
    fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${searchTerm}&limit=20&offset=${offset}`)
      .then(response => response.json())
      .then(data => setProducts(data.results))
      .catch(error => setError(error));
  }

  function handleEnter(event) {
    if (event.key === 'Enter') {
      console.log('pressed enter kka')
      setSearchTerm(input)
    }
  }

  return (
    <div className='container mx-auto'>
      <div className='flex w-full p-2'>
        <input
          className='bg-slate-100 flex-1 rounded-md pl-2'
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDownCapture={handleEnter}
          placeholder="Busca un producto..."
        />
        <button className='bg-gray-200 px-4 py-2 ml-2 rounded-md' onClick={() => setSearchTerm(input)}>Buscar</button>
      </div>

      <div className='md:grid grid-cols-5'>

        {products.map(product => (
          <div key={product.id}
            className='p-2 shadow-md hover:shadow-lg m-2 rounded-lg hover:scale-110 transition'>
            <img src={product.thumbnail} className="w-full h-48 object-contain" alt="" />
            <h2 className='line-clamp-2 font-bold '>{product.title}</h2>
            <div className='flex items-center'>
              <p className='mr-2'>${product.price}</p>
              <p className='text-green-600 font-bold'>
                {product.shipping.free_shipping ? 'Envío gratis' : ''}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center my-4'>

        {offset == 0 ?
          <button className='bg-gray-200 p-2 rounded-md' onClick={() => setOffset(offset + 1)}> Siguiente </button>
          :
          <>
            <button className='mx-1 bg-gray-200 p-2 rounded-md' onClick={() => setOffset(offset - 1)}> Anterior</button>
            <button className='mx-1 bg-gray-200 p-2 rounded-md' onClick={() => setOffset(offset + 1)}> Siguiente </button>
          </>
        }

      </div>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default App;
