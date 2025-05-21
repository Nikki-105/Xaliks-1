const sections = [
    "home",
    "cart",
    "profile",
    "payment",
    "product-detail",
    "menu",
];
const cart = [];

function updateSummary() {
    const orderEl = document.getElementById("order-summary");
    orderEl.innerHTML = "";
    let subtotal = 0;
    cart.forEach((item) => {
        const itemTotal = item.qty * item.price;
        subtotal += itemTotal;
        orderEl.innerHTML += `<div class="flex justify-between"><span>${item.name} (x${item.qty})</span><span>₹${itemTotal}</span></div>`;
    });

    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax - discount;

    document.getElementById("subtotal").innerText = `₹${subtotal}`;
    document.getElementById("tax").innerText = `₹${tax}`;
    document.getElementById("discount").innerText = `₹${total - discount}`;
    document.getElementById("total").innerText = `₹${total}`;
}

function submitPayment() {
    const paymentMethod = document.querySelector(
        'input[name="payment"]:checked'
    ).value;
    alert(
        `Processing your payment via ${paymentMethod}. Thank you for shopping with Xaliks!`
    );
    // You can redirect or trigger backend payment gateway here
}

const categories = [
    "Festive",
    "Minimal",
    "Photo Print",
    "Quotes",
    "Cartoon",
    "Logo",
    "Streetwear",
    "Anime",
    "Abstract",
    "Sports",
];
const products = [{
        id: 1,
        name: "Black Authentic",
        price: 599,
        color: "White",
        category: "Minimal",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/make-it-happen_14fa3ba3-0fff-407d-81a3-61265afbb624.jpg?v=1722233587",
    },
    {
        id: 2,
        name: "Vibe Shift Crew",
        price: 599,
        color: "White",
        category: "Minimal",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/make-it-happen_14fa3ba3-0fff-407d-81a3-61265afbb624.jpg?v=1722233587",
    },
    {
        id: 3,
        name: "Neon Pop Shirt",
        price: 699,
        color: "Red",
        category: "Abstract",
        image: "https://image.hm.com/assets/hm/e4/89/e48924ece823f919263814643ee0aa14e5557bee.jpg?imwidth=1260",
    },
    {
        id: 4,
        name: "Tropic Wave Tee",
        price: 549,
        color: "Green",
        category: "Festive",
        image: "https://unstd.in/cdn/shop/files/SAGE-GREEN-2.jpg?v=1734507963&width=1200",
    },
    {
        id: 5,
        name: "Zen Mode Tee",
        price: 459,
        color: "Blue",
        category: "Quotes",
        image: "https://unstd.in/cdn/shop/files/red_2d00f354-3cfc-45e3-ae4d-d162d9bf815e.jpg?v=1744423015&width=1000",
    },
    {
        id: 6,
        name: "Pixel Art Tee",
        price: 749,
        color: "Purple",
        category: "Cartoon",
        image: "https://image.hm.com/assets/hm/a5/93/a59385f75e8db1455d9de67b30f9d7820c13cb81.jpg?imwidth=1260",
    },
    {
        id: 7,
        name: "Retro Rider Tee",
        price: 599,
        color: "Orange",
        category: "Vintage",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48nlvQVirHPhnOCHjdUVmtDiat-xivyEP_g&usqp=CAU",
    },
    {
        id: 9,
        name: "Street Graffiti Tee",
        price: 699,
        color: "Multicolor",
        category: "Streetwear",
        image: "https://rukminim2.flixcart.com/image/786/972/xif0q/t-shirt/4/q/6/xl-anime-printed-tshirt-for-mens-zen1fashion-original-imagtdrxzngc5ghs.jpeg?q=60&crop=false",
    },
    {
        id: 10,
        name: "Bold & Brave Tee",
        price: 799,
        color: "Yellow",
        category: "Quotes",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUzyu1gF2jXzp7bYmDgwId8KZU2G-pahhSAA&usqp=CAU",
    },
];

const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Lakshadweep", "Puducherry"
];

