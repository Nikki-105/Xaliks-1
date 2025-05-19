// Replace these with your own Supabase project details:
const supabaseUrl = 'https://your-project-ref.supabase.co';
const supabaseKey = 'your-anon-public-api-key';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function loadProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading products:', error);
    return;
  }

  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = '';

  data.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'bg-white p-4 rounded shadow';

    productCard.innerHTML = `
      <img src="${product.image_url || 'https://via.placeholder.com/150'}" alt="${product.name}" class="w-full h-48 object-cover rounded" />
      <h2 class="mt-2 text-xl font-semibold">${product.name}</h2>
      <p class="text-gray-700">$${product.price}</p>
      <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="orderProduct(${product.id}, '${product.name}', ${product.price})">Order Now</button>
    `;

    productsDiv.appendChild(productCard);
  });
}

async function orderProduct(id, name, price) {
  const quantity = parseInt(prompt(`How many "${name}" do you want to order?`, '1'));
  if (!quantity || quantity < 1) return alert('Invalid quantity');

  const customer_name = prompt('Enter your name:');
  if (!customer_name) return alert('Name is required');

  const customer_email = prompt('Enter your email:');
  if (!customer_email) return alert('Email is required');

  const total_price = quantity * price;

  const { data, error } = await supabase
    .from('orders')
    .insert([{ product_id: id, quantity, customer_name, customer_email, total_price }]);

  if (error) {
    alert('Order failed: ' + error.message);
    return;
  }

  alert(`Order successful! Total: $${total_price.toFixed(2)}`);
}

loadProducts();
