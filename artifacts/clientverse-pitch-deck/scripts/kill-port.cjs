const fs = require('fs');
const port = parseInt(process.env.PORT);

if (!port) process.exit(0);

const hexPort = port.toString(16).toUpperCase().padStart(4, '0');

try {
  const tcp = fs.readFileSync('/proc/net/tcp', 'utf8');
  const lines = tcp.split('\n').slice(1);
  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    if (parts[1] && parts[1].endsWith(':' + hexPort) && parts[3] === '0A') {
      const inode = parseInt(parts[9]);
      const pids = fs.readdirSync('/proc').filter(d => /^\d+$/.test(d));
      for (const pid of pids) {
        try {
          const fds = fs.readdirSync(`/proc/${pid}/fd`);
          for (const fd of fds) {
            try {
              const link = fs.readlinkSync(`/proc/${pid}/fd/${fd}`);
              if (link === `socket:[${inode}]`) {
                const myPid = process.pid;
                if (parseInt(pid) !== myPid) {
                  process.kill(parseInt(pid), 'SIGKILL');
                  console.log(`[kill-port] Killed PID ${pid} holding port ${port}`);
                }
              }
            } catch {}
          }
        } catch {}
      }
    }
  }
} catch (e) {
  console.error('[kill-port] Error:', e.message);
}
