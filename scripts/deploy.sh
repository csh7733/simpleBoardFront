#!/bin/bash

REPOSITORY=home/ec2-user/front/zip
BUILD_DIR=$REPOSITORY/build
DEPLOY_DIR_FINAL=/var/www/html
DEPLOY_DIR=/var/www/releases/$TIMESTAMP
echo "> 새 프론트엔드 애플리케이션 빌드 및 배포"

# 새로운 배포 디렉토리 생성
TIMESTAMP=$(date +%s)
sudo mkdir -p $DEPLOY_DIR

# 빌드 파일을 새로운 배포 디렉토리로 복사
cp -r $BUILD_DIR/* $DEPLOY_DIR/

# 심볼릭 링크 업데이트
ln -sfn $DEPLOY_DIR $DEPLOY_DIR_FINAL

# Nginx 재시작
sudo systemctl reload nginx