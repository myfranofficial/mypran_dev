#!/bin/bash
# ──────────────────────────────────────────────
# 마이프랜 서버 초기 세팅 스크립트
# 서버: 1.201.116.198 (HiQ와 동일)
# 실행: ssh ubuntu@서버 후 이 스크립트 실행
# ──────────────────────────────────────────────
set -e

echo "=== 1. 디렉터리 생성 ==="
sudo mkdir -p /home/ubuntu/myfran/{web/current,admin/current,shared,data/uploads}
sudo chown -R ubuntu:ubuntu /home/ubuntu/myfran

echo "=== 2. PM2 설치 (없으면) ==="
if ! command -v pm2 &> /dev/null; then
  sudo npm install -g pm2
  pm2 startup systemd -u ubuntu --hp /home/ubuntu
fi

echo "=== 3. certbot 웹루트 디렉터리 ==="
sudo mkdir -p /var/www/certbot

echo "=== 4. nginx 설정 복사 ==="
echo "※ nginx 설정 파일은 수동으로 복사하세요:"
echo "   /etc/nginx/sites-available/myfran-web"
echo "   /etc/nginx/sites-available/myfran-admin"
echo ""
echo "   sudo ln -sf /etc/nginx/sites-available/myfran-web /etc/nginx/sites-enabled/"
echo "   sudo ln -sf /etc/nginx/sites-available/myfran-admin /etc/nginx/sites-enabled/"

echo "=== 5. PM2 ecosystem 복사 ==="
echo "※ ecosystem.config.js를 /home/ubuntu/myfran/에 복사하세요"

echo "=== 6. .env 파일 생성 ==="
if [ ! -f /home/ubuntu/myfran/shared/.env ]; then
  cat > /home/ubuntu/myfran/shared/.env << 'ENVEOF'
SESSION_SECRET=여기에-랜덤-문자열-32자-이상
ADMIN_EMAIL=admin@myfran.com
ADMIN_PASSWORD=실제-운영-비밀번호
ADMIN_NAME=관리자
DATABASE_PATH=/home/ubuntu/myfran/data/myfran.db
UPLOAD_DIR=/home/ubuntu/myfran/data/uploads
JSON_EXPORT_DIR=/home/ubuntu/myfran/web/current/public/data
ENVEOF
  echo "  → /home/ubuntu/myfran/shared/.env 생성됨 (비밀번호 수정 필요!)"
else
  echo "  → .env 이미 존재함"
fi

echo ""
echo "=== 완료 ==="
echo ""
echo "남은 작업:"
echo "  1. DNS A 레코드 설정 (가비아)"
echo "  2. SSL 인증서 발급: sudo certbot certonly --webroot -w /var/www/certbot -d xn--lj2b54b90v2gn.com"
echo "  3. nginx 설정 복사 후: sudo nginx -t && sudo systemctl reload nginx"
echo "  4. 빌드된 앱 업로드 후: cd /home/ubuntu/myfran && pm2 start ecosystem.config.js"
echo "  5. PM2 저장: pm2 save"
