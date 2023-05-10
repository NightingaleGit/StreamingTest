#!/bin/sh
cp -f /usr/share/nginx/html/index.html /tmp

if [ -n "$API_URI" ]; then
sed -i -e "s|\$API_URI|$API_URI|g" /tmp/index.html
fi

cat /tmp/index.html > /usr/share/nginx/html/index.html