#!/bin/bash

REPOSITORY=home/ec2-user/front/zip
BUILD_DIR=$REPOSITORY/build
DEPLOY_DIR=/var/www/html
echo "> 새 프론트엔드 애플리케이션 빌드 및 배포"

echo "> 기존 파일 삭제"
sudo rm -rf $DEPLOY_DIR/*

echo "> 빌드된 파일 Nginx 디렉토리로 복사"
sudo cp -r $BUILD_DIR/* $DEPLOY_DIR/
