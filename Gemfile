# If you have OpenSSL installed, we recommend updating
# the following line to use 'https'
source 'http://rubygems.org'

gem 'middleman', '~>3.3.3'
gem 'middleman-deploy'
gem 'haml'

# gem 'middleman-imageoptim', '~> 0.1.4'
gem 'uglifier'

# SASS plugins
gem 'compass', '~> 1.0.0.alpha.19'

# gem 'normalize-scss', '~> 3.0.0.alpha.2', require: false
gem 'middleman-neat'
# gem 'bitters'

gem 'therubyracer'

# For faster file watcher updates on Windows:
gem 'wdm', '~> 0.1.0', platforms: [:mswin, :mingw]

# Windows does not come with time zone data
gem 'tzinfo-data', platforms: [:mswin, :mingw]


group :fonts do
  # Custom fork until most outstanding PRs are merged
  # gem 'fontcustom', github: 'jnv/fontcustom', branch: 'prs'
end

group :development do
  gem 'middleman-livereload', '~> 3.1.0'
end

group :data do
  gem 'remote_table'
  gem 'oembedr'
  gem 'excon'
  gem 'nokogiri'
end
