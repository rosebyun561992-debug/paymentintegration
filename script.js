// Products List
const products = [
  {
    title: "ULTIMATE BEGINNER BUNDLE",
    price: 18,
    description: "Unlock a powerful new income stream with the Ultimate Beginner Bundle—a massive collection of high-converting, best-selling digital products and editable eBooks ready for you to rebrand and resell. Perfect for those looking to earn from home, this low-cost, low-effort bundle makes it easy to start your digital business without the overhead. Whether you want passive income or a full-fledged online hustle, the potential is in your hands—just customize, market, and start earning. Passive income has never been this accessible.",
    images: [
      "https://imgur.com/DaAfRvL.png",
      "https://imgur.com/hxhuU9T.png",
      "https://imgur.com/dT0ZZB8.png"
    ],
    link: "https://tinyurl.com/roseliedigitals1485"
  },
  {
    title: "ULTIMATE APP CREATION COURSE",
    price: 35,
    description: "The Ultimate App Creation Course is your all-in-one guide to building powerful, user-friendly mobile apps — no coding education degree experience required. You'll learn how to design, develop, and launch fully functional apps using beginner-friendly tools, proven strategies, and real-world examples. Whether you're a creative professional or aspiring entrepreneur, this course gives you the step-by-step blueprint to turn your app idea into a fully realized digital product.",
    images: [
      "https://imgur.com/UOm67aX.png",
      "https://imgur.com/hp87CQz.png",
      "https://imgur.com/T7baWpI.png"
    ],
    link: ""
  },
  {
    title: "ULTIMATE CASH COW POWERHOUSE",
    price: 50,
    description: "Unlock multiple income opportunities with the Ultimate Beginner Bundle + App Creation Course—your complete toolkit for launching a profitable digital business from home. This powerhouse package includes a massive collection of editable, high-converting digital products and eBooks ready for you to rebrand and resell, plus a beginner-friendly, step-by-step course that teaches you how to design, build, and launch fully functional mobile apps — no coding education degree required. Whether you're aiming for passive income or a full-blown online venture, you'll have everything you need to start strong: ready-to-sell products, expert strategies, and real-world app-building knowledge. Low-cost, low-hassle, and high-impact — it’s the ultimate starter kit for aspiring entrepreneurs and digital creators.",
    images: [
      "https://imgur.com/DaAfRvL.png",
      "https://imgur.com/hxhuU9T.png",
      "https://imgur.com/dT0ZZB8.png",
      "https://imgur.com/UOm67aX.png",
      "https://imgur.com/hp87CQz.png",
      "https://imgur.com/T7baWpI.png"
    ],
    link: ""
  }
];
// Your existing variables and functions remain unchanged
let selectedProduct = null;
let selectedPayment = null;

