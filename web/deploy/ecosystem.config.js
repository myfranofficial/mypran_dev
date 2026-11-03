/**
 * PM2 Ecosystem — 마이프랜
 * 위치: /home/ubuntu/myfran/ecosystem.config.js
 *
 * 포트 배정:
 *   3002 = 마이프랜 어드민
 *   3003 = 마이프랜 프론트엔드 (web)
 */
module.exports = {
  apps: [
    {
      name: "myfran-web",
      script: "server.js",
      cwd: "/home/ubuntu/myfran/web/current",
      node_args: "--env-file=/home/ubuntu/myfran/shared/.env",
      env: {
        NODE_ENV: "production",
        PORT: 3003,
        HOSTNAME: "127.0.0.1",
      },
      max_memory_restart: "300M",
      instances: 1,
      exec_mode: "fork",
    },
    {
      name: "myfran-admin",
      script: "server.js",
      cwd: "/home/ubuntu/myfran/admin/current",
      node_args: "--env-file=/home/ubuntu/myfran/shared/.env",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
        HOSTNAME: "127.0.0.1",
      },
      max_memory_restart: "300M",
      instances: 1,
      exec_mode: "fork",
    },
  ],
};