function displaySection(id) {
    sections.forEach((sec) =>
        document.getElementById(sec).classList.add("hidden")
    );
    document.getElementById(id).classList.remove("hidden");
    if (id === "cart") updateCart();
    if (id === "menu") renderMenu();
}

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", function() {
    const query = this.value.toLowerCase().trim();
    if (query === "") {
        renderProducts(products);
    } else {
        const filtered = products.filter(
            (p) =>
            p.name.toLowerCase().includes(query) ||
            p.color.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    }
});

function renderProducts(filteredProducts = products) {
    const container = document.getElementById("productList");
    container.innerHTML = "";

    const visibleProducts = filteredProducts.slice(0, 12);
    if (visibleProducts.length === 0) {
        noResults.classList.remove("hidden");
    } else {
        noResults.classList.add("hidden");
        visibleProducts.forEach((p) => {
            container.innerHTML += productCard(p);
        });
    }
}

function productCard(p) {
    return `
    <div class="bg-white rounded-xl shadow p-2 transition hover:scale-105 duration-300 text-center">
        <img src="${p.image}" alt="${p.name}" class="h-36 w-full object-cover bg-gray-200 rounded mb-2">
        <h3 class="text-sm font-bold mt-1">${p.name}</h3>
        <p class="text-xs text-gray-500">${p.color}</p>
        <p class="text-black font-bold text-sm">₹${p.price}</p>
        <button onclick="viewProduct(${p.id})" class="mt-2 text-xs px-2 py-1 bg-black text-white rounded hover:bg-blue-700 w-full">View</button>
    </div>`;
}

function viewProduct(id) {
    const product = products.find((p) => p.id === id);
    const detail = document.getElementById("product-detail");

    // Example: Add more images, rating, reviews, stock, highlights to your product data
    const images = product.images || [product.image];
    const rating = product.rating || 4.3;
    const reviews = product.reviews || 87;
    const stock = product.stock || "In Stock";
    const highlights = product.highlights || [
        "100% Cotton",
        "Regular Fit",
        "Machine Washable",
        "Free Returns"
    ];

    // Recommendations
    const recommendations = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const recHTML =
        recommendations.length > 0 ?
        `
    <h3 class="text-lg font-semibold mt-8 mb-4 text-white">You may also like</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${recommendations.map((p) => productCard(p)).join("")}
    </div>
` :
        "";

    // Thumbnails
    const thumbnails = images
        .map(
            (img, i) =>
            `<img src="${img}" class="w-16 h-16 object-cover rounded border cursor-pointer ${i === 0 ? "border-blue-500" : "border-gray-300"}" onclick="document.getElementById('main-img').src='${img}'">`
        )
        .join("");

    // Highlights
    const highlightsHTML = highlights
        .map((h) => `<li class="mb-1">• ${h}</li>`)
        .join("");

    detail.innerHTML = `
    <button onclick="displaySection('home')" class="text-blue-500 mb-4">← Back</button>
    <div class="bg-white p-4 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img id="main-img" src="${images[0]}" class="rounded-xl w-full h-80 object-cover mb-2 transition-all duration-200 hover:scale-105" style="max-height:320px;">
        <div class="flex gap-2">${thumbnails}</div>
      </div>
      <div>
        <h2 class="text-2xl font-bold mb-2">${product.name}</h2>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-yellow-500 font-bold">${"★".repeat(Math.floor(rating))}${"☆".repeat(5 - Math.floor(rating))}</span>
          <span class="text-gray-600 text-sm">(${reviews} reviews)</span>
        </div>
        <p class="text-sm text-gray-500 mb-1">Color: ${product.color}</p>
        <p class="text-sm mb-1"><span class="font-semibold">Category:</span> ${product.category}</p>
        <p class="text-sm mb-1"><span class="font-semibold">Status:</span> <span class="${stock === "In Stock" ? "text-green-600" : "text-red-600"}">${stock}</span></p>
        <p class="text-xl font-semibold text-yellow-600 mb-4">₹${product.price}</p>
        <ul class="mb-4 text-sm text-gray-700">${highlightsHTML}</ul>
        <label>Quantity: </label>
        <input id="qty" type="number" min="1" value="1" class="w-20 p-1 border rounded" />
        <button onclick="addToCart(${product.id})" class="ml-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-900">Add to Cart</button>
        <button onclick="buyNow(${product.id})" class="ml-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600">Buy Now</button>
        <button onclick="addToWishlist(${product.id})" class="ml-2 bg-pink-100 text-pink-600 px-3 py-2 rounded hover:bg-pink-200">♡ Wishlist</button>
        <div class="mt-4 flex gap-2">
          <input id="pincode" type="text" maxlength="6" placeholder="Enter Pincode" class="border p-1 rounded w-32" />
          <button onclick="checkDelivery()" class="bg-blue-500 text-white px-2 py-1 rounded">Check Delivery</button>
        </div>
        <div id="delivery-msg" class="text-sm mt-1"></div>
        <div class="mt-4 flex gap-2">
          <button onclick="shareProduct('${product.name}', '${location.href}')" class="bg-gray-200 px-2 py-1 rounded">Share</button>
        </div>
      </div>
    </div>
    ${recHTML}
  `;

    displaySection("product-detail");
}

