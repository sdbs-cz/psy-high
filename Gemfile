# If you have OpenSSL installed, we recommend updating
# the following line to use 'https'
source 'http://rubygems.org'

gem 'middleman', '~>3.3.3'

gem 'middleman-livereload', '~> 3.1.0'

gem 'middleman-deploy'

gem 'haml'

# SASS plugins
gem 'compass', '~> 1.0.0.alpha.19'

# gem 'normalize-scss', '~> 3.0.0.alpha.2', require: false
gem 'middleman-neat'
# gem 'bitters'

# For faster file watcher updates on Windows:
gem 'wdm', '~> 0.1.0', :platforms => [:mswin, :mingw]

# Windows does not come with time zone data
gem 'tzinfo-data', platforms: [:mswin, :mingw]

group :fonts do
  # Custom fork until most outstanding PRs are merged
  gem 'fontcustom', github: 'jnv/fontcustom', branch: 'prs'
end

group :data do
  gem 'remote_table'
  gem 'oembedr'
end
