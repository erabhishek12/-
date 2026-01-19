/* ============================================
   DUDH WALA - Complete JavaScript
   Version: 1.0.0
   Author: Dudh Wala Team
   ============================================ */

"use strict";

/* ============================================
   CONFIGURATION
   ============================================ */
const CONFIG = {
  // Firebase Configuration
  
  firebase: {
    apiKey: "AIzaSyB58oJpvSdFSvIeVF5w1VGwDcxlg0t4UcA",
    authDomain: "udhwala-259c0.firebaseapp.com",
    projectId: "dudhwala-259c0",
    storageBucket: "dudhwala-259c0.firebasestorage.app",
    messagingSenderId: "800908206581",
    appId: "1:800908206581:web:c76faaaa942df9920380bc",
  },

  // Google Apps Script Web App URL

  apiUrl:
    "https://script.google.com/macros/s/AKfycbxf2px2kSl4OatmdJS2RR9WaRnkJ2r0aKg8E1GTtk3oBOOjAyF9eQPY212sGwiuEgcK3w/exec",

  // Tips & Tricks Sheet ID (public read)
  tipsSheetId: "1mEKPCZeyy1pZSlYpBg7BGMghgWeaMmfIQ5Qp2JcxgW8",

  // App Settings
  app: {
    name: "Dudh Wala",
    nameHindi: "दूध वाला",
    version: "1.0.0",
    syncInterval: 5 * 60 * 1000, // 5 minutes
    toastDuration: 3000,
    defaultCowRate: 58,
    defaultBuffaloRate: 72,
  },

  // Tutorial Video URL
  tutorialVideoId: "YOUR_YOUTUBE_VIDEO_ID",
};

/* ============================================
   APP STATE
   ============================================ */
const APP = {
  // Current state
  state: {
    isOnline: navigator.onLine,
    isLoggedIn: false,
    currentUser: null,
    currentPage: "login",
    previousPage: null,
    currentLanguage: "hi",
    lastSyncTime: null,
    pendingSyncCount: 0,
  },

  // Page params (for passing data between pages)
  pageParams: {},

  // Cached data
  cache: {
    customers: [],
    settings: null,
    currentCustomer: null,
    currentMonth: new Date(),
    entryDate: new Date(),
    entryShift: "morning",
    reportDate: new Date(),
    reportMonth: new Date(),
    reportYear: new Date().getFullYear(),
    reportType: "daily",
  },

  // Confirmation callback
  confirmCallback: null,

  // Numpad state
  numpad: {
    customerId: null,
    customerName: "",
    milkType: "buffalo",
    cowRate: 58,
    buffaloRate: 72,
    quantity: "0",
    isEdit: false,
    entryId: null,
  },
};

/* ============================================
   LANGUAGE TRANSLATIONS
   ============================================ */
const LANG = {
  hi: {
    appName: "दूध वाला",
    home: "होम",
    customers: "ग्राहक",
    reports: "रिपोर्ट",
    settings: "सेटिंग्स",
    quickEntry: "त्वरित एंट्री",
    morning: "सुबह",
    evening: "शाम",
    cow: "गाय",
    buffalo: "भैंस",
    kg: "किलो",
    paav: "पाव",
    save: "सेव करें",
    cancel: "रद्द करें",
    delete: "हटाएं",
    edit: "बदलें",
    add: "जोड़ें",
    search: "खोजें",
    todayMilk: "आज का दूध",
    todayIncome: "आज की आमदनी",
    activeCustomers: "सक्रिय ग्राहक",
    pendingDues: "बकाया राशि",
    name: "नाम",
    mobile: "मोबाइल",
    village: "गांव",
    rate: "दर",
    amount: "राशि",
    total: "कुल",
    paid: "चुकाया",
    due: "बाकी",
    bill: "बिल",
    payment: "भुगतान",
    product: "सामान",
    monthly: "मासिक",
    daily: "दैनिक",
    yearly: "वार्षिक",
    export: "डाउनलोड",
    share: "शेयर",
    print: "प्रिंट",
    logout: "लॉगआउट",
    login: "लॉगिन",
    signup: "साइन अप",
    email: "ईमेल",
    password: "पासवर्ड",
    or: "या",
    googleSignIn: "Google से लॉगिन",
    forgotPassword: "पासवर्ड भूल गए?",
    noAccount: "अकाउंट नहीं है?",
    haveAccount: "अकाउंट है?",
    syncNow: "अभी सिंक करें",
    lastSync: "आखरी सिंक",
    offline: "ऑफलाइन",
    online: "ऑनलाइन",
    about: "ऐप के बारे में",
    tips: "टिप्स और ट्रिक्स",
    language: "भाषा",
    profile: "प्रोफाइल",
    defaultRates: "डिफ़ॉल्ट दर",
    done: "हो गया",
    pending: "बाकी है",
    all: "सभी",
    active: "सक्रिय",
    inactive: "निष्क्रिय",
    cash: "नकद",
    upi: "यूपीआई",
    bank: "बैंक",
    call: "कॉल",
    whatsapp: "व्हाट्सएप",
    confirmDelete: "क्या आप वाकई हटाना चाहते हैं?",
    yes: "हाँ",
    no: "नहीं",
    success: "सफल",
    error: "त्रुटि",
    loading: "लोड हो रहा है...",
    noData: "कोई डेटा नहीं",
    saveNext: "सेव और अगला",
    undoEntry: "वापस लें",
    duplicateWarning: "इस ग्राहक की एंट्री पहले से है",
    update: "अपडेट करें",
    newCustomer: "नया ग्राहक",
    editCustomer: "ग्राहक बदलें",
    customerSaved: "ग्राहक सेव हो गया",
    customerDeleted: "ग्राहक हटा दिया गया",
    entrySaved: "एंट्री सेव हो गई",
    entryDeleted: "एंट्री हटा दी गई",
    paymentSaved: "भुगतान सेव हो गया",
    productSaved: "सामान सेव हो गया",
    syncComplete: "सिंक पूरा हुआ",
    syncFailed: "सिंक विफल",
    loginSuccess: "लॉगिन सफल",
    loginFailed: "लॉगिन विफल",
    logoutSuccess: "लॉगआउट सफल",
    passwordReset: "पासवर्ड रीसेट ईमेल भेजा गया",
    fillRequired: "कृपया सभी आवश्यक फ़ील्ड भरें",
    invalidMobile: "अमान्य मोबाइल नंबर",
    passwordMismatch: "पासवर्ड मेल नहीं खाता",
    weakPassword: "पासवर्ड कम से कम 6 अक्षर का होना चाहिए",
    today: "आज",
    yesterday: "कल",
    thisMonth: "इस महीने",
    noCustomers: "कोई ग्राहक नहीं",
    noEntries: "कोई एंट्री नहीं",
    noPayments: "कोई भुगतान नहीं",
    noProducts: "कोई सामान नहीं",
    addFirst: "पहले जोड़ें",

    // Months
    months: [
      "जनवरी",
      "फरवरी",
      "मार्च",
      "अप्रैल",
      "मई",
      "जून",
      "जुलाई",
      "अगस्त",
      "सितंबर",
      "अक्टूबर",
      "नवंबर",
      "दिसंबर",
    ],

    // Days
    days: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
  },

  en: {
    appName: "Dudh Wala",
    home: "Home",
    customers: "Customers",
    reports: "Reports",
    settings: "Settings",
    quickEntry: "Quick Entry",
    morning: "Morning",
    evening: "Evening",
    cow: "Cow",
    buffalo: "Buffalo",
    kg: "kg",
    paav: "Paav",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    search: "Search",
    todayMilk: "Today's Milk",
    todayIncome: "Today's Income",
    activeCustomers: "Active Customers",
    pendingDues: "Pending Dues",
    name: "Name",
    mobile: "Mobile",
    village: "Village",
    rate: "Rate",
    amount: "Amount",
    total: "Total",
    paid: "Paid",
    due: "Due",
    bill: "Bill",
    payment: "Payment",
    product: "Product",
    monthly: "Monthly",
    daily: "Daily",
    yearly: "Yearly",
    export: "Export",
    share: "Share",
    print: "Print",
    logout: "Logout",
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    or: "OR",
    googleSignIn: "Sign in with Google",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have account?",
    haveAccount: "Have account?",
    syncNow: "Sync Now",
    lastSync: "Last Sync",
    offline: "Offline",
    online: "Online",
    about: "About App",
    tips: "Tips & Tricks",
    language: "Language",
    profile: "Profile",
    defaultRates: "Default Rates",
    done: "Done",
    pending: "Pending",
    all: "All",
    active: "Active",
    inactive: "Inactive",
    cash: "Cash",
    upi: "UPI",
    bank: "Bank",
    call: "Call",
    whatsapp: "WhatsApp",
    confirmDelete: "Are you sure you want to delete?",
    yes: "Yes",
    no: "No",
    success: "Success",
    error: "Error",
    loading: "Loading...",
    noData: "No data",
    saveNext: "Save & Next",
    undoEntry: "Undo",
    duplicateWarning: "Entry already exists for this customer",
    update: "Update",
    newCustomer: "New Customer",
    editCustomer: "Edit Customer",
    customerSaved: "Customer saved",
    customerDeleted: "Customer deleted",
    entrySaved: "Entry saved",
    entryDeleted: "Entry deleted",
    paymentSaved: "Payment saved",
    productSaved: "Product saved",
    syncComplete: "Sync complete",
    syncFailed: "Sync failed",
    loginSuccess: "Login successful",
    loginFailed: "Login failed",
    logoutSuccess: "Logged out",
    passwordReset: "Password reset email sent",
    fillRequired: "Please fill all required fields",
    invalidMobile: "Invalid mobile number",
    passwordMismatch: "Passwords do not match",
    weakPassword: "Password must be at least 6 characters",
    today: "Today",
    yesterday: "Yesterday",
    thisMonth: "This Month",
    noCustomers: "No customers",
    noEntries: "No entries",
    noPayments: "No payments",
    noProducts: "No products",
    addFirst: "Add first",

    // Months
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],

    // Days
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
};

// Get translation
function t(key) {
  const lang = APP.state.currentLanguage;
  return LANG[lang][key] || LANG["hi"][key] || key;
}

// Get month name
function getMonthName(monthIndex) {
  const lang = APP.state.currentLanguage;
  return LANG[lang].months[monthIndex];
}

// Get day name
function getDayName(dayIndex) {
  const lang = APP.state.currentLanguage;
  return LANG[lang].days[dayIndex];
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Generate unique ID
function generateId(prefix = "") {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return prefix ? `${prefix}_${timestamp}${random}` : `${timestamp}${random}`;
}

// Format date to YYYY-MM-DD
function formatDateISO(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Format date to DD/MM/YYYY
function formatDateDisplay(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Format date to readable format
function formatDateReadable(date) {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (formatDateISO(d) === formatDateISO(today)) {
    return t("today");
  }
  if (formatDateISO(d) === formatDateISO(yesterday)) {
    return t("yesterday");
  }

  const day = d.getDate();
  const month = getMonthName(d.getMonth());
  return `${day} ${month}`;
}

// Format month display
function formatMonthDisplay(date) {
  const d = new Date(date);
  const month = getMonthName(d.getMonth());
  const year = d.getFullYear();
  return `${month} ${year}`;
}

// Format currency
function formatCurrency(amount) {
  return `₹${parseFloat(amount || 0).toLocaleString("en-IN")}`;
}

// Format weight
function formatWeight(kg) {
  return `${parseFloat(kg || 0).toFixed(2)} ${t("kg")}`;
}

// Parse float safely
function parseFloatSafe(value) {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

// Validate mobile number (Indian)
function isValidMobile(mobile) {
  if (!mobile) return true; // Optional field
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile);
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Get initials from name
function getInitials(name) {
  if (!name) return "?";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

// Determine current shift based on time
function getCurrentShift() {
  const hour = new Date().getHours();
  // Morning: 4am - 12pm, Evening: 12pm - 10pm
  return hour >= 4 && hour < 12 ? "morning" : "evening";
}

// Check if same date
function isSameDate(date1, date2) {
  return formatDateISO(date1) === formatDateISO(date2);
}

// Check if same month
function isSameMonth(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
  );
}

// Get start and end of month
function getMonthRange(date) {
  const d = new Date(date);
  const start = new Date(d.getFullYear(), d.getMonth(), 1);
  const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  return { start, end };
}

// Compress image to base64 (max 100KB)
async function compressImage(file, maxSizeKB = 100) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        const maxDim = 300;
        if (width > height && width > maxDim) {
          height = (height * maxDim) / width;
          width = maxDim;
        } else if (height > maxDim) {
          width = (width * maxDim) / height;
          height = maxDim;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Try different quality levels
        let quality = 0.8;
        let base64 = canvas.toDataURL("image/jpeg", quality);

        while (base64.length > maxSizeKB * 1024 && quality > 0.1) {
          quality -= 0.1;
          base64 = canvas.toDataURL("image/jpeg", quality);
        }

        resolve(base64);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Vibrate device (if supported)
function vibrate(pattern = 50) {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

// Copy to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Copy failed:", err);
    return false;
  }
}

// Share content (Web Share API)
async function shareContent(data) {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (err) {
      console.error("Share failed:", err);
      return false;
    }
  }
  return false;
}

/* ============================================
   INDEXEDDB OPERATIONS
   ============================================ */
const DB = {
  name: "DudhWalaDB",
  version: 1,
  instance: null,

  // Store names
  stores: {
    settings: "settings",
    customers: "customers",
    milkEntries: "milkEntries",
    products: "products",
    payments: "payments",
    syncQueue: "syncQueue",
  },

  // Initialize database
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.name, this.version);

      request.onerror = () => {
        console.error("IndexedDB error:", request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.instance = request.result;
        console.log("IndexedDB initialized");
        resolve(this.instance);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Settings store
        if (!db.objectStoreNames.contains(this.stores.settings)) {
          db.createObjectStore(this.stores.settings, { keyPath: "id" });
        }

        // Customers store
        if (!db.objectStoreNames.contains(this.stores.customers)) {
          const customerStore = db.createObjectStore(this.stores.customers, {
            keyPath: "id",
          });
          customerStore.createIndex("name", "name", { unique: false });
          customerStore.createIndex("isActive", "isActive", { unique: false });
          customerStore.createIndex("syncStatus", "syncStatus", {
            unique: false,
          });
        }

        // Milk Entries store
        if (!db.objectStoreNames.contains(this.stores.milkEntries)) {
          const entryStore = db.createObjectStore(this.stores.milkEntries, {
            keyPath: "id",
          });
          entryStore.createIndex("customerId", "customerId", { unique: false });
          entryStore.createIndex("date", "date", { unique: false });
          entryStore.createIndex("dateShift", ["date", "shift"], {
            unique: false,
          });
          entryStore.createIndex("syncStatus", "syncStatus", { unique: false });
        }

        // Products store
        if (!db.objectStoreNames.contains(this.stores.products)) {
          const productStore = db.createObjectStore(this.stores.products, {
            keyPath: "id",
          });
          productStore.createIndex("customerId", "customerId", {
            unique: false,
          });
          productStore.createIndex("date", "date", { unique: false });
          productStore.createIndex("syncStatus", "syncStatus", {
            unique: false,
          });
        }

        // Payments store
        if (!db.objectStoreNames.contains(this.stores.payments)) {
          const paymentStore = db.createObjectStore(this.stores.payments, {
            keyPath: "id",
          });
          paymentStore.createIndex("customerId", "customerId", {
            unique: false,
          });
          paymentStore.createIndex("date", "date", { unique: false });
          paymentStore.createIndex("syncStatus", "syncStatus", {
            unique: false,
          });
        }

        // Sync Queue store
        if (!db.objectStoreNames.contains(this.stores.syncQueue)) {
          const syncStore = db.createObjectStore(this.stores.syncQueue, {
            keyPath: "id",
          });
          syncStore.createIndex("createdAt", "createdAt", { unique: false });
        }

        console.log("IndexedDB schema created");
      };
    });
  },

  // Get transaction
  getTransaction(storeNames, mode = "readonly") {
    if (!Array.isArray(storeNames)) {
      storeNames = [storeNames];
    }
    return this.instance.transaction(storeNames, mode);
  },

  // Get object store
  getStore(storeName, mode = "readonly") {
    const tx = this.getTransaction(storeName, mode);
    return tx.objectStore(storeName);
  },

  // Generic CRUD operations

  // Get all records from a store
  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  // Get record by ID
  async getById(storeName, id) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  // Get records by index
  async getByIndex(storeName, indexName, value) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  // Add or update record
  async put(storeName, data) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, "readwrite");
      const request = store.put(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  // Add record (fails if exists)
  async add(storeName, data) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, "readwrite");
      const request = store.add(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  // Delete record
  async delete(storeName, id) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, "readwrite");
      const request = store.delete(id);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  },

  // Clear store
  async clear(storeName) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, "readwrite");
      const request = store.clear();
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  },

  // Count records
  async count(storeName) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const request = store.count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  // Count by index
  async countByIndex(storeName, indexName, value) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const index = store.index(indexName);
      const request = index.count(value);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },
};

/* ============================================
   SETTINGS OPERATIONS
   ============================================ */
