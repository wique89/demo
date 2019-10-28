
cd /app
\cp /app/vue.config.js_template  /app/vue.config.js -rf
sed -i "s/afr.duiopen.com/$1/g" `grep -rl "afr.duiopen.com" /app/vue.config.js`

npm config set registry https://registry.npm.taobao.org

npm install --unsafe-perm

npm run serve

