// C# backend bağlantısı için örnek fonksiyon
export async function fetchFromBackend(endpoint: string, options?: RequestInit) {
  const baseUrl = "https://your-csharp-backend.com/api";
  const res = await fetch(`${baseUrl}/${endpoint}`, options);
  if (!res.ok) throw new Error("Backend bağlantı hatası");
  return res.json();
}
