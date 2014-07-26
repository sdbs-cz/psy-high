###
# Compass
###

# require 'normalize-scss'
# require 'susy'
require 'lib/custom_sass'

activate :neat
# activate :bourbon
require 'toolkit'

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

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

BUILD_LANG = ENV['BUILD_LANG']

if BUILD_LANG.blank?
  activate :i18n, :mount_at_root => :cs
else # assume production build
  proxy '/CNAME', '/partials/CNAME.txt'
  activate :i18n, :langs => [BUILD_LANG.to_sym]
end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
  compass_config do |config|
    config.sass_options = {:sourcemap => true}
  end
end

activate :deploy do |deploy|
  deploy.method = :git
  deploy.build_before = true # default: false
end

=begin
activate :imageoptim do |options|
  options.nice = nil
  options.threads = nil

  # Image extensions to attempt to compress
  options.image_extensions = %w(.png .jpg .gif .svg)

  # compressor worker options, individual optimisers can be disabled by passing
  # false instead of a hash
  # options.pngcrush_options  = {:chunks => ['alla'], :fix => false, :brute => false}
  options.pngout_options    = false
  # options.optipng_options   = {:level => 6, :interlace => false}
  # options.advpng_options    = {:level => 4}
  # options.jpegoptim_options = {:strip => ['all'], :max_quality => 100}
  # options.jpegtran_options  = {:copy_chunks => false, :progressive => true, :jpegrescan => true}
  # options.gifsicle_options  = {:interlace => false}
  # options.svgo_options      = {}
=end

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

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'
# set :cname, 'example.com'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
