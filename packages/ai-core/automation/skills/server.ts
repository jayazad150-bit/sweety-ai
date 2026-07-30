export async function checkServerStatus() {

  return {
    online: true,
    server: "Sweety Local System",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };

}