const Settings = {
  defaultSettings: {
    id: "app_settings",
    vendorName: "",
    vendorMobile: "",
    vendorAddress: "",
    defaultCowRate: CONFIG.app.defaultCowRate,
    defaultBuffaloRate: CONFIG.app.defaultBuffaloRate,
    language: "hi",
    lastSyncTime: null,
    userId: "",
  },

  async get() {
    let settings = await DB.getById(DB.stores.settings, "app_settings");
    if (!settings) {
      settings = { ...this.defaultSettings };
      await DB.put(DB.stores.settings, settings);
    }
    APP.cache.settings = settings;
    return settings;
  },

  async update(data) {
    const settings = await this.get();
    const updated = { ...settings, ...data };
    await DB.put(DB.stores.settings, updated);
    APP.cache.settings = updated;
    return updated;
  },

  async setLanguage(lang) {
    await this.update({ language: lang });
    APP.state.currentLanguage = lang;
    updateUILanguage();
  },

  async setUserId(userId) {
    await this.update({ userId });
  },

  async updateLastSync() {
    const now = new Date().toISOString();
    await this.update({ lastSyncTime: now });
    APP.state.lastSyncTime = now;
  },
};

/* ============================================
   CUSTOMERS OPERATIONS
   ============================================ */
const Customers = {
  async getAll() {
    const customers = await DB.getAll(DB.stores.customers);
    APP.cache.customers = customers;
    return customers;
  },

  async getActive() {
    const all = await this.getAll();
    return all.filter((c) => c.isActive);
  },

  async getById(id) {
    return DB.getById(DB.stores.customers, id);
  },

  async save(data) {
    const now = new Date().toISOString();
    const settings = await Settings.get();

    if (!data.id) {
      // New customer
      data.id = generateId("cust");
      data.createdAt = now;
      data.cowRate = data.cowRate || settings.defaultCowRate;
      data.buffaloRate = data.buffaloRate || settings.defaultBuffaloRate;
      data.defaultMilkType = data.defaultMilkType || "buffalo";
      data.isActive = data.isActive !== false;
    }

    data.updatedAt = now;
    data.syncStatus = "pending";

    await DB.put(DB.stores.customers, data);
    await SyncQueue.add("customers", data.id, "save", data);

    // Update cache
    await this.getAll();

    return data;
  },

  async delete(id) {
    await DB.delete(DB.stores.customers, id);
    await SyncQueue.add("customers", id, "delete", { id });

    // Update cache
    await this.getAll();
  },

  async search(query) {
    const all = await this.getAll();
    if (!query) return all;

    query = query.toLowerCase();
    return all.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        (c.mobile && c.mobile.includes(query)) ||
        (c.village && c.village.toLowerCase().includes(query)),
    );
  },

  async getBalance(customerId, month = null) {
    // Calculate: (milk amount + products) - payments
    const entries = await MilkEntries.getByCustomer(customerId, month);
    const products = await Products.getByCustomer(customerId, month);
    const payments = await Payments.getByCustomer(customerId, month);

    const milkTotal = entries.reduce((sum, e) => sum + e.amount, 0);
    const productsTotal = products.reduce((sum, p) => sum + p.amount, 0);
    const paymentsTotal = payments.reduce((sum, p) => sum + p.amount, 0);

    return milkTotal + productsTotal - paymentsTotal;
  },

  async getTotalDues() {
    const active = await this.getActive();
    let total = 0;

    for (const customer of active) {
      const balance = await this.getBalance(customer.id);
      if (balance > 0) {
        total += balance;
      }
    }

    return total;
  },
};

/* ============================================
   MILK ENTRIES OPERATIONS
   ============================================ */
const MilkEntries = {
  async getAll() {
    return DB.getAll(DB.stores.milkEntries);
  },

  async getById(id) {
    return DB.getById(DB.stores.milkEntries, id);
  },

  async getByDate(date) {
    const dateStr = formatDateISO(date);
    return DB.getByIndex(DB.stores.milkEntries, "date", dateStr);
  },

  async getByDateAndShift(date, shift) {
    const dateStr = formatDateISO(date);
    return DB.getByIndex(DB.stores.milkEntries, "dateShift", [dateStr, shift]);
  },

  async getByCustomer(customerId, month = null) {
    const all = await DB.getByIndex(
      DB.stores.milkEntries,
      "customerId",
      customerId,
    );

    if (month) {
      const { start, end } = getMonthRange(month);
      return all.filter((e) => {
        const date = new Date(e.date);
        return date >= start && date <= end;
      });
    }

    return all;
  },

  async getByMonth(month) {
    const all = await this.getAll();
    const { start, end } = getMonthRange(month);

    return all.filter((e) => {
      const date = new Date(e.date);
      return date >= start && date <= end;
    });
  },

  async checkDuplicate(customerId, date, shift, excludeId = null) {
    const dateStr = formatDateISO(date);
    const entries = await this.getByDateAndShift(dateStr, shift);
    return entries.find(
      (e) => e.customerId === customerId && e.id !== excludeId,
    );
  },

  async save(data) {
    const now = new Date().toISOString();

    if (!data.id) {
      data.id = generateId("entry");
      data.createdAt = now;
    }

    data.date = formatDateISO(data.date);
    data.amount = parseFloatSafe(data.quantityKg) * parseFloatSafe(data.rate);
    data.syncStatus = "pending";

    await DB.put(DB.stores.milkEntries, data);
    await SyncQueue.add("milkEntries", data.id, "save", data);

    return data;
  },

  async delete(id) {
    await DB.delete(DB.stores.milkEntries, id);
    await SyncQueue.add("milkEntries", id, "delete", { id });
  },

  async getTodayStats() {
    const today = formatDateISO(new Date());
    const entries = await this.getByDate(today);

    const morning = entries.filter((e) => e.shift === "morning");
    const evening = entries.filter((e) => e.shift === "evening");

    return {
      morning: {
        kg: morning.reduce((sum, e) => sum + parseFloatSafe(e.quantityKg), 0),
        amount: morning.reduce((sum, e) => sum + e.amount, 0),
        count: morning.length,
      },
      evening: {
        kg: evening.reduce((sum, e) => sum + parseFloatSafe(e.quantityKg), 0),
        amount: evening.reduce((sum, e) => sum + e.amount, 0),
        count: evening.length,
      },
      total: {
        kg: entries.reduce((sum, e) => sum + parseFloatSafe(e.quantityKg), 0),
        amount: entries.reduce((sum, e) => sum + e.amount, 0),
        count: entries.length,
      },
    };
  },

  async getRecentEntries(limit = 5) {
    const all = await this.getAll();
    // Sort by createdAt descending
    all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return all.slice(0, limit);
  },
};

/* ============================================
   PRODUCTS OPERATIONS
   ============================================ */
const Products = {
  async getAll() {
    return DB.getAll(DB.stores.products);
  },

  async getById(id) {
    return DB.getById(DB.stores.products, id);
  },

  async getByCustomer(customerId, month = null) {
    const all = await DB.getByIndex(
      DB.stores.products,
      "customerId",
      customerId,
    );

    if (month) {
      const { start, end } = getMonthRange(month);
      return all.filter((p) => {
        const date = new Date(p.date);
        return date >= start && date <= end;
      });
    }

    return all;
  },

  async getByMonth(month) {
    const all = await this.getAll();
    const { start, end } = getMonthRange(month);

    return all.filter((p) => {
      const date = new Date(p.date);
      return date >= start && date <= end;
    });
  },

  async save(data) {
    const now = new Date().toISOString();

    if (!data.id) {
      data.id = generateId("prod");
      data.createdAt = now;
    }

    data.date = formatDateISO(data.date);
    data.amount = parseFloatSafe(data.amount);
    data.syncStatus = "pending";

    await DB.put(DB.stores.products, data);
    await SyncQueue.add("products", data.id, "save", data);

    return data;
  },

  async delete(id) {
    await DB.delete(DB.stores.products, id);
    await SyncQueue.add("products", id, "delete", { id });
  },

  async getMonthlyTotal(month) {
    const products = await this.getByMonth(month);
    return products.reduce((sum, p) => sum + p.amount, 0);
  },
};

/* ============================================
   PAYMENTS OPERATIONS
   ============================================ */
const Payments = {
  async getAll() {
    return DB.getAll(DB.stores.payments);
  },

  async getById(id) {
    return DB.getById(DB.stores.payments, id);
  },

  async getByCustomer(customerId, month = null) {
    const all = await DB.getByIndex(
      DB.stores.payments,
      "customerId",
      customerId,
    );

    if (month) {
      const { start, end } = getMonthRange(month);
      return all.filter((p) => {
        const date = new Date(p.date);
        return date >= start && date <= end;
      });
    }

    return all;
  },

  async getByMonth(month) {
    const all = await this.getAll();
    const { start, end } = getMonthRange(month);

    return all.filter((p) => {
      const date = new Date(p.date);
      return date >= start && date <= end;
    });
  },

  async save(data) {
    const now = new Date().toISOString();

    if (!data.id) {
      data.id = generateId("pay");
      data.createdAt = now;
    }

    data.date = formatDateISO(data.date);
    data.amount = parseFloatSafe(data.amount);
    data.syncStatus = "pending";

    await DB.put(DB.stores.payments, data);
    await SyncQueue.add("payments", data.id, "save", data);

    return data;
  },

  async delete(id) {
    await DB.delete(DB.stores.payments, id);
    await SyncQueue.add("payments", id, "delete", { id });
  },

  async getMonthlyTotal(month) {
    const payments = await this.getByMonth(month);
    return payments.reduce((sum, p) => sum + p.amount, 0);
  },

  async getRecent(limit = 10) {
    const all = await this.getAll();
    all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return all.slice(0, limit);
  },
};

/* ============================================
   SYNC QUEUE OPERATIONS
   ============================================ */
const SyncQueue = {
  async add(storeName, recordId, action, data) {
    const item = {
      id: generateId("sync"),
      storeName,
      recordId,
      action,
      data,
      createdAt: new Date().toISOString(),
    };

    await DB.put(DB.stores.syncQueue, item);
    await this.updatePendingCount();
  },

  async getAll() {
    const items = await DB.getAll(DB.stores.syncQueue);
    items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    return items;
  },

  async remove(id) {
    await DB.delete(DB.stores.syncQueue, id);
    await this.updatePendingCount();
  },

  async clear() {
    await DB.clear(DB.stores.syncQueue);
    await this.updatePendingCount();
  },

  async updatePendingCount() {
    const count = await DB.count(DB.stores.syncQueue);
    APP.state.pendingSyncCount = count;
    updateSyncBadge();
  },
};

// Continuing in Part 2...
/* ============================================
   FIREBASE AUTHENTICATION
   ============================================ */
const Auth = {
    auth: null,
    
    init() {
        try {
            firebase.initializeApp(CONFIG.firebase);
            this.auth = firebase.auth();
            this.auth.onAuthStateChanged((user) => this.handleAuthState(user));
            console.log('Firebase initialized');
        } catch (error) {
            console.error('Firebase init error:', error);
            // Still hide preloader on error
            hidePreloader();
            navigate('login');
        }
    },
    
    // ✅ THIS IS THE KEY FIX - Always hide preloader here
    handleAuthState(user) {
        console.log('Auth state changed:', user ? 'logged in' : 'logged out');
        
        // ALWAYS hide preloader when auth state is known
        hidePreloader();
        
        if (user) {
            APP.state.isLoggedIn = true;
            APP.state.currentUser = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            };
            
            // Save user ID
            Settings.update({ userId: user.uid });
            
            // Navigate to dashboard
            navigate('dashboard');
            
            // Start sync
            if (typeof Sync !== 'undefined' && Sync.start) {
                Sync.start();
            }
        } else {
            APP.state.isLoggedIn = false;
            APP.state.currentUser = null;
            navigate('login');
        }
    },
    
    async login(email, password) {
        try {
            showLoading(t('loading'));
            await this.auth.signInWithEmailAndPassword(email, password);
            hideLoading();
            showToast('लॉगिन सफल', 'success');
        } catch (error) {
            hideLoading();
            console.error('Login error:', error);
            showToast(this.getErrorMessage(error.code), 'error');
        }
    },
    
    async signup(email, password, name) {
        try {
            showLoading(t('loading'));
            const result = await this.auth.createUserWithEmailAndPassword(email, password);
            if (name) {
                await result.user.updateProfile({ displayName: name });
            }
            hideLoading();
            showToast('साइन अप सफल', 'success');
        } catch (error) {
            hideLoading();
            console.error('Signup error:', error);
            showToast(this.getErrorMessage(error.code), 'error');
        }
    },
    
    async signInWithGoogle() {
        try {
            showLoading(t('loading'));
            const provider = new firebase.auth.GoogleAuthProvider();
            await this.auth.signInWithPopup(provider);
            hideLoading();
        } catch (error) {
            hideLoading();
            if (error.code !== 'auth/popup-closed-by-user') {
                showToast(this.getErrorMessage(error.code), 'error');
            }
        }
    },
    
    async logout() {
        try {
            await this.auth.signOut();
            showToast('लॉगआउट सफल', 'success');
        } catch (error) {
            console.error('Logout error:', error);
        }
    },
    
    async sendPasswordReset(email) {
        try {
            showLoading();
            await this.auth.sendPasswordResetEmail(email);
            hideLoading();
            showToast('पासवर्ड रीसेट ईमेल भेजा गया', 'success');
        } catch (error) {
            hideLoading();
            showToast(this.getErrorMessage(error.code), 'error');
        }
    },
    
    getCurrentUser() {
        return this.auth ? this.auth.currentUser : null;
    },
    
    getUserId() {
        const user = this.getCurrentUser();
        return user ? user.uid : null;
    },
    
    getErrorMessage(code) {
        const messages = {
            'auth/email-already-in-use': 'यह ईमेल पहले से उपयोग में है',
            'auth/invalid-email': 'अमान्य ईमेल',
            'auth/weak-password': 'पासवर्ड बहुत कमजोर है',
            'auth/user-not-found': 'उपयोगकर्ता नहीं मिला',
            'auth/wrong-password': 'गलत पासवर्ड',
            'auth/too-many-requests': 'बहुत प्रयास। बाद में करें',
            'auth/network-request-failed': 'नेटवर्क त्रुटि'
        };
        return messages[code] || 'लॉगिन विफल';
    }
};

/* ============================================
   GOOGLE SHEETS API
   ============================================ */
const API = {
  // Base URL
  baseUrl: CONFIG.apiUrl,

  // Make API request
  async request(action, data = {}, method = "GET") {
    if (!APP.state.isOnline) {
      console.log("Offline - API request queued");
      return null;
    }

    const uid = Auth.getUserId();
    if (!uid && action !== "getTips") {
      console.error("No user ID for API request");
      return null;
    }

    try {
      let url = `${this.baseUrl}?action=${action}`;
      if (uid) url += `&uid=${uid}`;

      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (method === "POST" && data) {
        options.body = JSON.stringify(data);
      } else if (method === "GET" && data) {
        Object.keys(data).forEach((key) => {
          url += `&${key}=${encodeURIComponent(data[key])}`;
        });
      }

      const response = await fetch(url, options);
      const result = await response.json();

      if (result.error) {
        console.error("API error:", result.error);
        return null;
      }

      return result;
    } catch (error) {
      console.error("API request failed:", error);
      return null;
    }
  },

  // Initialize user (create user sheet if not exists)
  async initUser(uid, email, name) {
    return this.request("initUser", { uid, email, name }, "POST");
  },

  // Get all data for user
  async getAllData() {
    return this.request("getAllData");
  },

  // Save customer
  async saveCustomer(customer) {
    return this.request("saveCustomer", customer, "POST");
  },

  // Save milk entry
  async saveMilkEntry(entry) {
    return this.request("saveMilkEntry", entry, "POST");
  },

  // Save product
  async saveProduct(product) {
    return this.request("saveProduct", product, "POST");
  },

  // Save payment
  async savePayment(payment) {
    return this.request("savePayment", payment, "POST");
  },

  // Delete record
  async deleteRecord(store, id) {
    return this.request("deleteRecord", { store, id }, "POST");
  },

  // Sync batch (multiple changes at once)
  async syncBatch(changes) {
    return this.request("syncBatch", { changes }, "POST");
  },

  // Get tips and tricks (public)
  async getTips() {
    return this.request("getTips");
  },
};

/* ============================================
   SYNC SYSTEM
   ============================================ */
const Sync = {
  // Sync interval ID
  intervalId: null,

  // Is currently syncing
  isSyncing: false,

  // Start auto-sync
  start() {
    if (this.intervalId) return;

    // Initial sync
    this.sync();

    // Set interval
    this.intervalId = setInterval(() => {
      this.sync();
    }, CONFIG.app.syncInterval);

    console.log("Auto-sync started");
  },

  // Stop auto-sync
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    console.log("Auto-sync stopped");
  },

  // Perform sync
  async sync() {
    if (this.isSyncing) {
      console.log("Sync already in progress");
      return;
    }

    if (!APP.state.isOnline) {
      console.log("Offline - sync skipped");
      return;
    }

    if (!Auth.getUserId()) {
      console.log("Not logged in - sync skipped");
      return;
    }

    this.isSyncing = true;
    updateSyncStatus(true);

    try {
      // Get pending sync items
      const queue = await SyncQueue.getAll();

      if (queue.length === 0) {
        console.log("Nothing to sync");
        this.isSyncing = false;
        updateSyncStatus(false);
        return;
      }

      console.log(`Syncing ${queue.length} items...`);

      // Process queue items
      for (const item of queue) {
        try {
          let success = false;

          if (item.action === "save") {
            switch (item.storeName) {
              case "customers":
                success = await API.saveCustomer(item.data);
                break;
              case "milkEntries":
                success = await API.saveMilkEntry(item.data);
                break;
              case "products":
                success = await API.saveProduct(item.data);
                break;
              case "payments":
                success = await API.savePayment(item.data);
                break;
            }
          } else if (item.action === "delete") {
            success = await API.deleteRecord(item.storeName, item.recordId);
          }

          if (success !== null) {
            // Remove from queue
            await SyncQueue.remove(item.id);

            // Update record sync status
            if (item.action === "save") {
              const record = await DB.getById(item.storeName, item.recordId);
              if (record) {
                record.syncStatus = "synced";
                await DB.put(item.storeName, record);
              }
            }
          }
        } catch (error) {
          console.error(`Sync item failed:`, item, error);
        }
      }

      // Update last sync time
      await Settings.updateLastSync();
      updateSyncTimeDisplay();

      console.log("Sync complete");
    } catch (error) {
      console.error("Sync failed:", error);
    }

    this.isSyncing = false;
    updateSyncStatus(false);
  },

  // Pull data from server
  async pullFromServer() {
    if (!APP.state.isOnline || !Auth.getUserId()) {
      return false;
    }

    try {
      showLoading("डेटा लोड हो रहा है...");

      const data = await API.getAllData();

      if (!data) {
        hideLoading();
        return false;
      }

      // Update local database
      if (data.customers) {
        for (const customer of data.customers) {
          customer.syncStatus = "synced";
          await DB.put(DB.stores.customers, customer);
        }
      }

      if (data.milkEntries) {
        for (const entry of data.milkEntries) {
          entry.syncStatus = "synced";
          await DB.put(DB.stores.milkEntries, entry);
        }
      }

      if (data.products) {
        for (const product of data.products) {
          product.syncStatus = "synced";
          await DB.put(DB.stores.products, product);
        }
      }

      if (data.payments) {
        for (const payment of data.payments) {
          payment.syncStatus = "synced";
          await DB.put(DB.stores.payments, payment);
        }
      }

      // Refresh cache
      await Customers.getAll();

      hideLoading();
      return true;
    } catch (error) {
      console.error("Pull from server failed:", error);
      hideLoading();
      return false;
    }
  },
};