const productList = document.getElementById("product-list");
const paymentMethod = document.getElementById("payment-method");
const uploadSection = document.getElementById("upload-section");
const resultDiv = document.getElementById("result");
const backBtn = document.getElementById("back-btn");
const proceedBtn = document.getElementById("proceed-btn");
const proofFile = document.getElementById("proof-file");

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h2>${product.title}</h2>
      <p><strong>Price:</strong> $${product.price}</p>
      <p>${product.description}</p>
      <div class="images">
        ${product.images.map(img => `<img src="${img}" alt="Product Image" />`).join("")}
      </div>
      <button onclick="selectProduct(${index})">SELECT PRODUCT</button>
    `;
    productList.appendChild(div);
  });
}

window.selectProduct = function(index) {
  selectedProduct = products[index];
  document.querySelector(".title").textContent = "Choose Your Payment";
  productList.style.display = "none";
  paymentMethod.style.display = "flex";
  uploadSection.style.display = "none";
  resultDiv.innerHTML = "";
  backBtn.style.display = "block";
  renderPaymentOptions();
};

function renderPaymentOptions() {
  const finalPrice = selectedProduct.price;
  const paypalPrice = finalPrice + 2;

  paymentMethod.innerHTML = `
    <div class="payment-option">
      <h3>Remitly</h3>
      <p class="note">Recommended to Use</p>
      <p><strong>Country of the Payment Receiver:</strong> Philippines</p>
      <p><strong>Delivery Method:</strong> Mobile Money → GCash</p>
      <p><strong>Recipient Name:</strong> Roselie Ann F. Macaraig</p>
      <p><strong>Recipient Phone Number:</strong> +639653943628</p>
      <p><strong>Amount to Pay:</strong> $${finalPrice}</p>
      <button onclick="selectPayment('Remitly')">BUY NOW</button>
    </div>
    <div class="payment-option">
      <h3>PayPal</h3>
      <p class="note">With $2 additional fee for Transaction Fee</p>
      <p><strong>Payment Method:</strong> PayPal</p>
      <p><strong>Name:</strong> Roselie Ann F. Macaraig</p>
      <p><strong>Email:</strong> roselieann143@gmail.com</p>
      <p><strong>Amount to Pay:</strong> $${paypalPrice}</p>
      <button onclick="selectPayment('PayPal')">BUY NOW</button>
    </div>
  `;
}

window.selectPayment = function(method) {
  selectedPayment = method;
  paymentMethod.style.display = "none";
  uploadSection.style.display = "block";

  const priceToPay = selectedPayment === "PayPal" ? selectedProduct.price + 2 : selectedProduct.price;

  let paymentDetails = selectedPayment === "Remitly" ? `
    <p><strong>Country:</strong> Philippines</p>
    <p><strong>Delivery Method:</strong> Mobile Money → GCash</p>
    <p><strong>Recipient:</strong> Roselie Ann F. Macaraig</p>
    <p><strong>Phone:</strong> +639653943628</p>
  ` : `
    <p><strong>Payment Method:</strong> PayPal</p>
    <p><strong>Name:</strong> Roselie Ann F. Macaraig</p>
    <p><strong>Email:</strong> roselieann143@gmail.com</p>
  `;

  resultDiv.innerHTML = `
    <div class="directions" style="text-align: justify; max-width: 700px; margin: auto;">
      <strong>Direction To Use</strong><br/>
      Step 1: Choose your Preferred Way to pay then Save the Payment Details.<br/>
      Step 2: Send payment to the details provided.<br/>
      Step 3: Screenshot the Payment Receipt.<br/>
      Step 4: Upload it below and wait for confirmation.<br/><br/>
      ${paymentDetails}
      <p><strong>Amount to Pay:</strong> $${priceToPay}</p>
    </div>
  `;
};

proofFile.addEventListener("change", async () => {
  const file = proofFile.files[0];
  resultDiv.innerHTML += `<p style="color: orange;">Uploading and validating your proof of payment...</p>`;

  if (!file || !file.type.startsWith("image/")) {
    resultDiv.innerHTML += `<p style="color: red;">❌ Invalid file. Please upload an image.</p>`;
    proceedBtn.disabled = true;
    return;
  }

  proceedBtn.disabled = true;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("apikey", "K83460426188957");
  formData.append("isOverlayRequired", "false");

  try {
    const res = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    const text = data.ParsedResults?.[0]?.ParsedText?.toLowerCase() || "";

    let isValid = false;
    if (selectedPayment?.toLowerCase() === "remitly") {
      isValid = text.includes("roselie") || text.includes("9653943628");
    } else if (selectedPayment?.toLowerCase() === "paypal") {
      isValid = text.includes("roselieann143@gmail.com");
    }

    if (isValid) {
      resultDiv.innerHTML += `<p style="color: green;">✅ Proof verified successfully!</p>`;
      proceedBtn.disabled = false;
    } else {
      resultDiv.innerHTML += `<p style="color: red;">❌ Invalid proof of payment. Please upload a valid screenshot.</p>`;
      proceedBtn.disabled = true;
    }
  } catch (err) {
    console.error("OCR Error:", err);
    resultDiv.innerHTML += `<p style="color: red;">❌ Verification failed. Please try again later.</p>`;
    proceedBtn.disabled = true;
  }
});

proceedBtn.addEventListener("click", () => {
  if (!selectedProduct) return;

  resultDiv.innerHTML = `
    <p style="color: green;">Thank you for your payment!</p>
    ${selectedProduct.link ? `<a href="${selectedProduct.link}" target="_blank">Download your product</a>` : `<p>Link will be sent soon.</p>`}
  `;

  uploadSection.style.display = "none";
});

backBtn.addEventListener("click", () => {
  if (uploadSection.style.display === "block") {
    uploadSection.style.display = "none";
    paymentMethod.style.display = "flex";
    resultDiv.innerHTML = "";
    proofFile.value = "";
    proceedBtn.disabled = true;
  } else if (paymentMethod.style.display === "flex") {
    selectedProduct = null;
    document.querySelector(".title").textContent = "Choose Your Product";
    productList.style.display = "flex";
    paymentMethod.style.display = "none";
    backBtn.style.display = "none";
  }
});

renderProducts();


// ===== NEW ADMIN DASHBOARD FEATURE =====

// 1. Create floating admin button
const adminBtn = document.createElement("button");
adminBtn.textContent = "Admin Panel";
adminBtn.style.position = "fixed";
adminBtn.style.top = "10px";
adminBtn.style.left = "10px";
adminBtn.style.padding = "5px 10px";
adminBtn.style.zIndex = "9999";
adminBtn.style.background = "#333";
adminBtn.style.color = "#fff";
adminBtn.style.border = "none";
adminBtn.style.borderRadius = "5px";
adminBtn.style.cursor = "pointer";
document.body.appendChild(adminBtn);

// 2. Create admin overlay
const adminOverlay = document.createElement("div");
adminOverlay.style.position = "fixed";
adminOverlay.style.top = "0";
adminOverlay.style.left = "0";
adminOverlay.style.width = "100%";
adminOverlay.style.height = "100%";
adminOverlay.style.background = "#fff";
adminOverlay.style.zIndex = "10000";
adminOverlay.style.display = "none";
adminOverlay.style.overflowY = "auto";
adminOverlay.innerHTML = `
  <div style="padding: 20px;">
    <button id="admin-back-btn" style="padding: 5px 10px; background: #333; color: white; border: none; border-radius: 5px;">⬅ Back</button>
    <h1>Sales Dashboard</h1>
    <div id="sales-summary"></div>
    <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; margin-top: 20px;">
      <thead>
        <tr>
          <th>Date</th>
          <th>Product</th>
          <th>Amount</th>
          <th>Method</th>
          <th>Proof</th>
        </tr>
      </thead>
      <tbody id="sales-table"></tbody>
    </table>
  </div>
