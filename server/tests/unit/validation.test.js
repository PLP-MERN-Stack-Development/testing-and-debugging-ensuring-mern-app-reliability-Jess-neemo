// Simple validation logic
const validateBugInput = (title, description) => {
  if (!title || !description) return false;
  return title.trim().length > 0 && description.trim().length > 0;
};

test('valid bug input returns true', () => {
  expect(validateBugInput('Login fails', 'User cannot log in')).toBe(true);
});

test('empty title returns false', () => {
  expect(validateBugInput('', 'desc')).toBe(false);
});