// Add these helper functions:
function addToWishlist(id) {
    alert("Added to wishlist!");
}

function buyNow(id) {
    addToCart(id);
    displaySection("cart");
}

function checkDelivery() {
    const pincode = document.getElementById("pincode").value.trim();
    const msg = document.getElementById("delivery-msg");
    if (/^\d{6}$/.test(pincode)) {
        msg.textContent = "Delivery available!";
        msg.className = "text-green-600 mt-1";
    } else {
        msg.textContent = "Please enter a valid 6-digit pincode.";
        msg.className = "text-red-600 mt-1";
    }
}

function shareProduct(name, url) {
    if (navigator.share) {
        navigator.share({
            title: name,
            url
        });
    } else {
        navigator.clipboard.writeText(url);
        alert("Product link copied!");
    }
}

function addToCart(id) {
    const product = products.find((p) => p.id === id);
    const qty = parseInt(document.getElementById("qty")?.value || 1);
    console.log(qty);
    if (qty > 0) {
        const existing = cart.find((item) => item.id === id);
        if (existing) existing.qty += qty;
        else
            cart.push({
                ...product,
                qty,
            });
        document.getElementById("cart-count").textContent = cart.reduce(
            (a, c) => a + c.qty,
            0
        );
        alert(`${product.name} added to cart!`);
    } else {
        alert("Min quantity 0<or>100");
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty < 1) cart[index].qty = 1;
    updateCart();
}

function applyCoupon() {
    const input = document.getElementById("coupon").value.trim().toUpperCase();

    if (coupons[input]) {
        discount = coupons[input];
        alert(`Coupon applied! ₹${discount} off.`);
    } else {
        discount = 0;
        alert("Invalid coupon code.");
    }

    updateCart(); // Update cart summary
    updateOrderSummary(); // Update payment summary
}

function updateCart() {
    const items = document.getElementById("cart-items");
    const totalSpan = document.getElementById("cart-total");
    items.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.qty;
        items.innerHTML += `<div class="flex justify-between items-center bg-white p-4 rounded shadow">
            <div class="flex justify-between items-center">
                <img class="h-36 w-fit object-cover bg-gray-200 rounded mb-2" src="${item.image
            }" alt="${item.name}">
                <div class="m-5">
                    <h4 class="font-semibold text-black">${item.name}</h4>
                    <p class="text-sm text-gray-600">Unit Price: ₹${item.price
            }</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button onclick="updateQty(${index}, -1)" class="bg-gray-200 px-2 text-black">-</button>
                        <span class="text-black">${item.qty}</span>
                        <button onclick="updateQty(${index}, 1)" class="bg-gray-200 px-2 text-black">+</button>
                    </div>
                    <p class="text-sm text-green-600 mt-2">Subtotal: ₹${item.price * item.qty
            }</p>
                </div>
            </div>
            <div><button onclick="removeItem(${index})" class="text-red-500 transition">Remove</button></div>
        </div>`;
    });
    total -= (total * discount) / 100;
    totalSpan.textContent = total.toFixed(2);
    let count = document.getElementById("cart-count")
    count.textContent = cart.reduce(
        (a, c) => a + c.qty,
        0
    );

    let msgOfCartCount = document.getElementById("msgOfCartCount");
    console.log(count.textContent);
    if (count.textContent === "0") {
        // console.log(count.textContent);        
        msgOfCartCount.textContent = "No items were added";
    } else {
        msgOfCartCount.textContent = "";
    }
    updateOrderSummary();
}

