install_node(){
	local required_version=24
	
	info "Checking nodejs installation..."
	
	install_package curl
	
	# install nvm if it isn't installed
	if [ ! -s "$HOME/.nvm/nvm.sh" ]; then
		info "Installing NVM...."
		curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.6/install.sh | bash
	fi
	
	# load nvm into current shell
	export NVM_DIR="$HOME/.nvm"
	. "$NVM_DIR/nvm.sh"
	
	#check required node version
	
	if command -v node >/dev/null 2>&1; then
		current_version=$(node -v | cut -d. -f1 | tr -d 'v')
	
		if [ "$current_version" -eq "$required_version" ]; then
			success "NodeJS $(node -v) already installed. Skipping....."
			success "npm version $(npm -v)"
			return
		fi
	
		info "Node.js $(node -v) detected. Switching to v${required_version}..."
	fi
	
	nvm install "$required_version"
	
	nvm alias default "$required_version"
	
	nvm use "$required_version"
	
	success "Node version $(node -v) installed...."	
}

install_node