/* ============================================
   UI HELPERS
   ============================================ */

// Show toast notification
function showToast(
  message,
  type = "info",
  duration = CONFIG.app.toastDuration,
) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;

  container.appendChild(toast);

  // Vibrate on error
  if (type === "error") {
    vibrate([50, 50, 50]);
  } else if (type === "success") {
    vibrate(50);
  }

  // Remove after duration
  setTimeout(() => {
    toast.classList.add("removing");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}

// Show loading overlay
function showLoading(text = null) {
  const overlay = document.getElementById("loading-overlay");
  const textEl = document.getElementById("loading-text");

  if (overlay) {
    overlay.style.display = "flex";
  }

  if (textEl) {
    textEl.textContent = text || t("loading");
  }
}

// Hide loading overlay
function hideLoading() {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

// Show modal
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Hide modal
function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Show confirm dialog
function showConfirm(title, message, callback, icon = "⚠️") {
  const modal = document.getElementById("confirm-modal");
  const iconEl = document.getElementById("confirm-icon");
  const titleEl = document.getElementById("confirm-title");
  const messageEl = document.getElementById("confirm-message");

  if (iconEl) iconEl.textContent = icon;
  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;

  APP.confirmCallback = callback;
  showModal("confirm-modal");
}

// Confirm action (called from confirm button)
function confirmAction() {
  hideModal("confirm-modal");
  if (APP.confirmCallback) {
    APP.confirmCallback();
    APP.confirmCallback = null;
  }
}

// Close confirm modal
function closeConfirmModal() {
  hideModal("confirm-modal");
  APP.confirmCallback = null;
}

// Update sync badge
function updateSyncBadge() {
  const badge = document.getElementById("sync-badge");
  if (badge) {
    if (APP.state.pendingSyncCount > 0) {
      badge.textContent = APP.state.pendingSyncCount;
      badge.style.display = "flex";
    } else {
      badge.style.display = "none";
    }
  }
}

// Update sync status (spinning icon)
function updateSyncStatus(isSyncing) {
  const syncBtn = document.querySelector(".sync-btn");
  if (syncBtn) {
    if (isSyncing) {
      syncBtn.classList.add("syncing");
    } else {
      syncBtn.classList.remove("syncing");
    }
  }
}

// Update sync time display
function updateSyncTimeDisplay() {
  const el = document.getElementById("settings-last-sync");
  if (el && APP.cache.settings) {
    const lastSync = APP.cache.settings.lastSyncTime;
    if (lastSync) {
      el.textContent = formatDateReadable(lastSync);
    } else {
      el.textContent = "कभी नहीं";
    }
  }
}

// Update online status
function updateOnlineStatus() {
  const statusEl = document.getElementById("online-status");
  const dotEl = statusEl?.querySelector(".status-dot");
  const textEl = statusEl?.querySelector(".status-text");

  if (APP.state.isOnline) {
    dotEl?.classList.remove("offline");
    dotEl?.classList.add("online");
    if (textEl) textEl.textContent = t("online");
  } else {
    dotEl?.classList.remove("online");
    dotEl?.classList.add("offline");
    if (textEl) textEl.textContent = t("offline");
  }
}

// Update UI language
function updateUILanguage() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && LANG[APP.state.currentLanguage][key]) {
      el.textContent = LANG[APP.state.currentLanguage][key];
    }
  });

  // Update language buttons
  const langBtns = document.querySelectorAll(".lang-btn");
  langBtns.forEach((btn) => {
    const lang = btn.getAttribute("data-lang");
    if (lang === APP.state.currentLanguage) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

/* ============================================
   NAVIGATION & ROUTING
   ============================================ */

// Navigate to page
function navigate(pageName, params = {}) {
  // Store previous page
  APP.state.previousPage = APP.state.currentPage;
  APP.state.currentPage = pageName;
  APP.pageParams = params;

  // Hide all pages
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.style.display = "none";
  });

  // Show target page
  const targetPage = document.getElementById(`page-${pageName}`);
  if (targetPage) {
    targetPage.style.display = "flex";
  }

  // Update bottom nav
  updateBottomNav(pageName);

  // Show/hide bottom nav
  const bottomNav = document.getElementById("bottom-nav");
  const pagesWithNav = ["dashboard", "customers", "reports", "settings"];
  if (bottomNav) {
    bottomNav.style.display = pagesWithNav.includes(pageName) ? "flex" : "none";
  }

  // Load page content
  loadPage(pageName, params);

  // Scroll to top
  window.scrollTo(0, 0);
}

// Go back to previous page
function goBack() {
  if (APP.state.previousPage) {
    navigate(APP.state.previousPage);
  } else {
    navigate("dashboard");
  }
}

// Update bottom navigation active state
function updateBottomNav(pageName) {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    const itemPage = item.getAttribute("data-page");
    if (itemPage === pageName) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Load page content
async function loadPage(pageName, params = {}) {
  switch (pageName) {
    case "dashboard":
      await loadDashboard();
      break;
    case "customers":
      await loadCustomersList();
      break;
    case "customer-form":
      await loadCustomerForm(params.customerId);
      break;
    case "customer-detail":
      await loadCustomerDetail(params.customerId);
      break;
    case "quick-entry":
      await loadQuickEntry(params.shift);
      break;
    case "bulk-entry":
      await loadBulkEntry();
      break;
    case "products":
      await loadProducts();
      break;
    case "payments":
      await loadPayments();
      break;
    case "reports":
      await loadReports();
      break;
    case "bill":
      await loadBill(params.customerId, params.month);
      break;
    case "settings":
      await loadSettings();
      break;
    case "about":
      loadAbout();
      break;
    case "tips":
      await loadTips();
      break;
  }
}

/* ============================================
   PRELOADER
   ============================================ */
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    const app = document.getElementById('app');
    
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    if (app) {
        app.style.display = 'block';
    }
    
    console.log('Preloader hidden, app visible');
}

/* ============================================
   AUTH FORM HANDLERS
   ============================================ */

// Show login page
function showLogin() {
  document.getElementById("page-login").style.display = "flex";
  document.getElementById("page-signup").style.display = "none";
}

// Show signup page
function showSignup() {
  document.getElementById("page-login").style.display = "none";
  document.getElementById("page-signup").style.display = "flex";
}

// Toggle password visibility
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input) {
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "🙈";
    } else {
      input.type = "password";
      btn.textContent = "👁️";
    }
  }
}

// Show forgot password prompt
async function showForgotPassword() {
  const email = document.getElementById("login-email").value;

  if (!email) {
    showToast("कृपया ईमेल दर्ज करें", "warning");
    return;
  }

  showConfirm(
    "पासवर्ड रीसेट",
    `क्या आप ${email} पर पासवर्ड रीसेट ईमेल भेजना चाहते हैं?`,
    async () => {
      await Auth.sendPasswordReset(email);
    },
  );
}

// Google sign in handler
async function signInWithGoogle() {
  try {
    await Auth.signInWithGoogle();
  } catch (error) {
    // Error already handled in Auth
  }
}

// Confirm logout
function confirmLogout() {
  showConfirm(
    t("logout"),
    "क्या आप लॉगआउट करना चाहते हैं?",
    async () => {
      await Auth.logout();
    },
    "🚪",
  );
}

/* ============================================
   MANUAL SYNC
   ============================================ */
async function manualSync() {
  if (!APP.state.isOnline) {
    showToast(t("offline"), "warning");
    return;
  }

  try {
    await Sync.sync();
    showToast(t("syncComplete"), "success");
  } catch (error) {
    showToast(t("syncFailed"), "error");
  }
}

/* ============================================
   PHOTO UPLOAD HANDLER
   ============================================ */
async function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    showLoading("फोटो प्रोसेस हो रही है...");

    const base64 = await compressImage(file);

    // Show preview
    const preview = document.getElementById("customer-photo-preview");
    const placeholder = document.getElementById("photo-placeholder");
    const photoText = document.querySelector(".photo-upload .photo-text");

    if (preview) {
      preview.src = base64;
      preview.style.display = "block";
    }
    if (placeholder) placeholder.style.display = "none";
    if (photoText) photoText.style.display = "none";

    // Store in form data attribute
    const photoUpload = document.querySelector(".photo-upload");
    if (photoUpload) {
      photoUpload.dataset.photo = base64;
    }

    hideLoading();
  } catch (error) {
    hideLoading();
    console.error("Photo upload error:", error);
    showToast("फोटो अपलोड विफल", "error");
  }
}

/* ============================================
   CUSTOMER FORM HELPERS
   ============================================ */

