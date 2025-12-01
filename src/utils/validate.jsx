/**
 * Validate username
 * Rules:
 * - 3~20 characters
 * - Letters, numbers, underscores allowed
 * - Must start with a letter
 */
export const validateUsername = (username) => {
  if (!username) return "Username is required";
  const regex = /^[A-Za-z][A-Za-z0-9_]{2,19}$/;
  if (!regex.test(username))
    return "Username must start with a letter, 3-20 characters, letters, numbers, or underscores only.";
  return null; // valid
};

/**
 * Validate email
 */
export const validateEmail = (email) => {
  if (!email) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Email format is invalid.";
  return null; // valid
};

/**
 * Validate password
 * Rules:
 * - 8~20 characters
 * - At least one uppercase, one lowercase, one number, one special character
 */
export const validatePassword = (password) => {
  if (!password) return "Password is required";
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  if (!regex.test(password))
    return "Password must be 8-20 characters, include uppercase, lowercase, number, and special character.";
  return null; // valid
};

/**
 * Validate the whole form
 */
export const validateForm = (values) => {
  return {
    username: validateUsername(values.username),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
};

/**
* Validate the whole form
*/
export const validateEmailAndPassword = (values) => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  }
};

/** Validate due date
 * Rules:
 * - Must not be in the past
 */
export const validateDueDate = (dueDate) => {
  if (!dueDate) return "Due date is required";

  // Parse the dueDate string (format: YYYY-MM-DD)
  const [year, month, day] = dueDate.split('-').map(Number);
  const selectedDate = new Date(year, month - 1, day); // month is 0-indexed

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of the day

  if (selectedDate < today) return "Due date cannot be in the past.";
  return null; // valid
};