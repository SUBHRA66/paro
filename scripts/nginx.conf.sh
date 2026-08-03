setup_nginx(){
	set -e
	
	HOSTNAME=$(hostname)
	
	TEMPLATE="./config/nginx.template"
	TARGET="/etc/nginx/sites-available/${HOSTNAME}.local"
	
	sudo mkdir -p /etc/nginx/sites-available
	sudo mkdir -p /etc/nginx/sites-enabled
	
	sed "s/__HOSTNAME__/${HOSTNAME}/g" "$TEMPLATE" | sudo tee "$TARGET" >/dev/null
	
	sudo rm -f /etc/nginx/sites-enabled/default
	
	sudo ln -sf "$TARGET" "/etc/nginx/sites-enabled/${HOSTNAME}.local"
	
	sudo nginx -t
	sudo systemctl reload nginx
	
	echo "Nginx configured for http://${HOSTNAME}.local"
}

setup_nginx
