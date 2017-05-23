###
# Compass
###

# require 'normalize-scss'
# require 'susy'
require 'lib/custom_sass'
# activate :neat
# activate :bourbon
activate :sprockets

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###
# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

ignore '/partials/*'

set :build_root, '/2017'

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

BUILD_LANG = ENV['BUILD_LANG'].try(:to_sym)
dev_build = false

if BUILD_LANG.blank?
  activate :i18n, :mount_at_root => :cs
  dev_build = true
else # assume production build
  activate :i18n, :langs => [BUILD_LANG]
end

deploy_paths = {
  cs: 'cz',
  en: 'eu'
}

=begin
if BUILD_LANG
  require 'lib/middleman-deploy/methods/lftp'
  activate :deploy do |deploy|
    deploy.method = :lftp
    deploy.build_before = true
    deploy.host = ENV['FTP_HOST']
    deploy.user = ENV['FTP_USER']
    deploy.password = ENV['FTP_PASSWORD']
    deploy.path = deploy_paths.fetch(BUILD_LANG) + build_root
    deploy.clean = true
    deploy.flags = '--verbose'
  end
end
=end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :markdown,
  parse_block_html: true,
  smart_quotes: 'sbquo,lsquo,bdquo,ldquo',
  auto_ids: false,
  header_offset: 1

set :haml, { ugly: true }

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do

  if !dev_build
    # For example, change the Compass output style for deployment
    activate :minify_css

    # Minify Javascript on build
    activate :minify_javascript
  end

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
