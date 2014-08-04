module UriHelpers
  def cname
    settings[:cname] || I18n.t(:cname)
  end

  def canonical(path = nil)
    unless path.start_with?('/')
      path = '/' + path
    end
    URI::HTTP.build(host: cname, path: path)
  end
end
