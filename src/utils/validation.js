const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;
const PINCODE_PATTERN = /^\d{6}$/;

export function normalizeText(value) {
  return String(value ?? '').trim();
}

export function validateShippingAddress(values) {
  const data = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, normalizeText(value)]));
  const errors = {};
  const required = ['fullname', 'phone', 'email', 'addressline1', 'area', 'city', 'pincode', 'state'];

  required.forEach((field) => {
    if (!data[field]) errors[field] = 'This field is required';
  });
  if (data.email && !EMAIL_PATTERN.test(data.email)) errors.email = 'Enter a valid email address';
  if (data.phone && !PHONE_PATTERN.test(data.phone)) errors.phone = 'Enter a valid 10-digit mobile number';
  if (data.pincode && !PINCODE_PATTERN.test(data.pincode)) errors.pincode = 'Enter a valid 6-digit pincode';
  if (data.fullname.length > 80) errors.fullname = 'Name must be 80 characters or fewer';
  if (data.addressline1.length > 150 || data.addressline2.length > 150) errors.addressline1 = 'Address is too long';

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

export function validateProduct(values) {
  const data = {
    title: normalizeText(values.title),
    price: Number(values.price),
    category: normalizeText(values.category),
    stock: Number(values.stock),
    image: normalizeText(values.image),
    brand: normalizeText(values.brand),
    description: normalizeText(values.description),
  };
  const errors = {};

  if (!data.title) errors.title = 'Title is required';
  else if (data.title.length > 120) errors.title = 'Title must be 120 characters or fewer';
  if (!Number.isFinite(data.price) || data.price <= 0) errors.price = 'Enter a price greater than zero';
  if (!Number.isInteger(data.stock) || data.stock < 0) errors.stock = 'Stock must be a non-negative whole number';
  if (!data.category) errors.category = 'Category is required';
  if (!data.image) errors.image = 'Product image is required';
  if (data.brand.length > 80) errors.brand = 'Brand must be 80 characters or fewer';
  if (data.description.length > 2000) errors.description = 'Description must be 2000 characters or fewer';

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

export function validateRegistration(values) {
  const data = {
    username: normalizeText(values.username),
    email: normalizeText(values.email).toLowerCase(),
    password: values.password,
    confpass: values.confpass,
  };
  const errors = {};

  if (!/^[A-Za-z0-9_]{3,30}$/.test(data.username)) errors.username = 'Use 3-30 letters, numbers, or underscores';
  if (!EMAIL_PATTERN.test(data.email)) errors.email = 'Enter a valid email address';
  if (!/^(?=.*[A-Za-z])(?=.*\d).{8,72}$/.test(data.password)) errors.password = 'Use 8+ characters with at least one letter and number';
  if (data.confpass !== data.password) errors.confpass = 'Passwords do not match';

  return { data, errors, valid: Object.keys(errors).length === 0 };
}