// Set default milk type in customer form
function setDefaultMilkType(type) {
  const hiddenInput = document.getElementById("customer-default-milk-type");
  if (hiddenInput) {
    hiddenInput.value = type;
  }

  // Update toggle buttons
  const toggleBtns = document.querySelectorAll(".milk-type-toggle .toggle-btn");
  toggleBtns.forEach((btn) => {
    if (btn.getAttribute("data-type") === type) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

/* ============================================
   QUICK ENTRY HELPERS
   ============================================ */

// Open date picker
function openDatePicker() {
  const dateInput = document.getElementById("entry-date");
  if (dateInput) {
    dateInput.showPicker();
  }
}

// Change entry date
function changeEntryDate(delta) {
  const currentDate = new Date(APP.cache.entryDate);
  currentDate.setDate(currentDate.getDate() + delta);
  APP.cache.entryDate = currentDate;

  updateEntryDateDisplay();
  loadQuickEntryCustomers();
}

// On entry date change
function onEntryDateChange() {
  const dateInput = document.getElementById("entry-date");
  if (dateInput) {
    APP.cache.entryDate = new Date(dateInput.value);
    updateEntryDateDisplay();
    loadQuickEntryCustomers();
  }
}

// Update entry date display
function updateEntryDateDisplay() {
  const dateInput = document.getElementById("entry-date");
  const dateText = document.getElementById("entry-date-display");

  if (dateInput) {
    dateInput.value = formatDateISO(APP.cache.entryDate);
  }

  if (dateText) {
    dateText.textContent = formatDateReadable(APP.cache.entryDate);
  }
}

// Set entry shift
function setEntryShift(shift) {
  APP.cache.entryShift = shift;

  // Update toggle buttons
  const shiftBtns = document.querySelectorAll(".shift-toggle .shift-btn");
  shiftBtns.forEach((btn) => {
    if (btn.getAttribute("data-shift") === shift) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  loadQuickEntryCustomers();
}

// Filter entry customers
function filterEntryCustomers() {
  const searchInput = document.getElementById("entry-customer-search");
  const query = searchInput ? searchInput.value.toLowerCase() : "";

  const items = document.querySelectorAll(".entry-customer-item");
  items.forEach((item) => {
    const name = item.getAttribute("data-name").toLowerCase();
    const mobile = item.getAttribute("data-mobile") || "";

    if (name.includes(query) || mobile.includes(query)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Clear entry search
function clearEntrySearch() {
  const searchInput = document.getElementById("entry-customer-search");
  if (searchInput) {
    searchInput.value = "";
    filterEntryCustomers();
  }
}

/* ============================================
   NUMPAD MODAL
   ============================================ */

// Open numpad modal for customer
async function openNumpad(customerId) {
  const customer = await Customers.getById(customerId);
  if (!customer) return;

  // Reset numpad state
  APP.numpad = {
    customerId: customerId,
    customerName: customer.name,
    milkType: customer.defaultMilkType || "buffalo",
    cowRate: customer.cowRate,
    buffaloRate: customer.buffaloRate,
    quantity: "0",
    isEdit: false,
    entryId: null,
  };

  // Check for existing entry (duplicate)
  const existing = await MilkEntries.checkDuplicate(
    customerId,
    APP.cache.entryDate,
    APP.cache.entryShift,
  );

  if (existing) {
    APP.numpad.isEdit = true;
    APP.numpad.entryId = existing.id;
    APP.numpad.milkType = existing.milkType;
    APP.numpad.quantity = existing.quantityKg.toString();
  }

  // Update UI
  updateNumpadUI();

  // Show modal
  showModal("numpad-modal");
}

// Update numpad UI
function updateNumpadUI() {
  const { customerName, milkType, cowRate, buffaloRate, quantity, isEdit } =
    APP.numpad;

  // Customer name
  const nameEl = document.getElementById("numpad-customer-name");
  if (nameEl) nameEl.textContent = customerName;

  // Current rate
  const rate = milkType === "cow" ? cowRate : buffaloRate;
  const rateEl = document.getElementById("numpad-rate");
  if (rateEl) rateEl.textContent = `₹${rate}/kg`;

  // Milk type buttons
  const typeBtns = document.querySelectorAll(".numpad-type-toggle .type-btn");
  typeBtns.forEach((btn) => {
    if (btn.getAttribute("data-type") === milkType) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Quantity
  const qtyEl = document.getElementById("numpad-quantity");
  if (qtyEl) qtyEl.textContent = quantity;

  // Amount
  const qty = parseFloatSafe(quantity);
  const amount = qty * rate;
  const amountEl = document.getElementById("numpad-amount");
  if (amountEl) amountEl.textContent = formatCurrency(amount);

  // Warning for duplicate
  const warningEl = document.getElementById("numpad-warning");
  if (warningEl) {
    warningEl.style.display = isEdit ? "flex" : "none";
  }
}

// Set numpad milk type
function setNumpadMilkType(type) {
  APP.numpad.milkType = type;
  updateNumpadUI();
}

// Numpad input
function numpadInput(value) {
  let current = APP.numpad.quantity;

  // Handle decimal point
  if (value === ".") {
    if (current.includes(".")) return;
    current += ".";
  } else {
    // Handle leading zero
    if (current === "0" && value !== ".") {
      current = value;
    } else {
      // Limit decimal places to 2
      if (current.includes(".")) {
        const parts = current.split(".");
        if (parts[1].length >= 2) return;
      }
      current += value;
    }
  }

  APP.numpad.quantity = current;
  updateNumpadUI();
  vibrate(30);
}

// Numpad backspace
function numpadBackspace() {
  let current = APP.numpad.quantity;
  if (current.length > 1) {
    current = current.slice(0, -1);
  } else {
    current = "0";
  }
  APP.numpad.quantity = current;
  updateNumpadUI();
  vibrate(30);
}

// Numpad clear
function numpadClear() {
  APP.numpad.quantity = "0";
  updateNumpadUI();
  vibrate(50);
}

// Add paav (quarter kg)
function addPaav(value) {
  const current = parseFloatSafe(APP.numpad.quantity);
  const newValue = current + value;
  APP.numpad.quantity = newValue.toFixed(2);
  updateNumpadUI();
  vibrate(30);
}

// Save numpad entry
async function saveNumpadEntry() {
  const {
    customerId,
    milkType,
    cowRate,
    buffaloRate,
    quantity,
    isEdit,
    entryId,
  } = APP.numpad;

  const qty = parseFloatSafe(quantity);
  if (qty <= 0) {
    showToast("कृपया मात्रा डालें", "warning");
    return;
  }

  const rate = milkType === "cow" ? cowRate : buffaloRate;

  const entryData = {
    id: isEdit ? entryId : null,
    customerId,
    date: APP.cache.entryDate,
    shift: APP.cache.entryShift,
    milkType,
    quantityKg: qty,
    rate,
    amount: qty * rate,
  };

  try {
    await MilkEntries.save(entryData);
    vibrate(100);
    showToast(t("entrySaved"), "success");

    // Close modal
    closeNumpadModal();

    // Refresh customer list
    await loadQuickEntryCustomers();

    // Move to next customer
    moveToNextCustomer(customerId);
  } catch (error) {
    console.error("Save entry error:", error);
    showToast(t("error"), "error");
  }
}

// Move to next pending customer
function moveToNextCustomer(currentId) {
  const items = document.querySelectorAll(".entry-customer-item:not(.done)");
  let foundCurrent = false;

  for (const item of items) {
    const itemId = item.getAttribute("data-id");

    if (foundCurrent) {
      // Open numpad for next customer
      openNumpad(itemId);
      return;
    }

    if (itemId === currentId) {
      foundCurrent = true;
    }
  }

  // If no next customer, show completion message
  if (foundCurrent) {
    showToast("सभी एंट्री हो गई! 🎉", "success");
  }
}

// Close numpad modal
function closeNumpadModal() {
  hideModal("numpad-modal");
}

/* ============================================
   CUSTOMER FILTER & SORT
   ============================================ */

// Current filter and sort state
let customerFilter = "all";
let customerSort = "name";

// Set customer filter
function setCustomerFilter(filter) {
  customerFilter = filter;

  // Update filter tabs
  const filterTabs = document.querySelectorAll(".filter-tab");
  filterTabs.forEach((tab) => {
    if (tab.getAttribute("data-filter") === filter) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  renderCustomerList();
}

// Show sort options modal
function showSortOptions() {
  showModal("sort-modal");
}

// Close sort modal
function closeSortModal() {
  hideModal("sort-modal");
}

// Set sort option
function setSortOption(option) {
  customerSort = option;

  // Update sort buttons
  const sortBtns = document.querySelectorAll(".sort-option-btn");
  sortBtns.forEach((btn) => {
    if (btn.getAttribute("data-sort") === option) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  closeSortModal();
  renderCustomerList();
}

// Filter customers list
function filterCustomers() {
  const searchInput = document.getElementById("customer-search");
  const query = searchInput ? searchInput.value.toLowerCase() : "";

  const items = document.querySelectorAll(".customer-card");
  let visibleCount = 0;

  items.forEach((item) => {
    const name = item.getAttribute("data-name").toLowerCase();
    const mobile = item.getAttribute("data-mobile") || "";
    const village = item.getAttribute("data-village")?.toLowerCase() || "";

    if (
      name.includes(query) ||
      mobile.includes(query) ||
      village.includes(query)
    ) {
      item.style.display = "flex";
      visibleCount++;
    } else {
      item.style.display = "none";
    }
  });

  // Update count
  const countEl = document.getElementById("customer-count");
  if (countEl) {
    countEl.textContent = `${visibleCount} ग्राहक`;
  }

  // Show/hide clear button
  const clearBtn = document.querySelector("#page-customers .search-clear");
  if (clearBtn) {
    clearBtn.style.display = query ? "flex" : "none";
  }
}

// Clear customer search
function clearCustomerSearch() {
  const searchInput = document.getElementById("customer-search");
  if (searchInput) {
    searchInput.value = "";
    filterCustomers();
  }
}

// Continuing in Part 3...
/* ============================================
   DASHBOARD MODULE
   ============================================ */
async function loadDashboard() {
  try {
    // Update today's date
    const todayEl = document.getElementById("today-date");
    if (todayEl) {
      const today = new Date();
      const dayName = getDayName(today.getDay());
      todayEl.textContent = `${dayName}, ${formatDateDisplay(today)}`;
    }

    // Update online status
    updateOnlineStatus();

    // Load stats
    await loadDashboardStats();

    // Load recent entries
    await loadRecentEntries();

    // Load alerts
    await loadAlerts();

    // Update sync badge
    await SyncQueue.updatePendingCount();
  } catch (error) {
    console.error("Load dashboard error:", error);
  }
}

async function loadDashboardStats() {
  try {
    // Get today's stats
    const todayStats = await MilkEntries.getTodayStats();

    // Morning stats
    document.getElementById("morning-kg").textContent =
      todayStats.morning.kg.toFixed(1);
    document.getElementById("morning-amount").textContent = formatCurrency(
      todayStats.morning.amount,
    );

    // Evening stats
    document.getElementById("evening-kg").textContent =
      todayStats.evening.kg.toFixed(1);
    document.getElementById("evening-amount").textContent = formatCurrency(
      todayStats.evening.amount,
    );

    // Summary cards
    document.getElementById("total-milk").textContent =
      todayStats.total.kg.toFixed(1) + " kg";
    document.getElementById("today-income").textContent = formatCurrency(
      todayStats.total.amount,
    );

    // Active customers count
    const activeCustomers = await Customers.getActive();
    document.getElementById("active-customers").textContent =
      activeCustomers.length;

    // Pending dues
    const totalDues = await Customers.getTotalDues();
    document.getElementById("pending-dues").textContent =
      formatCurrency(totalDues);
  } catch (error) {
    console.error("Load dashboard stats error:", error);
  }
}

async function loadRecentEntries() {
  const container = document.getElementById("recent-entries");
  if (!container) return;

  try {
    const entries = await MilkEntries.getRecentEntries(5);

    if (entries.length === 0) {
      container.innerHTML = `
                <div class="empty-state small">
                    <span class="empty-icon">📝</span>
                    <p class="empty-text">${t("noEntries")}</p>
                </div>
            `;
      return;
    }

    let html = "";

    for (const entry of entries) {
      const customer = await Customers.getById(entry.customerId);
      const customerName = customer ? customer.name : "Unknown";
      const initials = getInitials(customerName);
      const shiftIcon = entry.shift === "morning" ? "☀️" : "🌙";
      const typeIcon = entry.milkType === "cow" ? "🐄" : "🐃";

      html += `
                <div class="recent-entry-item" data-id="${entry.id}">
                    <div class="entry-avatar">${initials}</div>
                    <div class="entry-info">
                        <div class="entry-name">${customerName}</div>
                        <div class="entry-meta">
                            <span>${shiftIcon}</span>
                            <span>${typeIcon}</span>
                            <span>${entry.quantityKg} kg</span>
                            <span>• ${formatDateReadable(entry.date)}</span>
                        </div>
                    </div>
                    <div class="entry-amount">${formatCurrency(entry.amount)}</div>
                    <button class="entry-undo" onclick="undoEntry('${entry.id}')">${t("undoEntry")}</button>
                </div>
            `;
    }

    container.innerHTML = html;
  } catch (error) {
    console.error("Load recent entries error:", error);
  }
}

async function loadAlerts() {
  const section = document.getElementById("alerts-section");
  const container = document.getElementById("alerts-list");
  if (!section || !container) return;

  try {
    const alerts = [];

    // Check for customers with high dues (> ₹5000)
    const customers = await Customers.getActive();
    for (const customer of customers) {
      const balance = await Customers.getBalance(customer.id);
      if (balance > 5000) {
        alerts.push({
          type: "warning",
          icon: "💰",
          text: `${customer.name} का बकाया ${formatCurrency(balance)} है`,
        });
      }
    }

    // Check for inactive customers with balance
    const allCustomers = await Customers.getAll();
    const inactive = allCustomers.filter((c) => !c.isActive);
    for (const customer of inactive.slice(0, 3)) {
      const balance = await Customers.getBalance(customer.id);
      if (balance > 0) {
        alerts.push({
          type: "info",
          icon: "👤",
          text: `${customer.name} (निष्क्रिय) का बकाया ${formatCurrency(balance)} है`,
        });
      }
    }

    if (alerts.length === 0) {
      section.style.display = "none";
      return;
    }

    section.style.display = "block";

    let html = "";
    for (const alert of alerts.slice(0, 5)) {
      html += `
                <div class="alert-item ${alert.type}">
                    <span class="alert-icon">${alert.icon}</span>
                    <span class="alert-text">${alert.text}</span>
                </div>
            `;
    }

    container.innerHTML = html;
  } catch (error) {
    console.error("Load alerts error:", error);
    section.style.display = "none";
  }
}

// Undo entry
async function undoEntry(entryId) {
  showConfirm(
    "एंट्री हटाएं",
    "क्या आप यह एंट्री हटाना चाहते हैं?",
    async () => {
      try {
        await MilkEntries.delete(entryId);
        showToast(t("entryDeleted"), "success");
        await loadDashboard();
      } catch (error) {
        console.error("Undo entry error:", error);
        showToast(t("error"), "error");
      }
    },
    "🗑️",
  );
}

/* ============================================
   CUSTOMERS LIST MODULE
   ============================================ */
async function loadCustomersList() {
  try {
    await Customers.getAll();
    renderCustomerList();
  } catch (error) {
    console.error("Load customers list error:", error);
  }
}

async function renderCustomerList() {
  const container = document.getElementById("customer-list");
  if (!container) return;

  try {
    let customers = [...APP.cache.customers];

    // Apply filter
    if (customerFilter === "active") {
      customers = customers.filter((c) => c.isActive);
    } else if (customerFilter === "inactive") {
      customers = customers.filter((c) => !c.isActive);
    }

    // Apply sort
    switch (customerSort) {
      case "name":
        customers.sort((a, b) => a.name.localeCompare(b.name, "hi"));
        break;
      case "name-desc":
        customers.sort((a, b) => b.name.localeCompare(a.name, "hi"));
        break;
      case "due-high":
        // Sort by due amount (needs async calculation)
        const balances = {};
        for (const c of customers) {
          balances[c.id] = await Customers.getBalance(c.id);
        }
        customers.sort((a, b) => (balances[b.id] || 0) - (balances[a.id] || 0));
        break;
      case "recent":
        customers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    // Update count
    const countEl = document.getElementById("customer-count");
    if (countEl) {
      countEl.textContent = `${customers.length} ग्राहक`;
    }

    if (customers.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">👥</span>
                    <p class="empty-text">${t("noCustomers")}</p>
                    <button class="btn btn-primary btn-sm" onclick="navigate('customer-form')">
                        <span>➕</span> ग्राहक जोड़ें
                    </button>
                </div>
            `;
      return;
    }

    let html = "";

    for (const customer of customers) {
      const initials = getInitials(customer.name);
      const balance = await Customers.getBalance(customer.id);
      const balanceClass = balance > 0 ? "" : "positive";
      const balanceText =
        balance >= 0
          ? formatCurrency(balance)
          : formatCurrency(Math.abs(balance));
      const balanceLabel = balance >= 0 ? t("due") : t("paid");
      const inactiveClass = customer.isActive ? "" : "inactive";

      html += `
                <div class="customer-card ${inactiveClass}" 
                     data-id="${customer.id}"
                     data-name="${customer.name}"
                     data-mobile="${customer.mobile || ""}"
                     data-village="${customer.village || ""}"
                     onclick="navigate('customer-detail', {customerId: '${customer.id}'})">
                    <div class="customer-avatar">
                        ${
                          customer.photo
                            ? `<img src="${customer.photo}" alt="${customer.name}">`
                            : `<div class="avatar-placeholder">${initials}</div>`
                        }
                        ${!customer.isActive ? '<span class="inactive-badge">✕</span>' : ""}
                    </div>
                    <div class="customer-info">
                        <div class="customer-name">${customer.name}</div>
                        <div class="customer-village">
                            ${customer.village ? `<span>🏘️ ${customer.village}</span>` : ""}
                            ${customer.mobile ? `<span>📱 ${customer.mobile}</span>` : ""}
                        </div>
                    </div>
                    <div class="customer-balance">
                        <div class="balance-amount ${balanceClass}">${balanceText}</div>
                        <div class="balance-label">${balanceLabel}</div>
                    </div>
                </div>
            `;
    }

    container.innerHTML = html;
  } catch (error) {
    console.error("Render customer list error:", error);
  }
}

/* ============================================
   CUSTOMER FORM MODULE
   ============================================ */
async function loadCustomerForm(customerId = null) {
  const form = document.getElementById("customer-form");
  const titleEl = document.getElementById("customer-form-title");
  const deleteBtn = document.getElementById("delete-customer-btn");

  // Reset form
  if (form) form.reset();

  // Reset photo
  const photoPreview = document.getElementById("customer-photo-preview");
  const photoPlaceholder = document.getElementById("photo-placeholder");
  const photoText = document.querySelector(".photo-upload .photo-text");
  const photoUpload = document.querySelector(".photo-upload");

  if (photoPreview) {
    photoPreview.src = "";
    photoPreview.style.display = "none";
  }
  if (photoPlaceholder) photoPlaceholder.style.display = "flex";
  if (photoText) photoText.style.display = "block";
  if (photoUpload) photoUpload.dataset.photo = "";

  // Reset hidden fields
  document.getElementById("customer-id").value = "";

  // Load settings for default rates
  const settings = await Settings.get();

  if (customerId) {
    // Edit mode
    titleEl.textContent = t("editCustomer");
    deleteBtn.style.display = "block";

    const customer = await Customers.getById(customerId);
    if (customer) {
      document.getElementById("customer-id").value = customer.id;
      document.getElementById("customer-name").value = customer.name || "";
      document.getElementById("customer-mobile").value = customer.mobile || "";
      document.getElementById("customer-village").value =
        customer.village || "";
      document.getElementById("customer-cow-rate").value =
        customer.cowRate || settings.defaultCowRate;
      document.getElementById("customer-buffalo-rate").value =
        customer.buffaloRate || settings.defaultBuffaloRate;
      document.getElementById("customer-notes").value = customer.notes || "";
      document.getElementById("customer-active").checked =
        customer.isActive !== false;

      // Set default milk type
      setDefaultMilkType(customer.defaultMilkType || "buffalo");

      // Set photo
      if (customer.photo) {
        if (photoPreview) {
          photoPreview.src = customer.photo;
          photoPreview.style.display = "block";
        }
        if (photoPlaceholder) photoPlaceholder.style.display = "none";
        if (photoText) photoText.style.display = "none";
        if (photoUpload) photoUpload.dataset.photo = customer.photo;
      }
    }
  } else {
    // Add mode
    titleEl.textContent = t("newCustomer");
    deleteBtn.style.display = "none";

    // Set default rates
    document.getElementById("customer-cow-rate").value =
      settings.defaultCowRate;
    document.getElementById("customer-buffalo-rate").value =
      settings.defaultBuffaloRate;

    // Set default milk type
    setDefaultMilkType("buffalo");
    document.getElementById("customer-active").checked = true;
  }
}

// Save customer form
async function saveCustomerForm(event) {
  event.preventDefault();

  const name = document.getElementById("customer-name").value.trim();
  const mobile = document.getElementById("customer-mobile").value.trim();

  // Validation
  if (!name) {
    showToast(t("fillRequired"), "warning");
    return;
  }

  if (mobile && !isValidMobile(mobile)) {
    showToast(t("invalidMobile"), "warning");
    return;
  }

  const customerId = document.getElementById("customer-id").value;
  const photoUpload = document.querySelector(".photo-upload");

  const customerData = {
    id: customerId || null,
    name: name,
    mobile: mobile,
    village: document.getElementById("customer-village").value.trim(),
    photo: photoUpload?.dataset.photo || "",
    cowRate: parseFloatSafe(document.getElementById("customer-cow-rate").value),
    buffaloRate: parseFloatSafe(
      document.getElementById("customer-buffalo-rate").value,
    ),
    defaultMilkType: document.getElementById("customer-default-milk-type")
      .value,
    notes: document.getElementById("customer-notes").value.trim(),
    isActive: document.getElementById("customer-active").checked,
  };

  try {
    showLoading();
    await Customers.save(customerData);
    hideLoading();

    vibrate(100);
    showToast(t("customerSaved"), "success");

    // Go back to customers list
    navigate("customers");
  } catch (error) {
    hideLoading();
    console.error("Save customer error:", error);
    showToast(t("error"), "error");
  }
}

// Delete customer
async function deleteCustomer() {
  const customerId = document.getElementById("customer-id").value;
  if (!customerId) return;

  showConfirm(
    t("delete"),
    t("confirmDelete"),
    async () => {
      try {
        showLoading();
        await Customers.delete(customerId);
        hideLoading();

        showToast(t("customerDeleted"), "success");
        navigate("customers");
      } catch (error) {
        hideLoading();
        console.error("Delete customer error:", error);
        showToast(t("error"), "error");
      }
    },
    "🗑️",
  );
}

/* ============================================
   CUSTOMER DETAIL MODULE
   ============================================ */
let currentDetailCustomerId = null;
let detailMonth = new Date();

async function loadCustomerDetail(customerId) {
  if (!customerId) {
    navigate("customers");
    return;
  }

  currentDetailCustomerId = customerId;
  detailMonth = new Date();

  const customer = await Customers.getById(customerId);
  if (!customer) {
    showToast("ग्राहक नहीं मिला", "error");
    navigate("customers");
    return;
  }

  APP.cache.currentCustomer = customer;

  // Update profile card
  const photoEl = document.getElementById("detail-customer-photo");
  const photoPlaceholder = document.getElementById("detail-photo-placeholder");
  const nameEl = document.getElementById("detail-customer-name");
  const villageEl = document.getElementById("detail-customer-village");
  const statusEl = document.getElementById("detail-customer-status");

  if (customer.photo) {
    if (photoEl) {
      photoEl.src = customer.photo;
      photoEl.style.display = "block";
    }
    if (photoPlaceholder) photoPlaceholder.style.display = "none";
  } else {
    if (photoEl) photoEl.style.display = "none";
    if (photoPlaceholder) photoPlaceholder.style.display = "flex";
  }

  if (nameEl) nameEl.textContent = customer.name;
  if (villageEl)
    villageEl.textContent = customer.village || customer.mobile || "";

  if (statusEl) {
    if (customer.isActive) {
      statusEl.textContent = t("active");
      statusEl.className = "profile-status active";
    } else {
      statusEl.textContent = t("inactive");
      statusEl.className = "profile-status inactive";
    }
  }

  // Update call/whatsapp buttons
  const callBtn = document.getElementById("detail-call-btn");
  const whatsappBtn = document.getElementById("detail-whatsapp-btn");

  if (callBtn) {
    callBtn.style.display = customer.mobile ? "flex" : "none";
  }
  if (whatsappBtn) {
    whatsappBtn.style.display = customer.mobile ? "flex" : "none";
  }

  // Update rate cards
  document.getElementById("detail-cow-rate").textContent =
    `₹${customer.cowRate}/kg`;
  document.getElementById("detail-buffalo-rate").textContent =
    `₹${customer.buffaloRate}/kg`;

  // Load month summary
  await loadDetailMonthSummary();

  // Load history (default: milk)
  await loadCustomerHistory("milk");

  // Show notes if exists
  const notesSection = document.getElementById("detail-notes-section");
  const notesText = document.getElementById("detail-notes-text");

  if (customer.notes) {
    if (notesSection) notesSection.style.display = "block";
    if (notesText) notesText.textContent = customer.notes;
  } else {
    if (notesSection) notesSection.style.display = "none";
  }
}

// Load detail month summary
async function loadDetailMonthSummary() {
  const customerId = currentDetailCustomerId;
  if (!customerId) return;

  // Update month display
  const monthEl = document.getElementById("detail-summary-month");
  if (monthEl) {
    monthEl.textContent = formatMonthDisplay(detailMonth);
  }

  // Get data for month
  const entries = await MilkEntries.getByCustomer(customerId, detailMonth);
  const products = await Products.getByCustomer(customerId, detailMonth);
  const payments = await Payments.getByCustomer(customerId, detailMonth);

  const milkTotal = entries.reduce(
    (sum, e) => sum + parseFloatSafe(e.quantityKg),
    0,
  );
  const milkAmount = entries.reduce((sum, e) => sum + e.amount, 0);
  const productsAmount = products.reduce((sum, p) => sum + p.amount, 0);
  const paymentsAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  const totalBill = milkAmount + productsAmount;
  const balance = totalBill - paymentsAmount;

  document.getElementById("detail-total-milk").textContent =
    `${milkTotal.toFixed(1)} kg`;
  document.getElementById("detail-total-amount").textContent =
    formatCurrency(totalBill);
  document.getElementById("detail-balance").textContent =
    formatCurrency(balance);
}

// Change detail month
function changeDetailMonth(delta) {
  detailMonth.setMonth(detailMonth.getMonth() + delta);
  loadDetailMonthSummary();

  // Reload current history tab
  const activeTab = document.querySelector(".history-tab.active");
  if (activeTab) {
    const tabName = activeTab.getAttribute("data-tab");
    loadCustomerHistory(tabName);
  }
}

// Switch history tab
function switchHistoryTab(tabName) {
  // Update tab buttons
  const tabs = document.querySelectorAll(".history-tab");
  tabs.forEach((tab) => {
    if (tab.getAttribute("data-tab") === tabName) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Hide all content
  const contents = document.querySelectorAll("[data-tab-content]");
  contents.forEach((content) => {
    content.style.display = "none";
  });

  // Show target content
  const targetContent = document.querySelector(
    `[data-tab-content="${tabName}"]`,
  );
  if (targetContent) {
    targetContent.style.display = "flex";
  }

  // Load data
  loadCustomerHistory(tabName);
}

// Load customer history
async function loadCustomerHistory(tabName) {
  const customerId = currentDetailCustomerId;
  if (!customerId) return;

  switch (tabName) {
    case "milk":
      await loadMilkHistory(customerId);
      break;
    case "products":
      await loadProductsHistory(customerId);
      break;
    case "payments":
      await loadPaymentsHistory(customerId);
      break;
  }
}

// Load milk history
async function loadMilkHistory(customerId) {
  const container = document.getElementById("milk-history");
  if (!container) return;

  const entries = await MilkEntries.getByCustomer(customerId, detailMonth);
  entries.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (entries.length === 0) {
    container.innerHTML = `
            <div class="empty-state small">
                <span class="empty-icon">🥛</span>
                <p class="empty-text">${t("noEntries")}</p>
            </div>
        `;
    return;
  }

  let html = "";
  for (const entry of entries) {
    const shiftIcon = entry.shift === "morning" ? "☀️" : "🌙";
    const typeIcon = entry.milkType === "cow" ? "🐄" : "🐃";

    html += `
            <div class="history-item" data-id="${entry.id}">
                <div class="item-info">
                    <div class="item-date">${formatDateDisplay(entry.date)}</div>
                    <div class="item-detail">${shiftIcon} ${typeIcon} ${entry.quantityKg} kg @ ₹${entry.rate}</div>
                </div>
                <div class="item-amount">${formatCurrency(entry.amount)}</div>
            </div>
        `;
  }

  container.innerHTML = html;
}

// Load products history
async function loadProductsHistory(customerId) {
  const container = document.getElementById("products-history");
  if (!container) return;

  const products = await Products.getByCustomer(customerId, detailMonth);
  products.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (products.length === 0) {
    container.innerHTML = `
            <div class="empty-state small">
                <span class="empty-icon">📦</span>
                <p class="empty-text">${t("noProducts")}</p>
            </div>
        `;
    return;
  }

  let html = "";
  for (const product of products) {
    html += `
            <div class="history-item" data-id="${product.id}">
                <div class="item-info">
                    <div class="item-date">${formatDateDisplay(product.date)}</div>
                    <div class="item-detail">📦 ${product.itemName} ${product.quantity || ""}</div>
                </div>
                <div class="item-amount">${formatCurrency(product.amount)}</div>
            </div>
        `;
  }

  container.innerHTML = html;
}

// Load payments history
async function loadPaymentsHistory(customerId) {
  const container = document.getElementById("payments-history");
  if (!container) return;

  const payments = await Payments.getByCustomer(customerId, detailMonth);
  payments.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (payments.length === 0) {
    container.innerHTML = `
            <div class="empty-state small">
                <span class="empty-icon">💵</span>
                <p class="empty-text">${t("noPayments")}</p>
            </div>
        `;
    return;
  }

  let html = "";
  for (const payment of payments) {
    const modeIcon =
      payment.mode === "cash" ? "💵" : payment.mode === "upi" ? "📱" : "🏦";

    html += `
            <div class="history-item" data-id="${payment.id}">
                <div class="item-info">
                    <div class="item-date">${formatDateDisplay(payment.date)}</div>
                    <div class="item-detail">${modeIcon} ${t(payment.mode)}</div>
                </div>
                <div class="item-amount positive">${formatCurrency(payment.amount)}</div>
            </div>
        `;
  }

  container.innerHTML = html;
}

// Call customer
function callCustomer() {
  const customer = APP.cache.currentCustomer;
  if (customer && customer.mobile) {
    window.location.href = `tel:${customer.mobile}`;
  }
}

// WhatsApp customer
function whatsappCustomer() {
  const customer = APP.cache.currentCustomer;
  if (customer && customer.mobile) {
    const phone = `91${customer.mobile}`;
    window.open(`https://wa.me/${phone}`, "_blank");
  }
}

// Edit current customer
function editCurrentCustomer() {
  if (currentDetailCustomerId) {
    navigate("customer-form", { customerId: currentDetailCustomerId });
  }
}

// Delete current customer
function deleteCurrentCustomer() {
  if (currentDetailCustomerId) {
    showConfirm(
      t("delete"),
      t("confirmDelete"),
      async () => {
        try {
          showLoading();
          await Customers.delete(currentDetailCustomerId);
          hideLoading();

          showToast(t("customerDeleted"), "success");
          navigate("customers");
        } catch (error) {
          hideLoading();
          console.error("Delete customer error:", error);
          showToast(t("error"), "error");
        }
      },
      "🗑️",
    );
  }
}

// Quick entry for customer
function quickEntryForCustomer() {
  if (currentDetailCustomerId) {
    navigate("quick-entry");
    // Open numpad after a short delay
    setTimeout(() => {
      openNumpad(currentDetailCustomerId);
    }, 300);
  }
}

// View customer bill
function viewCustomerBill() {
  if (currentDetailCustomerId) {
    navigate("bill", {
      customerId: currentDetailCustomerId,
      month: detailMonth,
    });
  }
}

// Show add payment for customer
function showAddPaymentForCustomer() {
  if (currentDetailCustomerId) {
    showAddPaymentModal(currentDetailCustomerId);
  }
}

// Show add product for customer
function showAddProductForCustomer() {
  if (currentDetailCustomerId) {
    showAddProductModal(currentDetailCustomerId);
  }
}

/* ============================================
   QUICK ENTRY MODULE
   ============================================ */
async function loadQuickEntry(shift = null) {
  // Set date to today if not set
  if (!APP.cache.entryDate) {
    APP.cache.entryDate = new Date();
  }

  // Set shift
  if (shift) {
    APP.cache.entryShift = shift;
  } else if (!APP.cache.entryShift) {
    APP.cache.entryShift = getCurrentShift();
  }

  // Update date display
  updateEntryDateDisplay();

  // Update shift toggle
  const shiftBtns = document.querySelectorAll(".shift-toggle .shift-btn");
  shiftBtns.forEach((btn) => {
    if (btn.getAttribute("data-shift") === APP.cache.entryShift) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Load customers
  await loadQuickEntryCustomers();
}

async function loadQuickEntryCustomers() {
  const container = document.getElementById("entry-customer-list");
  if (!container) return;

  try {
    const customers = await Customers.getActive();

    if (customers.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">👥</span>
                    <p class="empty-text">${t("noCustomers")}</p>
                    <button class="btn btn-primary btn-sm" onclick="navigate('customer-form')">
                        <span>➕</span> ग्राहक जोड़ें
                    </button>
                </div>
            `;
      updateEntryProgress(0, 0);
      return;
    }

    // Get entries for current date and shift
    const entries = await MilkEntries.getByDateAndShift(
      APP.cache.entryDate,
      APP.cache.entryShift,
    );

    const entryMap = {};
    entries.forEach((e) => {
      entryMap[e.customerId] = e;
    });

    // Sort: pending first, then by name
    customers.sort((a, b) => {
      const aDone = !!entryMap[a.id];
      const bDone = !!entryMap[b.id];
      if (aDone !== bDone) return aDone ? 1 : -1;
      return a.name.localeCompare(b.name, "hi");
    });

    let html = "";
    let doneCount = 0;

    for (const customer of customers) {
      const entry = entryMap[customer.id];
      const isDone = !!entry;
      const initials = getInitials(customer.name);
      const defaultType = customer.defaultMilkType || "buffalo";
      const defaultRate =
        defaultType === "cow" ? customer.cowRate : customer.buffaloRate;

      if (isDone) doneCount++;

      html += `
                <div class="entry-customer-item ${isDone ? "done" : ""}"
                     data-id="${customer.id}"
                     data-name="${customer.name}"
                     data-mobile="${customer.mobile || ""}"
                     onclick="openNumpad('${customer.id}')">
                    <div class="customer-avatar">${initials}</div>
                    <div class="customer-info">
                        <div class="customer-name">${customer.name}</div>
                        <div class="customer-rate">${defaultType === "cow" ? "🐄" : "🐃"} ₹${defaultRate}/kg</div>
                    </div>
                    ${
                      isDone
                        ? `<div class="entry-amount">${entry.quantityKg} kg • ${formatCurrency(entry.amount)}</div>
                           <div class="entry-status done">✓</div>`
                        : `<div class="entry-status pending">○</div>`
                    }
                </div>
            `;
    }

    container.innerHTML = html;

    // Update progress
    updateEntryProgress(doneCount, customers.length);
  } catch (error) {
    console.error("Load quick entry customers error:", error);
  }
}

function updateEntryProgress(done, total) {
  const progressFill = document.getElementById("entry-progress-fill");
  const progressText = document.getElementById("entry-progress-text");

  const percentage = total > 0 ? (done / total) * 100 : 0;

  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }

  if (progressText) {
    progressText.textContent = `${done}/${total} ${t("done")}`;
  }
}

/* ============================================
   BULK ENTRY MODULE
   ============================================ */
async function loadBulkEntry() {
  // Update date and shift display
  const dateDisplay = document.getElementById("bulk-date-display");
  const shiftDisplay = document.getElementById("bulk-shift-display");

  if (dateDisplay) {
    dateDisplay.textContent = formatDateReadable(APP.cache.entryDate);
  }

  if (shiftDisplay) {
    const shiftIcon = APP.cache.entryShift === "morning" ? "☀️" : "🌙";
    const shiftName = t(APP.cache.entryShift);
    shiftDisplay.innerHTML = `<span class="shift-icon">${shiftIcon}</span><span>${shiftName}</span>`;
  }

  // Load table
  await loadBulkEntryTable();
}

async function loadBulkEntryTable() {
  const tbody = document.getElementById("bulk-table-body");
  if (!tbody) return;

  try {
    const customers = await Customers.getActive();

    if (customers.length === 0) {
      tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; padding: 20px;">
                        ${t("noCustomers")}
                    </td>
                </tr>
            `;
      return;
    }

    // Get existing entries
    const entries = await MilkEntries.getByDateAndShift(
      APP.cache.entryDate,
      APP.cache.entryShift,
    );

    const entryMap = {};
    entries.forEach((e) => {
      entryMap[e.customerId] = e;
    });

    // Sort by name
    customers.sort((a, b) => a.name.localeCompare(b.name, "hi"));

    let html = "";

    for (const customer of customers) {
      const entry = entryMap[customer.id];
      const defaultType = customer.defaultMilkType || "buffalo";
      const currentType = entry ? entry.milkType : defaultType;
      const currentQty = entry ? entry.quantityKg : "";
      const rate =
        currentType === "cow" ? customer.cowRate : customer.buffaloRate;
      const amount = entry ? entry.amount : 0;

      html += `
                <tr data-customer-id="${customer.id}" data-entry-id="${entry ? entry.id : ""}">
                    <td class="td-customer">${customer.name}</td>
                    <td class="td-type">
                        <span class="type-badge ${currentType}" 
                              onclick="toggleBulkMilkType(this, '${customer.id}')"
                              data-type="${currentType}"
                              data-cow-rate="${customer.cowRate}"
                              data-buffalo-rate="${customer.buffaloRate}">
                            ${currentType === "cow" ? "🐄" : "🐃"}
                        </span>
                    </td>
                    <td class="td-qty">
                        <input type="number" 
                               class="bulk-input" 
                               value="${currentQty}"
                               step="0.25" 
                               min="0"
                               data-rate="${rate}"
                               onchange="updateBulkAmount(this)">
                    </td>
                    <td class="td-amount" data-amount="${amount}">${formatCurrency(amount)}</td>
                </tr>
            `;
    }

    tbody.innerHTML = html;

    // Update totals
    updateBulkTotals();
  } catch (error) {
    console.error("Load bulk entry table error:", error);
  }
}

// Toggle milk type in bulk entry
function toggleBulkMilkType(badge, customerId) {
  const currentType = badge.getAttribute("data-type");
  const newType = currentType === "cow" ? "buffalo" : "cow";
  const cowRate = parseFloat(badge.getAttribute("data-cow-rate"));
  const buffaloRate = parseFloat(badge.getAttribute("data-buffalo-rate"));
  const newRate = newType === "cow" ? cowRate : buffaloRate;

  badge.setAttribute("data-type", newType);
  badge.className = `type-badge ${newType}`;
  badge.textContent = newType === "cow" ? "🐄" : "🐃";

  // Update rate in input
  const row = badge.closest("tr");
  const input = row.querySelector(".bulk-input");
  if (input) {
    input.setAttribute("data-rate", newRate);
    updateBulkAmount(input);
  }
}

// Update bulk amount
function updateBulkAmount(input) {
  const qty = parseFloatSafe(input.value);
  const rate = parseFloatSafe(input.getAttribute("data-rate"));
  const amount = qty * rate;

  const row = input.closest("tr");
  const amountCell = row.querySelector(".td-amount");
  if (amountCell) {
    amountCell.textContent = formatCurrency(amount);
    amountCell.setAttribute("data-amount", amount);
  }

  updateBulkTotals();
}

// Update bulk totals
function updateBulkTotals() {
  const tbody = document.getElementById("bulk-table-body");
  if (!tbody) return;

  let totalKg = 0;
  let totalAmount = 0;

  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row) => {
    const input = row.querySelector(".bulk-input");
    const amountCell = row.querySelector(".td-amount");

    if (input && input.value) {
      totalKg += parseFloatSafe(input.value);
    }
    if (amountCell) {
      totalAmount += parseFloatSafe(amountCell.getAttribute("data-amount"));
    }
  });

  document.getElementById("bulk-total-kg").textContent =
    `${totalKg.toFixed(2)} kg`;
  document.getElementById("bulk-total-amount").textContent =
    formatCurrency(totalAmount);
}

// Save bulk entries
async function saveBulkEntries() {
  const tbody = document.getElementById("bulk-table-body");
  if (!tbody) return;

  const rows = tbody.querySelectorAll("tr");
  let savedCount = 0;
  let errorCount = 0;

  showLoading("सेव हो रहा है...");

  for (const row of rows) {
    const customerId = row.getAttribute("data-customer-id");
    const entryId = row.getAttribute("data-entry-id");
    const input = row.querySelector(".bulk-input");
    const typeBadge = row.querySelector(".type-badge");

    const qty = parseFloatSafe(input?.value);

    if (qty <= 0) {
      // Skip empty entries, but delete if existed
      if (entryId) {
        try {
          await MilkEntries.delete(entryId);
        } catch (error) {
          console.error("Delete empty entry error:", error);
        }
      }
      continue;
    }

    const milkType = typeBadge?.getAttribute("data-type") || "buffalo";
    const rate = parseFloatSafe(input?.getAttribute("data-rate"));

    try {
      await MilkEntries.save({
        id: entryId || null,
        customerId,
        date: APP.cache.entryDate,
        shift: APP.cache.entryShift,
        milkType,
        quantityKg: qty,
        rate,
        amount: qty * rate,
      });
      savedCount++;
    } catch (error) {
      console.error("Save bulk entry error:", error);
      errorCount++;
    }
  }

  hideLoading();

  if (errorCount > 0) {
    showToast(`${savedCount} सेव, ${errorCount} त्रुटि`, "warning");
  } else if (savedCount > 0) {
    vibrate(100);
    showToast(`${savedCount} एंट्री सेव हो गई`, "success");
  } else {
    showToast("कोई एंट्री नहीं", "info");
  }

  // Go back
  goBack();
}

// Continuing in Part 4...
/* ============================================
   PRODUCTS MODULE
   ============================================ */
let productsMonth = new Date();

async function loadProducts() {
  productsMonth = new Date();
  await renderProductsList();
}

async function renderProductsList() {
  // Update month display
  const monthDisplay = document.getElementById("products-month-display");
  if (monthDisplay) {
    monthDisplay.textContent = formatMonthDisplay(productsMonth);
  }

  // Get products for month
  const products = await Products.getByMonth(productsMonth);
  products.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Update monthly total
  const total = products.reduce((sum, p) => sum + p.amount, 0);
  const totalEl = document.getElementById("products-monthly-total");
  if (totalEl) {
    totalEl.textContent = formatCurrency(total);
  }

  // Render list
  const container = document.getElementById("products-list");
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📦</span>
                <p class="empty-text">${t("noProducts")}</p>
                <button class="btn btn-primary btn-sm" onclick="showAddProductModal()">
                    <span>➕</span> सामान जोड़ें
                </button>
            </div>
        `;
    return;
  }

  let html = "";

  for (const product of products) {
    const customer = await Customers.getById(product.customerId);
    const customerName = customer ? customer.name : "Unknown";

    html += `
            <div class="product-item" data-id="${product.id}">
                <div class="product-icon">📦</div>
                <div class="product-info">
                    <div class="product-name">${product.itemName}</div>
                    <div class="product-meta">
                        ${customerName} • ${formatDateDisplay(product.date)}
                        ${product.quantity ? ` • ${product.quantity}` : ""}
                    </div>
                </div>
                <div class="product-amount">${formatCurrency(product.amount)}</div>
                <div class="product-actions">
                    <button class="action-icon-btn" onclick="editProduct('${product.id}')">✏️</button>
                    <button class="action-icon-btn" onclick="deleteProduct('${product.id}')">🗑️</button>
                </div>
            </div>
        `;
  }

  container.innerHTML = html;
}

// Change products month
function changeProductsMonth(delta) {
  productsMonth.setMonth(productsMonth.getMonth() + delta);
  renderProductsList();
}

// Show add product modal
async function showAddProductModal(customerId = null) {
  const form = document.getElementById("product-form");
  if (form) form.reset();

  // Reset hidden fields
  document.getElementById("product-id").value = "";
  document.getElementById("product-customer-id").value = customerId || "";

  // Set today's date
  document.getElementById("product-date").value = formatDateISO(new Date());

  // Populate customer select
  await populateCustomerSelect("product-customer-select", customerId);

  showModal("product-modal");
}

// Populate customer select dropdown
async function populateCustomerSelect(selectId, selectedId = null) {
  const select = document.getElementById(selectId);
  if (!select) return;

  const customers = await Customers.getActive();
  customers.sort((a, b) => a.name.localeCompare(b.name, "hi"));

  let html = '<option value="">ग्राहक चुनें</option>';

  for (const customer of customers) {
    const selected = customer.id === selectedId ? "selected" : "";
    html += `<option value="${customer.id}" ${selected}>${customer.name}</option>`;
  }

  select.innerHTML = html;
}

// Set product item name from quick button
function setProductItem(itemName) {
  const input = document.getElementById("product-item-name");
  if (input) {
    input.value = itemName;
  }
}

// Edit product
async function editProduct(productId) {
  const product = await Products.getById(productId);
  if (!product) return;

  document.getElementById("product-id").value = product.id;
  document.getElementById("product-customer-id").value = product.customerId;
  document.getElementById("product-date").value = product.date;
  document.getElementById("product-item-name").value = product.itemName;
  document.getElementById("product-quantity").value = product.quantity || "";
  document.getElementById("product-amount").value = product.amount;
  document.getElementById("product-note").value = product.note || "";

  // Populate and select customer
  await populateCustomerSelect("product-customer-select", product.customerId);

  showModal("product-modal");
}

// Save product
async function saveProduct(event) {
  event.preventDefault();

  const customerId = document.getElementById("product-customer-select").value;
  const itemName = document.getElementById("product-item-name").value.trim();
  const amount = parseFloatSafe(
    document.getElementById("product-amount").value,
  );

  if (!customerId || !itemName || amount <= 0) {
    showToast(t("fillRequired"), "warning");
    return;
  }

  const productData = {
    id: document.getElementById("product-id").value || null,
    customerId,
    date: document.getElementById("product-date").value,
    itemName,
    quantity: document.getElementById("product-quantity").value.trim(),
    amount,
    note: document.getElementById("product-note").value.trim(),
  };

  try {
    showLoading();
    await Products.save(productData);
    hideLoading();

    vibrate(100);
    showToast(t("productSaved"), "success");

    closeProductModal();

    // Refresh list if on products page
    if (APP.state.currentPage === "products") {
      await renderProductsList();
    }

    // Refresh customer detail if viewing
    if (
      APP.state.currentPage === "customer-detail" &&
      currentDetailCustomerId === customerId
    ) {
      await loadDetailMonthSummary();
      await loadCustomerHistory("products");
    }
  } catch (error) {
    hideLoading();
    console.error("Save product error:", error);
    showToast(t("error"), "error");
  }
}

// Delete product
function deleteProduct(productId) {
  showConfirm(
    t("delete"),
    t("confirmDelete"),
    async () => {
      try {
        showLoading();
        await Products.delete(productId);
        hideLoading();

        showToast("सामान हटा दिया गया", "success");
        await renderProductsList();
      } catch (error) {
        hideLoading();
        console.error("Delete product error:", error);
        showToast(t("error"), "error");
      }
    },
    "🗑️",
  );
}

// Close product modal
function closeProductModal() {
  hideModal("product-modal");
}

/* ============================================
   PAYMENTS MODULE
   ============================================ */
let paymentsMonth = new Date();

async function loadPayments() {
  paymentsMonth = new Date();
  await renderPaymentsPage();
}

async function renderPaymentsPage() {
  // Update month display
  const monthDisplay = document.getElementById("payments-month-display");
  if (monthDisplay) {
    monthDisplay.textContent = formatMonthDisplay(paymentsMonth);
  }

  // Get all data for month
  const entries = await MilkEntries.getByMonth(paymentsMonth);
  const products = await Products.getByMonth(paymentsMonth);
  const payments = await Payments.getByMonth(paymentsMonth);

  const milkTotal = entries.reduce((sum, e) => sum + e.amount, 0);
  const productsTotal = products.reduce((sum, p) => sum + p.amount, 0);
  const paymentsTotal = payments.reduce((sum, p) => sum + p.amount, 0);

  const totalBill = milkTotal + productsTotal;
  const pending = totalBill - paymentsTotal;

  // Update summary
  document.getElementById("payments-total-bill").textContent =
    formatCurrency(totalBill);
  document.getElementById("payments-received").textContent =
    formatCurrency(paymentsTotal);
  document.getElementById("payments-pending").textContent =
    formatCurrency(pending);

  // Load pending dues
  await loadPendingDues();

  // Load recent payments
  await loadRecentPayments();
}

// Change payments month
function changePaymentsMonth(delta) {
  paymentsMonth.setMonth(paymentsMonth.getMonth() + delta);
  renderPaymentsPage();
}

// Load pending dues list
async function loadPendingDues() {
  const container = document.getElementById("pending-dues-list");
  if (!container) return;

  const customers = await Customers.getActive();
  const duesList = [];

  for (const customer of customers) {
    const balance = await Customers.getBalance(customer.id);
    if (balance > 0) {
      duesList.push({
        customer,
        balance,
      });
    }
  }

  // Sort by balance descending
  duesList.sort((a, b) => b.balance - a.balance);

  if (duesList.length === 0) {
    container.innerHTML = `
            <div class="empty-state small">
                <p class="empty-text">कोई बकाया नहीं 🎉</p>
            </div>
        `;
    return;
  }

  let html = "";

  for (const item of duesList.slice(0, 10)) {
    const initials = getInitials(item.customer.name);

    html += `
            <div class="due-item" onclick="showAddPaymentModal('${item.customer.id}')">
                <div class="due-avatar">${initials}</div>
                <div class="due-info">
                    <div class="due-name">${item.customer.name}</div>
                </div>
                <div class="due-amount">${formatCurrency(item.balance)}</div>
                <button class="pay-btn" onclick="event.stopPropagation(); showAddPaymentModal('${item.customer.id}')">
                    भुगतान
                </button>
            </div>
        `;
  }

  container.innerHTML = html;
}

// Load recent payments
async function loadRecentPayments() {
  const container = document.getElementById("payments-list");
  if (!container) return;

  const payments = await Payments.getRecent(10);

  if (payments.length === 0) {
    container.innerHTML = `
            <div class="empty-state small">
                <p class="empty-text">${t("noPayments")}</p>
            </div>
        `;
    return;
  }

  let html = "";

  for (const payment of payments) {
    const customer = await Customers.getById(payment.customerId);
    const customerName = customer ? customer.name : "Unknown";
    const modeIcon =
      payment.mode === "cash" ? "💵" : payment.mode === "upi" ? "📱" : "🏦";

    html += `
            <div class="payment-item" data-id="${payment.id}">
                <div class="payment-icon">${modeIcon}</div>
                <div class="payment-info">
                    <div class="payment-customer">${customerName}</div>
                    <div class="payment-meta">
                        <span>${formatDateDisplay(payment.date)}</span>
                        <span class="payment-mode">${t(payment.mode)}</span>
                    </div>
                </div>
                <div class="payment-amount">${formatCurrency(payment.amount)}</div>
            </div>
        `;
  }

  container.innerHTML = html;
}

// Show add payment modal
async function showAddPaymentModal(customerId = null) {
  const form = document.getElementById("payment-form");
  if (form) form.reset();

  // Reset hidden fields
  document.getElementById("payment-id").value = "";
  document.getElementById("payment-customer-id").value = customerId || "";
  document.getElementById("payment-mode").value = "cash";

  // Set today's date
  document.getElementById("payment-date").value = formatDateISO(new Date());

  // Populate customer select
  await populateCustomerSelect("payment-customer-select", customerId);

  // Reset mode buttons
  const modeBtns = document.querySelectorAll(".payment-mode-toggle .mode-btn");
  modeBtns.forEach((btn) => {
    if (btn.getAttribute("data-mode") === "cash") {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Show customer due if selected
  if (customerId) {
    await onPaymentCustomerChange();
  } else {
    document.getElementById("payment-customer-due").style.display = "none";
  }

  showModal("payment-modal");
}

// On payment customer change
async function onPaymentCustomerChange() {
  const select = document.getElementById("payment-customer-select");
  const customerId = select.value;
  const dueDisplay = document.getElementById("payment-customer-due");
  const dueAmount = document.getElementById("payment-due-amount");

  if (!customerId) {
    dueDisplay.style.display = "none";
    return;
  }

  const balance = await Customers.getBalance(customerId);

  if (balance > 0) {
    dueDisplay.style.display = "flex";
    dueAmount.textContent = formatCurrency(balance);
    dueDisplay.dataset.balance = balance;
  } else {
    dueDisplay.style.display = "none";
  }
}

// Set payment amount
function setPaymentAmount(amount) {
  const input = document.getElementById("payment-amount");
  if (input) {
    input.value = amount;
  }
}

// Set full due amount
function setFullDue() {
  const dueDisplay = document.getElementById("payment-customer-due");
  const balance = parseFloatSafe(dueDisplay?.dataset.balance);

  if (balance > 0) {
    setPaymentAmount(balance);
  }
}

// Set payment mode
function setPaymentMode(mode) {
  document.getElementById("payment-mode").value = mode;

  const modeBtns = document.querySelectorAll(".payment-mode-toggle .mode-btn");
  modeBtns.forEach((btn) => {
    if (btn.getAttribute("data-mode") === mode) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Save payment
async function savePayment(event) {
  event.preventDefault();

  const customerId = document.getElementById("payment-customer-select").value;
  const amount = parseFloatSafe(
    document.getElementById("payment-amount").value,
  );

  if (!customerId || amount <= 0) {
    showToast(t("fillRequired"), "warning");
    return;
  }

  const paymentData = {
    id: document.getElementById("payment-id").value || null,
    customerId,
    date: document.getElementById("payment-date").value,
    amount,
    mode: document.getElementById("payment-mode").value,
    note: document.getElementById("payment-note").value.trim(),
  };

  try {
    showLoading();
    await Payments.save(paymentData);
    hideLoading();

    vibrate(100);
    showToast(t("paymentSaved"), "success");

    closePaymentModal();

    // Refresh page if on payments
    if (APP.state.currentPage === "payments") {
      await renderPaymentsPage();
    }

    // Refresh customer detail if viewing
    if (
      APP.state.currentPage === "customer-detail" &&
      currentDetailCustomerId === customerId
    ) {
      await loadDetailMonthSummary();
      await loadCustomerHistory("payments");
    }

    // Refresh dashboard
    if (APP.state.currentPage === "dashboard") {
      await loadDashboard();
    }
  } catch (error) {
    hideLoading();
    console.error("Save payment error:", error);
    showToast(t("error"), "error");
  }
}

// Close payment modal
function closePaymentModal() {
  hideModal("payment-modal");
}

/* ============================================
   REPORTS MODULE
   ============================================ */
async function loadReports() {
  APP.cache.reportDate = new Date();
  APP.cache.reportMonth = new Date();
  APP.cache.reportYear = new Date().getFullYear();
  APP.cache.reportType = "daily";

  // Update date input
  document.getElementById("report-date").value = formatDateISO(
    APP.cache.reportDate,
  );

  // Update displays
  updateReportDateDisplay();
  updateReportMonthDisplay();
  updateReportYearDisplay();

  // Show daily report by default
  switchReportType("daily");
}

// Switch report type
function switchReportType(type) {
  APP.cache.reportType = type;

  // Update tabs
  const tabs = document.querySelectorAll(".report-tab");
  tabs.forEach((tab) => {
    if (tab.getAttribute("data-report") === type) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Show/hide selectors
  document.getElementById("daily-selector").style.display =
    type === "daily" ? "flex" : "none";
  document.getElementById("monthly-selector").style.display =
    type === "monthly" ? "flex" : "none";
  document.getElementById("yearly-selector").style.display =
    type === "yearly" ? "flex" : "none";

  // Show/hide report content
  document.getElementById("daily-report").style.display =
    type === "daily" ? "block" : "none";
  document.getElementById("monthly-report").style.display =
    type === "monthly" ? "block" : "none";
  document.getElementById("yearly-report").style.display =
    type === "yearly" ? "block" : "none";

  // Load data
  switch (type) {
    case "daily":
      loadDailyReport();
      break;
    case "monthly":
      loadMonthlyReport();
      break;
    case "yearly":
      loadYearlyReport();
      break;
  }
}

// Update report date display
function updateReportDateDisplay() {
  const dateText = document.getElementById("report-date-display");
  if (dateText) {
    dateText.textContent = formatDateReadable(APP.cache.reportDate);
  }
}

// Update report month display
function updateReportMonthDisplay() {
  const monthText = document.getElementById("report-month-display");
  if (monthText) {
    monthText.textContent = formatMonthDisplay(APP.cache.reportMonth);
  }
}

// Update report year display
function updateReportYearDisplay() {
  const yearText = document.getElementById("report-year-display");
  if (yearText) {
    yearText.textContent = APP.cache.reportYear;
  }
}

// Change report date
function changeReportDate(delta) {
  APP.cache.reportDate.setDate(APP.cache.reportDate.getDate() + delta);
  document.getElementById("report-date").value = formatDateISO(
    APP.cache.reportDate,
  );
  updateReportDateDisplay();
  loadDailyReport();
}

// On report date change
function onReportDateChange() {
  const input = document.getElementById("report-date");
  if (input) {
    APP.cache.reportDate = new Date(input.value);
    updateReportDateDisplay();
    loadDailyReport();
  }
}

// Change report month
function changeReportMonth(delta) {
  APP.cache.reportMonth.setMonth(APP.cache.reportMonth.getMonth() + delta);
  updateReportMonthDisplay();
  loadMonthlyReport();
}

// Change report year
function changeReportYear(delta) {
  APP.cache.reportYear += delta;
  updateReportYearDisplay();
  loadYearlyReport();
}

// Load daily report
async function loadDailyReport() {
  const date = APP.cache.reportDate;
  const entries = await MilkEntries.getByDate(date);

  // Calculate stats
  const morning = entries.filter((e) => e.shift === "morning");
  const evening = entries.filter((e) => e.shift === "evening");
  const cow = entries.filter((e) => e.milkType === "cow");
  const buffalo = entries.filter((e) => e.milkType === "buffalo");

  const morningKg = morning.reduce(
    (sum, e) => sum + parseFloatSafe(e.quantityKg),
    0,
  );
  const morningAmount = morning.reduce((sum, e) => sum + e.amount, 0);
  const eveningKg = evening.reduce(
    (sum, e) => sum + parseFloatSafe(e.quantityKg),
    0,
  );
  const eveningAmount = evening.reduce((sum, e) => sum + e.amount, 0);

  const totalKg = morningKg + eveningKg;
  const totalAmount = morningAmount + eveningAmount;
  const cowKg = cow.reduce((sum, e) => sum + parseFloatSafe(e.quantityKg), 0);
  const buffaloKg = buffalo.reduce(
    (sum, e) => sum + parseFloatSafe(e.quantityKg),
    0,
  );

  // Update UI
  document.getElementById("report-morning-kg").textContent =
    morningKg.toFixed(1);
  document.getElementById("report-morning-amount").textContent =
    formatCurrency(morningAmount);
  document.getElementById("report-evening-kg").textContent =
    eveningKg.toFixed(1);
  document.getElementById("report-evening-amount").textContent =
    formatCurrency(eveningAmount);

  document.getElementById("report-daily-total-kg").textContent =
    `${totalKg.toFixed(1)} kg`;
  document.getElementById("report-daily-total-amount").textContent =
    formatCurrency(totalAmount);
  document.getElementById("report-daily-cow").textContent =
    `${cowKg.toFixed(1)} kg`;
  document.getElementById("report-daily-buffalo").textContent =
    `${buffaloKg.toFixed(1)} kg`;

  // Customer-wise list
  await loadDailyCustomerList(entries);
}

// Load daily customer list
async function loadDailyCustomerList(entries) {
  const container = document.getElementById("report-daily-customers");
  if (!container) return;

  if (entries.length === 0) {
    container.innerHTML = `
            <div class="empty-state small">
                <p class="empty-text">${t("noEntries")}</p>
            </div>
        `;
    return;
  }

  // Group by customer
  const customerMap = {};
  for (const entry of entries) {
    if (!customerMap[entry.customerId]) {
      customerMap[entry.customerId] = {
        kg: 0,
        amount: 0,
      };
    }
    customerMap[entry.customerId].kg += parseFloatSafe(entry.quantityKg);
    customerMap[entry.customerId].amount += entry.amount;
  }

  let html = "";

  for (const customerId of Object.keys(customerMap)) {
    const customer = await Customers.getById(customerId);
    const data = customerMap[customerId];

    html += `
            <div class="report-customer-item">
                <div class="customer-name">${customer ? customer.name : "Unknown"}</div>
                <div class="customer-stats">
                    <span class="stat-kg">${data.kg.toFixed(1)} kg</span>
                    <span class="stat-amount">${formatCurrency(data.amount)}</span>
                </div>
            </div>
        `;
  }

  container.innerHTML = html;
}

// Load monthly report
async function loadMonthlyReport() {
  const month = APP.cache.reportMonth;

  const entries = await MilkEntries.getByMonth(month);
  const products = await Products.getByMonth(month);
  const payments = await Payments.getByMonth(month);

  // Calculate totals
  const milkKg = entries.reduce(
    (sum, e) => sum + parseFloatSafe(e.quantityKg),
    0,
  );
  const milkAmount = entries.reduce((sum, e) => sum + e.amount, 0);
  const productsAmount = products.reduce((sum, p) => sum + p.amount, 0);
  const paymentsAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  const cowKg = entries
    .filter((e) => e.milkType === "cow")
    .reduce((sum, e) => sum + parseFloatSafe(e.quantityKg), 0);
  const buffaloKg = entries
    .filter((e) => e.milkType === "buffalo")
    .reduce((sum, e) => sum + parseFloatSafe(e.quantityKg), 0);

  const totalBill = milkAmount + productsAmount;
  const pending = totalBill - paymentsAmount;

  // Update UI
  document.getElementById("report-monthly-milk").textContent =
    `${milkKg.toFixed(1)} kg`;
  document.getElementById("report-monthly-amount").textContent =
    formatCurrency(milkAmount);
  document.getElementById("report-monthly-products").textContent =
    formatCurrency(productsAmount);
  document.getElementById("report-monthly-payments").textContent =
    formatCurrency(paymentsAmount);

  document.getElementById("report-monthly-total-bill").textContent =
    formatCurrency(totalBill);
  document.getElementById("report-monthly-received").textContent =
    formatCurrency(paymentsAmount);
  document.getElementById("report-monthly-pending").textContent =
    formatCurrency(pending);

  document.getElementById("report-monthly-cow").textContent =
    `${cowKg.toFixed(1)} kg`;
  document.getElementById("report-monthly-buffalo").textContent =
    `${buffaloKg.toFixed(1)} kg`;

  // Customer breakdown
  await loadMonthlyCustomerTable(entries, products, payments);
}

// Load monthly customer table
async function loadMonthlyCustomerTable(entries, products, payments) {
  const tbody = document.getElementById("report-monthly-customers");
  if (!tbody) return;

  const customers = await Customers.getAll();
  const customerData = {};

  // Initialize all customers
  for (const customer of customers) {
    customerData[customer.id] = {
      name: customer.name,
      kg: 0,
      amount: 0,
      products: 0,
      payments: 0,
    };
  }

  // Add entries
  for (const entry of entries) {
    if (customerData[entry.customerId]) {
      customerData[entry.customerId].kg += parseFloatSafe(entry.quantityKg);
      customerData[entry.customerId].amount += entry.amount;
    }
  }

  // Add products
  for (const product of products) {
    if (customerData[product.customerId]) {
      customerData[product.customerId].products += product.amount;
    }
  }

  // Add payments
  for (const payment of payments) {
    if (customerData[payment.customerId]) {
      customerData[payment.customerId].payments += payment.amount;
    }
  }

  // Filter and sort
  const dataArray = Object.values(customerData)
    .filter((d) => d.kg > 0 || d.products > 0 || d.payments > 0)
    .sort((a, b) => b.amount - a.amount);

  if (dataArray.length === 0) {
    tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 20px;">
                    ${t("noData")}
                </td>
            </tr>
        `;
    return;
  }

  let html = "";

  for (const data of dataArray) {
    const totalBill = data.amount + data.products;
    const balance = totalBill - data.payments;

    html += `
            <tr>
                <td>${data.name}</td>
                <td>${data.kg.toFixed(1)}</td>
                <td>${formatCurrency(totalBill)}</td>
                <td class="${balance > 0 ? "text-danger" : "text-success"}">${formatCurrency(balance)}</td>
            </tr>
        `;
  }

  tbody.innerHTML = html;
}

// Load yearly report
async function loadYearlyReport() {
  const year = APP.cache.reportYear;

  // Get all entries for the year
  const allEntries = await MilkEntries.getAll();
  const yearEntries = allEntries.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === year;
  });

  // Calculate totals
  const totalKg = yearEntries.reduce(
    (sum, e) => sum + parseFloatSafe(e.quantityKg),
    0,
  );
  const totalAmount = yearEntries.reduce((sum, e) => sum + e.amount, 0);

  // Update summary
  document.getElementById("report-yearly-milk").textContent =
    totalKg.toFixed(0);
  document.getElementById("report-yearly-amount").textContent =
    formatCurrency(totalAmount);

  // Month-wise breakdown
  await loadYearlyMonthsList(yearEntries, year);
}

// Load yearly months list
async function loadYearlyMonthsList(entries, year) {
  const container = document.getElementById("report-yearly-months");
  if (!container) return;

  const monthData = {};

  // Initialize all months
  for (let i = 0; i < 12; i++) {
    monthData[i] = { kg: 0, amount: 0 };
  }

  // Aggregate data
  for (const entry of entries) {
    const month = new Date(entry.date).getMonth();
    monthData[month].kg += parseFloatSafe(entry.quantityKg);
    monthData[month].amount += entry.amount;
  }

  let html = "";

  for (let i = 0; i < 12; i++) {
    const data = monthData[i];
    const monthName = getMonthName(i);

    // Only show months with data or current/past months
    const currentDate = new Date();
    const isCurrentOrPast =
      year < currentDate.getFullYear() ||
      (year === currentDate.getFullYear() && i <= currentDate.getMonth());

    if (data.kg > 0 || isCurrentOrPast) {
      html += `
                <div class="yearly-month-item">
                    <div class="month-name">${monthName}</div>
                    <div class="month-stats">
                        <span class="month-kg">${data.kg.toFixed(0)} kg</span>
                        <span class="month-amount">${formatCurrency(data.amount)}</span>
                    </div>
                </div>
            `;
    }
  }

  if (!html) {
    html = `
            <div class="empty-state small">
                <p class="empty-text">${t("noData")}</p>
            </div>
        `;
  }

  container.innerHTML = html;
}

// Export report
async function exportReport() {
  showToast("एक्सपोर्ट फीचर जल्द आ रहा है", "info");
  // TODO: Implement CSV/Excel export
}

/* ============================================
   BILL MODULE
   ============================================ */
let billCustomerId = null;
let billMonth = new Date();

async function loadBill(customerId, month) {
  if (!customerId) {
    showToast("ग्राहक चुनें", "warning");
    goBack();
    return;
  }

  billCustomerId = customerId;
  billMonth = month || new Date();

  const customer = await Customers.getById(customerId);
  if (!customer) {
    showToast("ग्राहक नहीं मिला", "error");
    goBack();
    return;
  }

  const settings = await Settings.get();

  // Update vendor header
  document.getElementById("bill-vendor-name").textContent =
    settings.vendorName || "दूध वाला";
  document.getElementById("bill-vendor-contact").textContent =
    settings.vendorMobile || "";
  document.getElementById("bill-vendor-address").textContent =
    settings.vendorAddress || "";

  // Update customer info
  document.getElementById("bill-customer-name").textContent = customer.name;
  document.getElementById("bill-month").textContent =
    formatMonthDisplay(billMonth);

  // Get data
  const entries = await MilkEntries.getByCustomer(customerId, billMonth);
  const products = await Products.getByCustomer(customerId, billMonth);
  const payments = await Payments.getByCustomer(customerId, billMonth);

  // Sort entries by date
  entries.sort((a, b) => new Date(a.date) - new Date(b.date));
  products.sort((a, b) => new Date(a.date) - new Date(b.date));
  payments.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Render milk entries
  const milkTbody = document.getElementById("bill-milk-entries");
  let milkHtml = "";
  let totalMilkKg = 0;
  let totalMilkAmount = 0;

  for (const entry of entries) {
    const shiftText = entry.shift === "morning" ? "सुबह" : "शाम";
    const typeText = entry.milkType === "cow" ? "🐄" : "🐃";

    milkHtml += `
            <tr>
                <td>${formatDateDisplay(entry.date)}</td>
                <td>${shiftText}</td>
                <td>${typeText}</td>
                <td>${entry.quantityKg}</td>
                <td>₹${entry.rate}</td>
                <td>${formatCurrency(entry.amount)}</td>
            </tr>
        `;

    totalMilkKg += parseFloatSafe(entry.quantityKg);
    totalMilkAmount += entry.amount;
  }

  if (entries.length === 0) {
    milkHtml = `<tr><td colspan="6" style="text-align:center;">कोई एंट्री नहीं</td></tr>`;
  }

  milkTbody.innerHTML = milkHtml;
  document.getElementById("bill-milk-kg").textContent = totalMilkKg.toFixed(2);
  document.getElementById("bill-milk-total").textContent =
    formatCurrency(totalMilkAmount);

  // Render products
  const productsSection = document.getElementById("bill-products-section");
  const productsTbody = document.getElementById("bill-products-entries");
  let productsHtml = "";
  let totalProductsAmount = 0;

  if (products.length > 0) {
    productsSection.style.display = "block";

    for (const product of products) {
      productsHtml += `
                <tr>
                    <td>${formatDateDisplay(product.date)}</td>
                    <td>${product.itemName}</td>
                    <td>${product.quantity || "-"}</td>
                    <td>${formatCurrency(product.amount)}</td>
                </tr>
            `;
      totalProductsAmount += product.amount;
    }

    productsTbody.innerHTML = productsHtml;
    document.getElementById("bill-products-total").textContent =
      formatCurrency(totalProductsAmount);
  } else {
    productsSection.style.display = "none";
  }

  // Grand total
  const grandTotal = totalMilkAmount + totalProductsAmount;
  document.getElementById("bill-grand-total").textContent =
    formatCurrency(grandTotal);

  // Previous due (TODO: Calculate from previous months)
  document.getElementById("bill-previous-due-row").style.display = "none";

  // Render payments
  const paymentsSection = document.getElementById("bill-payments-section");
  const paymentsTbody = document.getElementById("bill-payments-entries");
  let paymentsHtml = "";
  let totalPaymentsAmount = 0;

  if (payments.length > 0) {
    paymentsSection.style.display = "block";

    for (const payment of payments) {
      const modeText = t(payment.mode);

      paymentsHtml += `
                <tr>
                    <td>${formatDateDisplay(payment.date)}</td>
                    <td>${modeText}</td>
                    <td>${formatCurrency(payment.amount)}</td>
                </tr>
            `;
      totalPaymentsAmount += payment.amount;
    }

    paymentsTbody.innerHTML = paymentsHtml;
    document.getElementById("bill-payments-total").textContent =
      formatCurrency(totalPaymentsAmount);
  } else {
    paymentsSection.style.display = "none";
  }

  // Balance due
  const balanceDue = grandTotal - totalPaymentsAmount;
  document.getElementById("bill-balance-due").textContent =
    formatCurrency(balanceDue);

  // Generated date
  document.getElementById("bill-generated-date").textContent =
    `Generated: ${formatDateDisplay(new Date())}`;
}

// Print bill
function printBill() {
  window.print();
}

// Download bill as PDF
function downloadBillPDF() {
  showToast("PDF डाउनलोड फीचर जल्द आ रहा है", "info");
  // TODO: Implement PDF generation using html2pdf or similar
}

// Share bill via WhatsApp
async function shareBillWhatsApp() {
  if (!billCustomerId) return;

  const customer = await Customers.getById(billCustomerId);
  if (!customer || !customer.mobile) {
    showToast("ग्राहक का मोबाइल नंबर नहीं है", "warning");
    return;
  }

  const settings = await Settings.get();
  const entries = await MilkEntries.getByCustomer(billCustomerId, billMonth);
  const products = await Products.getByCustomer(billCustomerId, billMonth);
  const payments = await Payments.getByCustomer(billCustomerId, billMonth);

  const totalMilk = entries.reduce(
    (sum, e) => sum + parseFloatSafe(e.quantityKg),
    0,
  );
  const milkAmount = entries.reduce((sum, e) => sum + e.amount, 0);
  const productsAmount = products.reduce((sum, p) => sum + p.amount, 0);
  const paymentsAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  const grandTotal = milkAmount + productsAmount;
  const balance = grandTotal - paymentsAmount;

  // Create message
  const message = `
🥛 *${settings.vendorName || "दूध वाला"}*
━━━━━━━━━━━━━━
ग्राहक: ${customer.name}
महीना: ${formatMonthDisplay(billMonth)}
━━━━━━━━━━━━━━
दूध: ${totalMilk.toFixed(1)} kg = ${formatCurrency(milkAmount)}
${productsAmount > 0 ? `सामान: ${formatCurrency(productsAmount)}\n` : ""}
*कुल बिल: ${formatCurrency(grandTotal)}*
${paymentsAmount > 0 ? `भुगतान: ${formatCurrency(paymentsAmount)}\n` : ""}
━━━━━━━━━━━━━━
*बाकी राशि: ${formatCurrency(balance)}*
━━━━━━━━━━━━━━
धन्यवाद! 🙏
`.trim();

  const phone = `91${customer.mobile}`;
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
}

// Continuing in Part 5...
/* ============================================
   SETTINGS MODULE
   ============================================ */
async function loadSettings() {
    const settings = await Settings.get();
    
    // Profile fields
    document.getElementById('settings-vendor-name').value = settings.vendorName || '';
    document.getElementById('settings-vendor-mobile').value = settings.vendorMobile || '';
    document.getElementById('settings-vendor-address').value = settings.vendorAddress || '';
    
    // Default rates
    document.getElementById('settings-default-cow-rate').value = settings.defaultCowRate || CONFIG.app.defaultCowRate;
    document.getElementById('settings-default-buffalo-rate').value = settings.defaultBuffaloRate || CONFIG.app.defaultBuffaloRate;
    
    // Language
    APP.state.currentLanguage = settings.language || 'hi';
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        if (btn.getAttribute('data-lang') === APP.state.currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Sync status
    updateSyncTimeDisplay();
    const pendingEl = document.getElementById('settings-pending-sync');
    if (pendingEl) {
        pendingEl.textContent = APP.state.pendingSyncCount;
    }
}

// Save profile settings
async function saveProfileSettings() {
    const vendorName = document.getElementById('settings-vendor-name').value.trim();
    const vendorMobile = document.getElementById('settings-vendor-mobile').value.trim();
    const vendorAddress = document.getElementById('settings-vendor-address').value.trim();
    
    if (vendorMobile && !isValidMobile(vendorMobile)) {
        showToast(t('invalidMobile'), 'warning');
        return;
    }
    
    try {
        await Settings.update({
            vendorName,
            vendorMobile,
            vendorAddress
        });
        
        vibrate(50);
        showToast('प्रोफाइल सेव हो गई', 'success');
        
    } catch (error) {
        console.error('Save profile error:', error);
        showToast(t('error'), 'error');
    }
}

// Save rate settings
async function saveRateSettings() {
    const cowRate = parseFloatSafe(document.getElementById('settings-default-cow-rate').value);
    const buffaloRate = parseFloatSafe(document.getElementById('settings-default-buffalo-rate').value);
    
    if (cowRate <= 0 || buffaloRate <= 0) {
        showToast('कृपया सही दर डालें', 'warning');
        return;
    }
    
    try {
        await Settings.update({
            defaultCowRate: cowRate,
            defaultBuffaloRate: buffaloRate
        });
        
        vibrate(50);
        showToast('दर सेव हो गई', 'success');
        
    } catch (error) {
        console.error('Save rates error:', error);
        showToast(t('error'), 'error');
    }
}

// Set language
async function setLanguage(lang) {
    try {
        await Settings.setLanguage(lang);
        vibrate(50);
        showToast(lang === 'hi' ? 'भाषा बदल गई' : 'Language changed', 'success');
    } catch (error) {
        console.error('Set language error:', error);
    }
}

// Export all data
async function exportAllData() {
    try {
        showLoading('डेटा तैयार हो रहा है...');
        
        const customers = await Customers.getAll();
        const entries = await MilkEntries.getAll();
        const products = await Products.getAll();
        const payments = await Payments.getAll();
        const settings = await Settings.get();
        
        const data = {
            exportDate: new Date().toISOString(),
            appVersion: CONFIG.app.version,
            settings: {
                vendorName: settings.vendorName,
                vendorMobile: settings.vendorMobile,
                vendorAddress: settings.vendorAddress
            },
            customers,
            milkEntries: entries,
            products,
            payments
        };
        
        // Create and download JSON file
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dudhwala_backup_${formatDateISO(new Date())}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        hideLoading();
        showToast('डेटा डाउनलोड हो गया', 'success');
        
    } catch (error) {
        hideLoading();
        console.error('Export data error:', error);
        showToast(t('error'), 'error');
    }
}

/* ============================================
   ABOUT PAGE MODULE
   ============================================ */
function loadAbout() {
    // Nothing special to load, content is static
}

// Play tutorial video
function playTutorialVideo() {
    const placeholder = document.querySelector('.video-placeholder');
    const embedContainer = document.getElementById('tutorial-video-embed');
    const iframe = document.getElementById('tutorial-iframe');
    
    if (placeholder && embedContainer && iframe) {
        placeholder.style.display = 'none';
        embedContainer.style.display = 'block';
        iframe.src = `https://www.youtube.com/embed/${CONFIG.tutorialVideoId}?autoplay=1`;
    }
}

// Flip developer card
function flipDeveloperCard() {
    const cardInner = document.getElementById('developer-card-inner');
    if (cardInner) {
        cardInner.classList.toggle('flipped');
    }
}

// Rate app
function rateApp() {
    // For PWA, we can't directly link to app store
    // Show a message or copy link
    showToast('धन्यवाद! ⭐⭐⭐⭐⭐', 'success');
    
    // If it's installed from Play Store, you could use:
    // window.open('https://play.google.com/store/apps/details?id=com.dudhwala.app', '_blank');
}

/* ============================================
   TIPS & TRICKS PAGE MODULE
   ============================================ */
let tipsData = [];

async function loadTips() {
    const grid = document.getElementById('tips-grid');
    const emptyState = document.getElementById('tips-empty');
    
    if (!grid) return;
    
    // Show loading
    grid.innerHTML = `
        <div class="tips-loading">
            <div class="spinner"></div>
            <p>वीडियो लोड हो रहे हैं...</p>
        </div>
    `;
    
    try {
        // Try to fetch from API
        if (APP.state.isOnline) {
            const response = await API.getTips();
            if (response && response.tips) {
                tipsData = response.tips.filter(t => t.isActive);
            }
        }
        
        // If no data, use sample data
        if (tipsData.length === 0) {
            tipsData = getSampleTips();
        }
        
        if (tipsData.length === 0) {
            grid.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }
        
        emptyState.style.display = 'none';
        
        // Sort by sortOrder
        tipsData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        
        let html = '';
        
        for (const tip of tipsData) {
            const coverImage = tip.coverImage || `https://img.youtube.com/vi/${getYouTubeId(tip.youtubeUrl)}/hqdefault.jpg`;
            
            html += `
                <div class="tip-card" onclick="playTipVideo('${tip.id}')">
                    <div class="tip-cover">
                        <img src="${coverImage}" alt="${tip.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 9%22><rect fill=%22%23ccc%22 width=%2216%22 height=%229%22/></svg>'">
                        <div class="play-overlay">
                            <div class="play-icon">▶</div>
                        </div>
                    </div>
                    <div class="tip-info">
                        <div class="tip-title">${tip.title}</div>
                        <div class="tip-desc">${tip.description || ''}</div>
                    </div>
                </div>
            `;
        }
        
        grid.innerHTML = html;
        
    } catch (error) {
        console.error('Load tips error:', error);
        grid.innerHTML = '';
        emptyState.style.display = 'block';
    }
}

// Get sample tips (fallback)
function getSampleTips() {
    return [
        {
            id: 'tip1',
            title: 'ऐप कैसे इस्तेमाल करें',
            description: 'दूध वाला ऐप का परिचय',
            youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            sortOrder: 1,
            isActive: true
        },
        {
            id: 'tip2',
            title: 'ग्राहक कैसे जोड़ें',
            description: 'नए ग्राहक जोड़ने का तरीका',
            youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            sortOrder: 2,
            isActive: true
        },
        {
            id: 'tip3',
            title: 'दूध एंट्री कैसे करें',
            description: 'रोजाना एंट्री करने का आसान तरीका',
            youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            sortOrder: 3,
            isActive: true
        },
        {
            id: 'tip4',
            title: 'बिल कैसे बनाएं',
            description: 'मासिक बिल बनाना और शेयर करना',
            youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            sortOrder: 4,
            isActive: true
        }
    ];
}

// Get YouTube video ID from URL
function getYouTubeId(url) {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/);
    return match ? match[1] : '';
}

// Play tip video
function playTipVideo(tipId) {
    const tip = tipsData.find(t => t.id === tipId);
    if (!tip) return;
    
    const videoId = getYouTubeId(tip.youtubeUrl);
    if (!videoId) {
        showToast('वीडियो उपलब्ध नहीं है', 'warning');
        return;
    }
    
    const iframe = document.getElementById('video-player-iframe');
    const title = document.getElementById('video-modal-title');
    
    if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (title) {
        title.textContent = tip.title;
    }
    
    showModal('video-modal');
}

// Close video modal
function closeVideoModal() {
    const iframe = document.getElementById('video-player-iframe');
    if (iframe) {
        iframe.src = ''; // Stop video
    }
    hideModal('video-modal');
}

/* ============================================
   SERVICE WORKER REGISTRATION
   ============================================ */
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            // Create inline service worker
            const swCode = `
                const CACHE_NAME = 'dudhwala-v1';
                const ASSETS = [
                    '/',
                    '/index.html',
                    '/style.css',
                    '/script.js',
                    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
                ];
                
                // Install event
                self.addEventListener('install', (event) => {
                    event.waitUntil(
                        caches.open(CACHE_NAME).then((cache) => {
                            return cache.addAll(ASSETS);
                        })
                    );
                    self.skipWaiting();
                });
                
                // Activate event
                self.addEventListener('activate', (event) => {
                    event.waitUntil(
                        caches.keys().then((keys) => {
                            return Promise.all(
                                keys.filter((key) => key !== CACHE_NAME)
                                    .map((key) => caches.delete(key))
                            );
                        })
                    );
                    self.clients.claim();
                });
                
                // Fetch event
                self.addEventListener('fetch', (event) => {
                    // Skip non-GET requests
                    if (event.request.method !== 'GET') return;
                    
                    // Skip API requests
                    if (event.request.url.includes('script.google.com') ||
                        event.request.url.includes('googleapis.com') ||
                        event.request.url.includes('firebaseapp.com')) {
                        return;
                    }
                    
                    event.respondWith(
                        caches.match(event.request).then((cached) => {
                            const fetched = fetch(event.request).then((response) => {
                                // Cache successful responses
                                if (response && response.status === 200) {
                                    const clone = response.clone();
                                    caches.open(CACHE_NAME).then((cache) => {
                                        cache.put(event.request, clone);
                                    });
                                }
                                return response;
                            }).catch(() => cached);
                            
                            return cached || fetched;
                        })
                    );
                });
            `;
            
            const blob = new Blob([swCode], { type: 'application/javascript' });
            const swUrl = URL.createObjectURL(blob);
            
            const registration = await navigator.serviceWorker.register(swUrl);
            console.log('Service Worker registered:', registration.scope);
            
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
}

/* ============================================
   EVENT LISTENERS
   ============================================ */
function setupEventListeners() {
    // Online/Offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Visibility change (for sync on resume)
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }
    
    // Customer form
    const customerForm = document.getElementById('customer-form');
    if (customerForm) {
        customerForm.addEventListener('submit', saveCustomerForm);
    }
    
    // Prevent zoom on double tap (iOS)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Handle back button (for Android)
    window.addEventListener('popstate', handleBackButton);
    
    // Keyboard events for numpad
    document.addEventListener('keydown', handleKeyDown);
}

// Handle online event
function handleOnline() {
    APP.state.isOnline = true;
    updateOnlineStatus();
    showToast(t('online'), 'success');
    
    // Trigger sync
    Sync.sync();
}

// Handle offline event
function handleOffline() {
    APP.state.isOnline = false;
    updateOnlineStatus();
    showToast(t('offline'), 'warning');
}

// Handle visibility change
function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
        // App became visible, sync if online
        if (APP.state.isOnline && APP.state.isLoggedIn) {
            Sync.sync();
        }
    }
}

// Handle login submit
async function handleLoginSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showToast(t('fillRequired'), 'warning');
        return;
    }
    
    try {
        await Auth.login(email, password);
    } catch (error) {
        // Error already handled in Auth
    }
}

// Handle signup submit
async function handleSignupSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const mobile = document.getElementById('signup-mobile').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    if (!name || !email || !password) {
        showToast(t('fillRequired'), 'warning');
        return;
    }
    
    if (mobile && !isValidMobile(mobile)) {
        showToast(t('invalidMobile'), 'warning');
        return;
    }
    
    if (password.length < 6) {
        showToast(t('weakPassword'), 'warning');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast(t('passwordMismatch'), 'warning');
        return;
    }
    
    try {
        await Auth.signup(email, password, name);
        
        // Save vendor info
        await Settings.update({
            vendorName: name,
            vendorMobile: mobile
        });
        
    } catch (error) {
        // Error already handled in Auth
    }
}

// Handle back button
function handleBackButton(event) {
    const currentPage = APP.state.currentPage;
    const pagesWithNav = ['dashboard', 'customers', 'reports', 'settings'];
    
    if (pagesWithNav.includes(currentPage)) {
        // On main pages, show exit confirmation or do nothing
        // history.pushState(null, '', '');
    } else {
        // On other pages, go back
        goBack();
    }
}

// Handle keyboard events
function handleKeyDown(event) {
    // Check if numpad modal is open
    const numpadModal = document.getElementById('numpad-modal');
    if (!numpadModal || !numpadModal.classList.contains('active')) {
        return;
    }
    
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        numpadInput(key);
        event.preventDefault();
    } else if (key === '.') {
        numpadInput('.');
        event.preventDefault();
    } else if (key === 'Backspace') {
        numpadBackspace();
        event.preventDefault();
    } else if (key === 'Escape') {
        closeNumpadModal();
        event.preventDefault();
    } else if (key === 'Enter') {
        saveNumpadEntry();
        event.preventDefault();
    } else if (key === 'c' || key === 'C') {
        numpadClear();
        event.preventDefault();
    }
}

/* ============================================
   APP INITIALIZATION
   ============================================ */
async function initApp() {
    console.log('Initializing Dudh Wala...');
    
    try {
        // Initialize IndexedDB
        await DB.init();
        console.log('Database initialized');
        
        // Load settings
        const settings = await Settings.get();
        APP.state.currentLanguage = settings.language || 'hi';
        APP.state.lastSyncTime = settings.lastSyncTime;
        
        // Update pending sync count
        await SyncQueue.updatePendingCount();
        
        // Initialize Firebase Auth
        Auth.init();
        
        // Setup event listeners
        setupEventListeners();
        
        // Register service worker
        await registerServiceWorker();
        
        // Update online status
        APP.state.isOnline = navigator.onLine;
        
        // Apply language
        updateUILanguage();
        
        // Set entry date and shift
        APP.cache.entryDate = new Date();
        APP.cache.entryShift = getCurrentShift();
        
        // Hide preloader after delay
        setTimeout(() => {
            hidePreloader();
            
            // Check auth state (will redirect accordingly)
            if (!Auth.getCurrentUser()) {
                navigate('login');
            }
        }, 2000);
        
        console.log('App initialized successfully');
        
    } catch (error) {
        console.error('App initialization failed:', error);
        
        // Hide preloader anyway
        setTimeout(() => {
            hidePreloader();
            showToast('ऐप लोड करने में त्रुटि', 'error');
        }, 2000);
    }
}
window.addEventListener("load", () => {
  const video = document.querySelector(".preloader-video");
  if (video) {
    video.pause();
  }
});

/* ============================================
   ADDITIONAL HELPERS
   ============================================ */

// Format number with commas (Indian format)
function formatNumber(num) {
    if (!num) return '0';
    return num.toLocaleString('en-IN');
}

// Calculate age from date
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// Get greeting based on time
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'सुप्रभात';
    if (hour < 17) return 'नमस्ते';
    return 'शुभ संध्या';
}

// Format time ago
function formatTimeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'अभी';
    if (minutes < 60) return `${minutes} मिनट पहले`;
    if (hours < 24) return `${hours} घंटे पहले`;
    if (days < 7) return `${days} दिन पहले`;
    
    return formatDateDisplay(date);
}

// Sanitize HTML (prevent XSS)
function sanitizeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Deep clone object
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Check if object is empty
function isEmpty(obj) {
    if (!obj) return true;
    if (Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    return false;
}

// Wait/delay function
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Retry function
async function retry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) throw error;
            await wait(delay);
        }
    }
}

/* ============================================
   GLOBAL ERROR HANDLER
   ============================================ */
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Global error:', { message, source, lineno, colno, error });
    // Don't show toast for every error to avoid spam
    return false;
};

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    // Don't show toast for every rejection
});