function goToPayment() {
    displaySection("payment");
}

function renderMenu() {
    const buttons = document.getElementById("category-buttons");
    buttons.innerHTML = categories
        .map(
            (cat) =>
            `<button onclick="showCategory('${cat}')" class="bg-yellow-100 px-3 py-1 rounded hover:bg-yellow-300 text-sm">${cat}</button>`
        )
        .join("");
    showCategory(categories[0]);
}

function showCategory(category) {
    const filtered = products
        .filter((p) => p.category === category)
        .slice(0, 12);
    const items = document.getElementById("menu-items");
    items.innerHTML = filtered.map(productCard).join("");
}

const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
navToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
});

function clk() {
    mobileNav.classList.toggle("hidden");
}

// Fill state dropdowns
function fillStateDropdown(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = '<option value="">Select State</option>' + indianStates.map(
        s => `<option value="${s}">${s}</option>`
    ).join('');
}

// --- Profile Section Logic ---
const defaultProfile = {
    name: "X User",
    email: "xaliks@example.com",
    phone: "+91 98765 43210",
    img: "https://randomuser.me/api/portraits/men/5.jpg",
    addresses: [{
        name: "Johnny Sins",
        phone: "+91 98765 43210",
        email: "johnny@example.com",
        addressLine: "Street no 8, GB Road, Hyderabad",
        pincode: "500072",
        state: "Telangana"
    }]
};

let editingAddressIndex = null;

// Show modal for adding new address
document.getElementById('add-new-address-btn').onclick = function() {
    editingAddressIndex = null; // Make sure we're adding, not editing
    document.getElementById('address-modal-title').textContent = 'Add Address';
    fillStateDropdown("edit-address-state");
    document.getElementById('edit-address-form').reset();
    document.getElementById('edit-address-modal').classList.remove('hidden');
};

// Show/hide saved addresses section
document.getElementById('show-saved-addresses-btn').onclick = function() {
    const section = document.getElementById('saved-addresses-section');
    section.classList.toggle('hidden');
};

// Open modal for editing address
function openEditAddressModal(i) {
    editingAddressIndex = i;
    fillStateDropdown("edit-address-state");
    const profile = getProfile();
    const addr = profile.addresses[i];
    document.getElementById("address-modal-title").textContent = "Edit Address";
    document.getElementById("edit-address-name").value = addr.name;
    document.getElementById("edit-address-phone").value = addr.phone;
    document.getElementById("edit-address-email").value = addr.email;
    document.getElementById("edit-address-line").value = addr.addressLine;
    document.getElementById("edit-address-pincode").value = addr.pincode;
    document.getElementById("edit-address-state").value = addr.state;
    document.getElementById("edit-address-modal").classList.remove("hidden");
}

// Close modal
function closeEditAddressModal() {
    editingAddressIndex = null;
    document.getElementById("edit-address-modal").classList.add("hidden");
}

// Save address (add or edit)
function saveEditedAddress(e) {
    e.preventDefault();
    const profile = getProfile();
    const newAddr = {
        name: document.getElementById("edit-address-name").value.trim(),
        phone: document.getElementById("edit-address-phone").value.trim(),
        email: document.getElementById("edit-address-email").value.trim(),
        addressLine: document.getElementById("edit-address-line").value.trim(),
        pincode: document.getElementById("edit-address-pincode").value.trim(),
        state: document.getElementById("edit-address-state").value
    };
    if (editingAddressIndex === null) {
        profile.addresses.push(newAddr); // Add new
    } else {
        profile.addresses[editingAddressIndex] = newAddr; // Edit existing
    }
    setProfile(profile);
    closeEditAddressModal();
    showProfile();
}

function getProfile() {
    return JSON.parse(localStorage.getItem("profile") || "null") || defaultProfile;
}

function setProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
}

