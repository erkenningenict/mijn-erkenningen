export function checkAuthenticationError(error: any): boolean {
  if (error?.message === 'Not authenticated as user') {
    return true;
  }
  return false;
}