/* ============================================
   INITIALIZE APP ON DOM READY
   ============================================ */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

/* ============================================
   EXPOSE GLOBAL FUNCTIONS
   (For onclick handlers in HTML)
   ============================================ */
window.navigate = navigate;
window.goBack = goBack;
window.showLogin = showLogin;
window.showSignup = showSignup;
window.togglePassword = togglePassword;
window.showForgotPassword = showForgotPassword;
window.signInWithGoogle = signInWithGoogle;
window.confirmLogout = confirmLogout;
window.manualSync = manualSync;
window.handlePhotoUpload = handlePhotoUpload;
window.setDefaultMilkType = setDefaultMilkType;
window.openDatePicker = openDatePicker;
window.changeEntryDate = changeEntryDate;
window.onEntryDateChange = onEntryDateChange;
window.setEntryShift = setEntryShift;
window.filterEntryCustomers = filterEntryCustomers;
window.clearEntrySearch = clearEntrySearch;
window.openNumpad = openNumpad;
window.setNumpadMilkType = setNumpadMilkType;
window.numpadInput = numpadInput;
window.numpadBackspace = numpadBackspace;
window.numpadClear = numpadClear;
window.addPaav = addPaav;
window.saveNumpadEntry = saveNumpadEntry;
window.closeNumpadModal = closeNumpadModal;
window.setCustomerFilter = setCustomerFilter;
window.showSortOptions = showSortOptions;
window.closeSortModal = closeSortModal;
window.setSortOption = setSortOption;
window.filterCustomers = filterCustomers;
window.clearCustomerSearch = clearCustomerSearch;
window.deleteCustomer = deleteCustomer;
window.changeDetailMonth = changeDetailMonth;
window.switchHistoryTab = switchHistoryTab;
window.callCustomer = callCustomer;
window.whatsappCustomer = whatsappCustomer;
window.editCurrentCustomer = editCurrentCustomer;
window.deleteCurrentCustomer = deleteCurrentCustomer;
window.quickEntryForCustomer = quickEntryForCustomer;
window.viewCustomerBill = viewCustomerBill;
window.showAddPaymentForCustomer = showAddPaymentForCustomer;
window.showAddProductForCustomer = showAddProductForCustomer;
window.toggleBulkMilkType = toggleBulkMilkType;
window.updateBulkAmount = updateBulkAmount;
window.saveBulkEntries = saveBulkEntries;
window.changeProductsMonth = changeProductsMonth;
window.showAddProductModal = showAddProductModal;
window.setProductItem = setProductItem;
window.editProduct = editProduct;
window.saveProduct = saveProduct;
window.deleteProduct = deleteProduct;
window.closeProductModal = closeProductModal;
window.changePaymentsMonth = changePaymentsMonth;
window.showAddPaymentModal = showAddPaymentModal;
window.onPaymentCustomerChange = onPaymentCustomerChange;
window.setPaymentAmount = setPaymentAmount;
window.setFullDue = setFullDue;
window.setPaymentMode = setPaymentMode;
window.savePayment = savePayment;
window.closePaymentModal = closePaymentModal;
window.switchReportType = switchReportType;
window.changeReportDate = changeReportDate;
window.onReportDateChange = onReportDateChange;
window.changeReportMonth = changeReportMonth;
window.changeReportYear = changeReportYear;
window.exportReport = exportReport;
window.printBill = printBill;
window.downloadBillPDF = downloadBillPDF;
window.shareBillWhatsApp = shareBillWhatsApp;
window.saveProfileSettings = saveProfileSettings;
window.saveRateSettings = saveRateSettings;
window.setLanguage = setLanguage;
window.exportAllData = exportAllData;
window.playTutorialVideo = playTutorialVideo;
window.flipDeveloperCard = flipDeveloperCard;
window.rateApp = rateApp;
window.playTipVideo = playTipVideo;
window.closeVideoModal = closeVideoModal;
window.confirmAction = confirmAction;
window.closeConfirmModal = closeConfirmModal;
window.undoEntry = undoEntry;

/* ============================================
   END OF SCRIPT
   ============================================ */

console.log('🥛 Dudh Wala Script Loaded - Version', CONFIG.app.version);