function showProfile() {
    const profile = getProfile();
    document.getElementById("profile-img").src = profile.img || defaultProfile.img;
    document.getElementById("profile-name").textContent = profile.name;
    document.getElementById("profile-email").textContent = profile.email;
    document.getElementById("profile-phone").textContent = `Phone: ${profile.phone}`;
    // Render saved addresses
    const addrList = document.getElementById("address-list");
    addrList.innerHTML = "";
    profile.addresses.forEach((addr, i) => {
        addrList.innerHTML += `
      <div class="flex flex-col md:flex-row md:items-center justify-between bg-gray-100 rounded p-2 mb-2">
        <div>
          <div><b>${addr.name}</b> (${addr.phone})</div>
          <div>${addr.addressLine}, ${addr.state} - ${addr.pincode}</div>
          <div class="text-xs text-gray-500">${addr.email}</div>
        </div>
        <div class="mt-2 md:mt-0">
          <button onclick="openEditAddressModal(${i})" class="text-blue-500 hover:underline mr-2">Edit</button>
          <button onclick="removeAddress(${i})" class="text-red-500 hover:underline">Remove</button>
        </div>
      </div>`;
    });
    renderBillingAddresses();
}

function editProfile() {
    const profile = getProfile();
    document.getElementById("profile-view").classList.add("hidden");
    document.getElementById("profile-edit").classList.remove("hidden");
    document.getElementById("edit-name").value = profile.name;
    document.getElementById("edit-email").value = profile.email;
    document.getElementById("edit-phone").value = profile.phone;
}

function saveProfile(e) {
    e.preventDefault();
    const profile = getProfile();
    profile.name = document.getElementById("edit-name").value;
    profile.email = document.getElementById("edit-email").value;
    profile.phone = document.getElementById("edit-phone").value;
    setProfile(profile);
    document.getElementById("profile-edit").classList.add("hidden");
    document.getElementById("profile-view").classList.remove("hidden");
    showProfile();
}

function cancelEditProfile() {
    document.getElementById("profile-edit").classList.add("hidden");
    document.getElementById("profile-view").classList.remove("hidden");
}

function changeProfileImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const profile = getProfile();
        profile.img = evt.target.result;
        setProfile(profile);
        showProfile();
    };
    reader.readAsDataURL(file);
}

function addAddress(e) {
    e.preventDefault();
    const profile = getProfile();
    profile.addresses.push({
        name: document.getElementById("address-name").value.trim() || profile.name,
        phone: document.getElementById("address-phone").value.trim(),
        email: document.getElementById("address-email").value.trim(),
        addressLine: document.getElementById("address-line").value.trim(),
        pincode: document.getElementById("address-pincode").value.trim(),
        state: document.getElementById("address-state").value
    });
    setProfile(profile);
    e.target.reset();
    showProfile();
}

function removeAddress(i) {
    const profile = getProfile();
    profile.addresses.splice(i, 1);
    setProfile(profile);
    showProfile();
}

// Show modal for adding new address
document.getElementById('add-new-address-btn').onclick = function() {
    editingAddressIndex = null; // Make sure we're adding, not editing
    document.getElementById('address-modal-title').textContent = 'Add Address';
    fillStateDropdown("edit-address-state");
    document.getElementById('edit-address-form').reset();
    document.getElementById('edit-address-modal').classList.remove('hidden');
};

// Show/hide saved addresses section
document.getElementById('show-saved-addresses-btn').onclick = function() {
    const section = document.getElementById('saved-addresses-section');
    section.classList.toggle('hidden');
};

function saveEditedAddress(e) {
    e.preventDefault();
    const profile = getProfile();
    const newAddr = {
        name: document.getElementById("edit-address-name").value.trim(),
        phone: document.getElementById("edit-address-phone").value.trim(),
        email: document.getElementById("edit-address-email").value.trim(),
        addressLine: document.getElementById("edit-address-line").value.trim(),
        pincode: document.getElementById("edit-address-pincode").value.trim(),
        state: document.getElementById("edit-address-state").value
    };
    if (editingAddressIndex === null) {
        profile.addresses.push(newAddr); // Add new
    } else {
        profile.addresses[editingAddressIndex] = newAddr; // Edit existing
    }
    setProfile(profile);
    closeEditAddressModal();
    showProfile();
}

