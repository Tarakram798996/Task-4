// To-Do App
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => {
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    };
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

todoForm.onsubmit = (e) => {
  e.preventDefault();
  const value = todoInput.value.trim();
  if (value) {
    todos.push(value);
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInput.value = '';
    renderTodos();
  }
};

renderTodos();

// Product Listing
const products = [
  { name: "Smartphone", category: "electronics", price: 499, rating: 4.5 },
  { name: "Laptop", category: "electronics", price: 899, rating: 4.8 },
  { name: "Jeans", category: "clothing", price: 49, rating: 4.2 },
  { name: "Jacket", category: "clothing", price: 99, rating: 4.0 }
];

const categoryFilter = document.getElementById('category-filter');
const sortOptions = document.getElementById('sort-options');
const productList = document.getElementById('product-list');

function displayProducts(filteredProducts) {
  productList.innerHTML = '';
  filteredProducts.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price}</p>
      <p>Rating: ${product.rating}</p>
    `;
    productList.appendChild(div);
  });
}

function filterAndSortProducts() {
  let filtered = [...products];

  const category = categoryFilter.value;
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  const sort = sortOptions.value;
  if (sort === 'price-low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high-low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filtered);
}

categoryFilter.onchange = filterAndSortProducts;
sortOptions.onchange = filterAndSortProducts;

window.onload = () => displayProducts(products);
