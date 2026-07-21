const STORAGE_KEY = 'shp_submissions';

function getAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveAll(submissions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

export function addSubmission(data) {
  const submissions = getAll();
  const newSubmission = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    ...data,
    status: 'pendiente',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  submissions.unshift(newSubmission);
  saveAll(submissions);
  return newSubmission;
}

export function getSubmissions() {
  return getAll();
}

export function getSubmission(id) {
  return getAll().find((s) => s.id === id);
}

export function updateSubmission(id, updates) {
  const submissions = getAll();
  const idx = submissions.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  submissions[idx] = { ...submissions[idx], ...updates, updatedAt: new Date().toISOString() };
  saveAll(submissions);
  return submissions[idx];
}

export function deleteSubmission(id) {
  const submissions = getAll().filter((s) => s.id !== id);
  saveAll(submissions);
}

export function approveSubmission(id) {
  return updateSubmission(id, { status: 'aprobada' });
}

export function rejectSubmission(id) {
  return updateSubmission(id, { status: 'rechazada' });
}