// --- Billing Address Logic ---
let billingEditingIndex = null;

function renderBillingAddresses() {
    fillStateDropdown("billing-address-state");
    const profile = getProfile();
    const container = document.getElementById("billing-addresses");
    if (!container) return;
    container.innerHTML = "";
    if (!profile.addresses.length) {
        container.innerHTML = `<div class="text-red-500 mb-2">No saved addresses. Please add one in your profile.</div>`;
        return;
    }
    profile.addresses.forEach((addr, i) => {
        container.innerHTML += `
      <div class="flex flex-col md:flex-row md:items-center justify-between bg-gray-100 rounded p-2 mb-2">
        <label class="flex-1 flex items-center gap-2">
          <input type="radio" name="billing-address" value="${i}" ${i === 0 ? "checked" : ""} onchange="updateOrderSummaryAddress()" />
          <div>
            <div><b>${addr.name}</b> (${addr.phone})</div>
            <div>${addr.addressLine}, ${addr.state} - ${addr.pincode}</div>
            <div class="text-xs text-gray-500">${addr.email}</div>
          </div>
        </label>
        <div class="mt-2 md:mt-0">
          <button onclick="openBillingEditAddressModal(${i})" class="text-blue-500 hover:underline mr-2">Edit</button>
        </div>
      </div>`;
    });
    updateOrderSummaryAddress();
}

document.getElementById("add-new-billing-address-btn").onclick = function() {
    billingEditingIndex = null;
    fillStateDropdown("billing-address-state");
    document.getElementById("billing-modal-title").textContent = "Add Address";
    document.getElementById("billing-edit-address-form").reset();
    document.getElementById("billing-address-name").value = getProfile().name;
    document.getElementById("billing-edit-address-modal").classList.remove("hidden");
};

function openBillingEditAddressModal(i) {
    billingEditingIndex = i;
    fillStateDropdown("billing-address-state");
    const addr = getProfile().addresses[i];
    document.getElementById("billing-modal-title").textContent = "Edit Address";
    document.getElementById("billing-address-name").value = addr.name;
    document.getElementById("billing-address-phone").value = addr.phone;
    document.getElementById("billing-address-email").value = addr.email;
    document.getElementById("billing-address-line").value = addr.addressLine;
    document.getElementById("billing-address-pincode").value = addr.pincode;
    document.getElementById("billing-address-state").value = addr.state;
    document.getElementById("billing-edit-address-modal").classList.remove("hidden");
}

function closeBillingEditAddressModal() {
    billingEditingIndex = null;
    document.getElementById("billing-edit-address-modal").classList.add("hidden");
}

function saveBillingAddress(e) {
    e.preventDefault();
    const profile = getProfile();
    const newAddr = {
        name: document.getElementById("billing-address-name").value.trim(),
        phone: document.getElementById("billing-address-phone").value.trim(),
        email: document.getElementById("billing-address-email").value.trim(),
        addressLine: document.getElementById("billing-address-line").value.trim(),
        pincode: document.getElementById("billing-address-pincode").value.trim(),
        state: document.getElementById("billing-address-state").value
    };
    if (billingEditingIndex === null) {
        profile.addresses.push(newAddr);
    } else {
        profile.addresses[billingEditingIndex] = newAddr;
    }
    setProfile(profile);
    closeBillingEditAddressModal();
    renderBillingAddresses();
    showProfile();
}

// Update order summary with selected address
function updateOrderSummaryAddress() {
    const profile = getProfile();
    const selectedIdx = parseInt(document.querySelector('input[name="billing-address"]:checked')?.value || 0);
    const summary = document.getElementById("order-summary");
    if (summary && profile.addresses[selectedIdx]) {
        const addr = profile.addresses[selectedIdx];
        let addrHtml = `<div class="mb-2 p-2 bg-gray-100 rounded text-sm text-gray-700">
      <span class="font-semibold">Deliver to:</span> ${addr.name}, ${addr.addressLine}, ${addr.state} - ${addr.pincode} (${addr.phone})
    </div>`;
        summary.innerHTML = addrHtml + summary.innerHTML.replace(/<div class="mb-2 p-2 bg-gray-100[^>]*>[\s\S]*?<\/div>/, "");
    }
}

// --- Simple Login System ---
function loginUser() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }
    // For demo, accept any email/password
    let profile = getProfile();
    profile.email = email;
    setProfile(profile);
    localStorage.setItem("loggedIn", "true");
    showProfile();
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("profile-section").classList.remove("hidden");
}

