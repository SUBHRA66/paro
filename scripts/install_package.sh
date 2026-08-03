install_package() {

    local package="$1"

    if dpkg -s "$package" >/dev/null 2>&1
    then
        info "$package already installed."
        return
    fi

    info "Installing $package..."

    sudo apt install -y "$package"

    success "$package installed."
}