`;
document.body.appendChild(adminOverlay);

// 3. Open admin panel with password check
adminBtn.addEventListener("click", () => {
  const pass = prompt("Enter admin password:");
  if (pass === "SARANGhaeyo_1105") { // Change this password
    loadAdminData();
    adminOverlay.style.display = "block";
  } else {
    alert("Incorrect password");
  }
});

// 4. Back button in admin overlay
document.getElementById("admin-back-btn").addEventListener("click", () => {
  adminOverlay.style.display = "none";
});

// 5. Load data from Firebase (placeholder)
function loadAdminData() {
  // TODO: Replace with your actual Firebase logic
  const dummyData = [
    { date: "2025-08-09", product: "Ultimate Beginner Bundle", amount: 18, method: "Remitly", proof: "https://via.placeholder.com/50" },
    { date: "2025-08-09", product: "Ultimate App Creation Course", amount: 35, method: "PayPal", proof: "https://via.placeholder.com/50" }
  ];

  // Summary
  const totalRemitly = dummyData.filter(d => d.method === "Remitly").reduce((sum, d) => sum + d.amount, 0);
  const totalPayPal = dummyData.filter(d => d.method === "PayPal").reduce((sum, d) => sum + d.amount, 0);
  document.getElementById("sales-summary").innerHTML = `
    <p><strong>Total Remitly Sales:</strong> $${totalRemitly}</p>
    <p><strong>Total PayPal Sales:</strong> $${totalPayPal}</p>
  `;

  // Table
  const tbody = document.getElementById("sales-table");
  tbody.innerHTML = "";
  dummyData.forEach(sale => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${sale.date}</td>
      <td>${sale.product}</td>
      <td>$${sale.amount}</td>
      <td>${sale.method}</td>
      <td><img src="${sale.proof}" width="50"></td>
    `;
    tbody.appendChild(row);
  });
}