function logoutUser() {
    localStorage.setItem("loggedIn", "false");
    document.getElementById("profile-section").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");
}

function checkLogin() {
    if (localStorage.getItem("loggedIn") === "true") {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("profile-section").classList.remove("hidden");
        showProfile();
    } else {
        document.getElementById("profile-section").classList.add("hidden");
        document.getElementById("login-section").classList.remove("hidden");
    }
}

// Order Summary Logic
let discount = 0;

const coupons = {
    TEE10: 10,
    FEST20: 20,
    WELCOME15: 15,
    FIRSTBUY25: 25,
    SUMMER30: 30,
    NEWUSER5: 5,
    COMBO50: 50,
    SAVE40: 40,
    TEE2025: 20,
    OFFER100: 10,
    MEGA15: 15,
    HOLIDAY50: 50,
    BLACKFRIDAY: 40,
    FREESHIP: 5,
    FLASH10: 10,
    LIMITED25: 25,
    EXTRA30: 30,
    SPRING20: 20,
    FASHION35: 35,
    WINTER40: 40,
};

function applyCoupon() {
    const input = document.getElementById("coupon").value.trim().toUpperCase();

    if (coupons[input]) {
        discount = coupons[input];
        alert(`Coupon applied! ₹${discount} off.`);
    } else {
        discount = 0;
        alert("Invalid coupon code.");
    }

    updateCart(); // Update cart summary
    updateOrderSummary(); // Update payment summary
}

function updateOrderSummary() {
    const cartItems = cart;
    const summaryEl = document.getElementById("order-summary");
    let summary = `<h2 style="font-weight:bold;font-size:1.5em;margin-bottom: 20px;">ORDER SUMMARY</h2>`;
    let total = 0;

    // List items with flex layout
    cartItems.forEach(item => {
        const itemTotal = item.price * item.qty;
        summary += `<div style="display:flex;justify-content:space-between;">
            <span>${item.name} x ${item.qty}</span>
            <span>₹${itemTotal}</span>
        </div>`;
        total += itemTotal;
    });

    summary += `<hr style="margin:12px 0; border: none; height: 1   px; background-color: #000;">`;


    // Separator line (console only)
    console.log('______________________________');

    // Billing calculations
    const tax = +(total * 0.05).toFixed(2);
    const subtotal = +(total + tax).toFixed(2);
    const discountAmt = +(subtotal * (discount / 100)).toFixed(2);
    const finalBilling = +(subtotal - discountAmt).toFixed(2);

    // Billing part with flex layout
    summary += `<div style="display:flex;justify-content:space-between;"><span>Total</span><span>₹${total}</span></div>`;
    summary += `<div style="display:flex;justify-content:space-between;"><span>Tax</span><span>5%</span></div>`;
    summary += `<div style="display:flex;justify-content:space-between;"><span>Subtotal</span><span>₹${subtotal}</span></div>`;
    summary += `<div style="display:flex;justify-content:space-between;"><span>Discount</span><span>₹${discountAmt}</span></div>`;
    summary += `<hr style="margin:8px 0;">`;
    summary += `<div style="display:flex;justify-content:space-between;font-weight:bold;font-size:1.4em;"><span>Final Billing</span><span>₹${finalBilling}</span></div>`;

    summaryEl.innerHTML = summary;
}


function goToPayment() {
    document.getElementById("cart").classList.add("hidden");
    document.getElementById("payment").classList.remove("hidden");
    updateOrderSummary();
}

// Call on page load and when switching to profile
checkLogin();
const oldDisplaySection = displaySection;
displaySection = function(id) {
    oldDisplaySection(id);
    if (id === "profile") checkLogin();
    if (id === "payment") renderBillingAddresses();
};
// Initial load
renderProducts();
displaySection("home");