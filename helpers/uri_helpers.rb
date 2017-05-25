module UriHelpers
  def cname
    config[:cname] || I18n.t(:cname)
  end

  def canonical(path = nil)
    unless path.start_with?('/')
      path = '/' + path
    end
    klass = config[:https] ? URI::HTTPS : URI::HTTP
    klass.build(host: cname, path: config[:build_root] + path)
  end
end
